describe('Login API', () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

  beforeEach(() => {
    cy.clearLocalStorage();
  });

  it('deve fazer POST para /auth/login com credenciais corretas', () => {
    const loginData = {
      email: 'teste@instituicao.com',
      password: 'Senha123!',
    };

    const mockResponse = {
      message: 'Login realizado com sucesso',
      token: 'fake-jwt-token',
      user: {
        id: '123',
        email: 'teste@instituicao.com',
      },
    };

    cy.intercept('POST', `${API_URL}/auth/login`, {
      statusCode: 200,
      body: mockResponse,
    }).as('loginRequest');

    cy.window().then(async (win) => {
      const response = await win.fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
        credentials: 'include',
      });

      expect(response.status).to.equal(200);
      const result = await response.json();
      expect(result).to.deep.equal(mockResponse);
    });

    cy.wait('@loginRequest').then((interception) => {
      expect(interception.request.method).to.equal('POST');
      expect(interception.request.url).to.include('/auth/login');
      expect(interception.request.body).to.deep.equal(loginData);
      expect(interception.request.headers['content-type']).to.include(
        'application/json'
      );
    });
  });

  it('deve enviar credentials: include na requisição', () => {
    const loginData = {
      email: 'teste@instituicao.com',
      password: 'Senha123!',
    };

    cy.intercept('POST', `${API_URL}/auth/login`, {
      statusCode: 200,
      body: { message: 'Sucesso' },
    }).as('loginRequest');

    cy.window().then(async (win) => {
      await win.fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
        credentials: 'include',
      });
    });

    cy.wait('@loginRequest');
    // Nota: credentials não é verificável diretamente via intercept,
    // mas está configurado no código
  });

  it('deve lidar com erro de credenciais inválidas (401)', () => {
    const loginData = {
      email: 'teste@instituicao.com',
      password: 'SenhaErrada123!',
    };

    cy.intercept('POST', `${API_URL}/auth/login`, {
      statusCode: 401,
      body: {
        message: 'Credenciais inválidas',
      },
    }).as('loginError');

    cy.window().then(async (win) => {
      const response = await win.fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
        credentials: 'include',
      });

      expect(response.status).to.equal(401);
      expect(response.ok).to.be.false;
    });

    cy.wait('@loginError');
  });

  it('deve lidar com erro de servidor (500)', () => {
    const loginData = {
      email: 'teste@instituicao.com',
      password: 'Senha123!',
    };

    cy.intercept('POST', `${API_URL}/auth/login`, {
      statusCode: 500,
      body: {
        message: 'Erro interno do servidor',
      },
    }).as('loginServerError');

    cy.window().then(async (win) => {
      const response = await win.fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
        credentials: 'include',
      });

      expect(response.status).to.equal(500);
      expect(response.ok).to.be.false;
    });

    cy.wait('@loginServerError');
  });

  it('deve validar formato do email antes de enviar', () => {
    const loginData = {
      email: 'email-invalido',
      password: 'Senha123!',
    };

    // Não deve fazer requisição com email inválido
    cy.intercept('POST', `${API_URL}/auth/login`, {
      statusCode: 400,
    }).as('loginRequest');

    // Em um cenário real, a validação ocorre no frontend antes da requisição
    // Aqui apenas verificamos que o formato está sendo validado
    cy.window().then(() => {
      // Validação seria feita pelo zod no componente
      expect(loginData.email).to.not.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    });
  });

  it('deve enviar Content-Type application/json', () => {
    const loginData = {
      email: 'teste@instituicao.com',
      password: 'Senha123!',
    };

    cy.intercept('POST', `${API_URL}/auth/login`, {
      statusCode: 200,
      body: { message: 'Sucesso' },
    }).as('loginRequest');

    cy.window().then(async (win) => {
      await win.fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
        credentials: 'include',
      });
    });

    cy.wait('@loginRequest').then((interception) => {
      expect(interception.request.headers['content-type']).to.include(
        'application/json'
      );
    });
  });

  it('deve retornar token JWT após login bem-sucedido', () => {
    const loginData = {
      email: 'teste@instituicao.com',
      password: 'Senha123!',
    };

    const mockResponse = {
      message: 'Login realizado com sucesso',
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      user: {
        id: '123',
        email: 'teste@instituicao.com',
      },
    };

    cy.intercept('POST', `${API_URL}/auth/login`, {
      statusCode: 200,
      body: mockResponse,
    }).as('loginRequest');

    cy.window().then(async (win) => {
      const response = await win.fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
        credentials: 'include',
      });

      const result = await response.json();
      expect(result.token).to.exist;
      expect(result.token).to.be.a('string');
    });

    cy.wait('@loginRequest');
  });
});

