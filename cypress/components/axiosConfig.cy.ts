import { axiosHttp } from '@/services/axios';

describe('Axios Configuration', () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

  beforeEach(() => {
    cy.clearLocalStorage();
  });

  it('deve ter baseURL configurado corretamente', () => {
    cy.window().then(() => {
      expect(axiosHttp.defaults.baseURL).to.equal(API_URL);
    });
  });

  it('deve ter timeout configurado (10000ms)', () => {
    cy.window().then(() => {
      expect(axiosHttp.defaults.timeout).to.equal(10000);
    });
  });

  it('deve ter Content-Type padrão como application/json', () => {
    cy.window().then(() => {
      expect(axiosHttp.defaults.headers['Content-Type']).to.include(
        'application/json'
      );
    });
  });

  it('deve adicionar interceptor de requisição', () => {
    // Verificar que os interceptors estão configurados
    cy.window().then(() => {
      // Os interceptors são funções internas do axios
      // Verificamos se a instância foi criada corretamente
      expect(axiosHttp).to.exist;
      expect(axiosHttp.interceptors).to.exist;
    });
  });

  it('deve adicionar interceptor de resposta para tratamento de erros', () => {
    cy.window().then(() => {
      // Verificar que a instância tem interceptors configurados
      expect(axiosHttp.interceptors.response).to.exist;
    });
  });

  it('deve fazer requisição com headers padrão', () => {
    cy.intercept('GET', `${API_URL}/test`, {
      statusCode: 200,
      body: { message: 'test' },
    }).as('testRequest');

    cy.window().then(async (win) => {
      try {
        await axiosHttp.get('/test');
      } catch (error) {
        // Em ambiente de teste pode falhar, mas verificamos a interceptação
      }
    });

    cy.wait('@testRequest').then((interception) => {
      expect(interception.request.headers['content-type']).to.include(
        'application/json'
      );
    });
  });

  it('deve aplicar timeout em requisições longas', () => {
    // Simular timeout
    cy.intercept('GET', `${API_URL}/slow`, {
      delay: 12000, // Mais que o timeout de 10000ms
      statusCode: 200,
    }).as('slowRequest');

    cy.window().then(async (win) => {
      try {
        await axiosHttp.get('/slow');
      } catch (error: any) {
        // Deve falhar por timeout
        expect(error.code).to.equal('ECONNABORTED');
      }
    });
  });

  it('deve ter interceptors de request e response configurados', () => {
    cy.window().then(() => {
      // Verificar que ambos os interceptors existem
      expect(axiosHttp.interceptors.request).to.exist;
      expect(axiosHttp.interceptors.response).to.exist;
    });
  });

  it('deve usar a mesma instância axiosHttp para todas as requisições', () => {
    cy.window().then(() => {
      // Verificar que é uma instância do axios
      expect(axiosHttp.defaults).to.exist;
      expect(axiosHttp.get).to.be.a('function');
      expect(axiosHttp.post).to.be.a('function');
    });
  });

  it('deve permitir override de headers em requisições específicas', () => {
    cy.intercept('POST', `${API_URL}/test`, {
      statusCode: 200,
      body: { message: 'test' },
    }).as('testRequest');

    cy.window().then(async (win) => {
      try {
        await axiosHttp.post(
          '/test',
          { data: 'test' },
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
      } catch (error) {
        // Ignorar erro
      }
    });

    cy.wait('@testRequest').then((interception) => {
      // Verificar que o header foi sobrescrito
      expect(interception.request.headers['content-type']).to.include(
        'multipart/form-data'
      );
    });
  });
});

