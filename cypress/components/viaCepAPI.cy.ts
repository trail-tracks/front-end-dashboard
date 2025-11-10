describe('ViaCEP API', () => {
  const VIA_CEP_URL = 'https://viacep.com.br/ws';

  beforeEach(() => {
    cy.clearLocalStorage();
  });

  it('deve fazer GET para ViaCEP com CEP válido', () => {
    const cep = '01310100';
    const mockResponse = {
      cep: '01310-100',
      logradouro: 'Avenida Paulista',
      complemento: 'lado ímpar',
      bairro: 'Bela Vista',
      localidade: 'São Paulo',
      uf: 'SP',
      ibge: '3550308',
      gia: '1004',
      ddd: '11',
      siafi: '7107',
    };

    cy.intercept('GET', `${VIA_CEP_URL}/${cep}/json/`, {
      statusCode: 200,
      body: mockResponse,
    }).as('viaCepRequest');

    cy.window().then(async (win) => {
      const response = await win.fetch(`${VIA_CEP_URL}/${cep}/json/`);
      expect(response.status).to.equal(200);
      const data = await response.json();
      expect(data).to.deep.equal(mockResponse);
    });

    cy.wait('@viaCepRequest').then((interception) => {
      expect(interception.request.method).to.equal('GET');
      expect(interception.request.url).to.include(cep);
    });
  });

  it('deve retornar dados de endereço no formato esperado', () => {
    const cep = '01310100';
    const mockResponse = {
      cep: '01310-100',
      logradouro: 'Avenida Paulista',
      complemento: 'lado ímpar',
      bairro: 'Bela Vista',
      localidade: 'São Paulo',
      uf: 'SP',
      ibge: '3550308',
      gia: '1004',
      ddd: '11',
      siafi: '7107',
    };

    cy.intercept('GET', `${VIA_CEP_URL}/${cep}/json/`, {
      statusCode: 200,
      body: mockResponse,
    }).as('viaCepRequest');

    cy.window().then(async (win) => {
      const response = await win.fetch(`${VIA_CEP_URL}/${cep}/json/`);
      const data = await response.json();
      
      // Verificar campos esperados
      expect(data).to.have.property('logradouro');
      expect(data).to.have.property('localidade');
      expect(data).to.have.property('uf');
      expect(data.logradouro).to.equal('Avenida Paulista');
      expect(data.localidade).to.equal('São Paulo');
      expect(data.uf).to.equal('SP');
    });

    cy.wait('@viaCepRequest');
  });

  it('deve lidar com CEP inválido', () => {
    const cep = '00000000';
    const mockResponse = {
      erro: true,
    };

    cy.intercept('GET', `${VIA_CEP_URL}/${cep}/json/`, {
      statusCode: 200,
      body: mockResponse,
    }).as('viaCepError');

    cy.window().then(async (win) => {
      const response = await win.fetch(`${VIA_CEP_URL}/${cep}/json/`);
      const data = await response.json();
      expect(data.erro).to.be.true;
    });

    cy.wait('@viaCepError');
  });

  it('deve lidar com erro de rede', () => {
    const cep = '01310100';

    cy.intercept('GET', `${VIA_CEP_URL}/${cep}/json/`, {
      statusCode: 500,
      body: {
        message: 'Erro ao buscar CEP',
      },
    }).as('viaCepNetworkError');

    cy.window().then(async (win) => {
      const response = await win.fetch(`${VIA_CEP_URL}/${cep}/json/`);
      expect(response.status).to.equal(500);
    });

    cy.wait('@viaCepNetworkError');
  });

  it('deve fazer requisição com CEP sem formatação (apenas números)', () => {
    const cep = '01310100'; // Sem hífen

    cy.intercept('GET', `${VIA_CEP_URL}/${cep}/json/`, {
      statusCode: 200,
      body: {
        cep: '01310-100',
        logradouro: 'Avenida Paulista',
        localidade: 'São Paulo',
        uf: 'SP',
      },
    }).as('viaCepRequest');

    cy.window().then(async (win) => {
      const response = await win.fetch(`${VIA_CEP_URL}/${cep}/json/`);
      expect(response.status).to.equal(200);
    });

    cy.wait('@viaCepRequest').then((interception) => {
      // Verificar que o CEP foi enviado sem formatação
      expect(interception.request.url).to.include(cep);
      expect(interception.request.url).to.not.include('-');
    });
  });

  it('deve retornar CEP formatado na resposta', () => {
    const cep = '01310100';
    const mockResponse = {
      cep: '01310-100', // CEP formatado na resposta
      logradouro: 'Avenida Paulista',
      localidade: 'São Paulo',
      uf: 'SP',
    };

    cy.intercept('GET', `${VIA_CEP_URL}/${cep}/json/`, {
      statusCode: 200,
      body: mockResponse,
    }).as('viaCepRequest');

    cy.window().then(async (win) => {
      const response = await win.fetch(`${VIA_CEP_URL}/${cep}/json/`);
      const data = await response.json();
      expect(data.cep).to.match(/^\d{5}-?\d{3}$/);
    });

    cy.wait('@viaCepRequest');
  });

  it('deve funcionar com diferentes CEPs', () => {
    const ceps = ['20010000', '30130100', '40000000'];

    ceps.forEach((cep) => {
      cy.intercept('GET', `${VIA_CEP_URL}/${cep}/json/`, {
        statusCode: 200,
        body: {
          cep: cep.substring(0, 5) + '-' + cep.substring(5),
          logradouro: 'Endereço Teste',
          localidade: 'Cidade Teste',
          uf: 'SP',
        },
      }).as(`viaCepRequest-${cep}`);

      cy.window().then(async (win) => {
        const response = await win.fetch(`${VIA_CEP_URL}/${cep}/json/`);
        expect(response.status).to.equal(200);
      });

      cy.wait(`@viaCepRequest-${cep}`);
    });
  });

  it('deve usar método GET na requisição', () => {
    const cep = '01310100';

    cy.intercept('GET', `${VIA_CEP_URL}/${cep}/json/`, {
      statusCode: 200,
      body: { cep: '01310-100' },
    }).as('viaCepRequest');

    cy.window().then(async (win) => {
      await win.fetch(`${VIA_CEP_URL}/${cep}/json/`);
    });

    cy.wait('@viaCepRequest').then((interception) => {
      expect(interception.request.method).to.equal('GET');
      // Verificar que não há body na requisição GET
      expect(interception.request.body).to.be.null;
    });
  });
});

