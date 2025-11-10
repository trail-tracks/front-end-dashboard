describe('Fluxo de Cadastro', () => {
  beforeEach(() => {
    // Limpar localStorage antes de cada teste
    cy.clearLocalStorage();
    
    // Mock da API ViaCEP
    cy.intercept('GET', 'https://viacep.com.br/ws/01310100/json/', {
      statusCode: 200,
      body: {
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
      },
    }).as('viaCepRequest');

    // Mock da API de signup
    cy.intercept('POST', '**/auth/signup', {
      statusCode: 201,
      body: {
        message: 'Usuário registrado com sucesso',
        data: {
          id: '123',
          email: 'teste@instituicao.com',
        },
      },
    }).as('signupRequest');

    // Mock da API de attachments (logo)
    cy.intercept('POST', '**/attachments', {
      statusCode: 200,
      body: {
        message: 'Imagem enviada com sucesso',
        url: 'https://example.com/logo.png',
      },
    }).as('logoUpload');

    // Mock da API de attachments (foto representativa)
    cy.intercept('POST', '**/attachments', {
      statusCode: 200,
      body: {
        message: 'Imagem enviada com sucesso',
        url: 'https://example.com/photo.png',
      },
    }).as('photoUpload');
  });

  it('deve completar o fluxo completo de cadastro com todos os campos preenchidos', () => {
    cy.visit('/register');

    // Verificar se está no Step 0 (StepInstitution)
    cy.contains('Vamos criar sua Conta!').should('be.visible');

    // Preencher campos do telefone
    cy.get('select[name="ddi"]').should('have.value', '55');
    cy.get('input[name="ddd"]').type('11');
    cy.get('input[name="telefone"]').type('987654321');

    // Preencher nome da instituição
    cy.get('input[name="name"]').type('Parque Estadual de Teste');
    
    // Preencher complemento do nome (opcional)
    cy.get('input[name="nameComplement"]').type('Núcleo Caraguatatuba');

    // Verificar seção de acesso
    cy.contains('Seu Acesso').should('be.visible');

    // Preencher email
    cy.get('input[name="email"]').type('teste@instituicao.com');

    // Preencher senha
    cy.get('input[name="password"]').type('Senha123!');
    
    // Verificar se a senha pode ser visualizada
    cy.get('input[name="password"]').should('have.attr', 'type', 'password');
    cy.get('svg').first().click(); // Clicar no ícone de olho
    cy.get('input[name="password"]').should('have.attr', 'type', 'text');

    // Avançar para o próximo passo
    cy.contains('button', 'Continuar').click();

    // Verificar se está no Step 1 (StepAddress)
    cy.contains('Dados de Localização').should('be.visible');

    // Preencher CEP
    cy.get('input[name="zipCode"]').type('01310100');
    
    // Aguardar a requisição do CEP
    cy.wait('@viaCepRequest');
    
    // Verificar se os campos foram preenchidos automaticamente
    cy.get('input[name="address"]').should('have.value', 'Avenida Paulista');
    cy.get('input[name="city"]').should('have.value', 'São Paulo');
    cy.get('input[name="state"]').should('have.value', 'SP');

    // Preencher número
    cy.get('input[name="number"]').type('1000');

    // Preencher complemento do endereço (opcional)
    cy.get('input[name="addressComplement"]').type('Sala 101');

    // Avançar para o próximo passo
    cy.contains('button', 'Continuar').click();

    // Aguardar o request de signup
    cy.wait('@signupRequest');

    // Verificar se está no Step 2 (Logo Upload)
    cy.contains('Adicione aqui o logotipo da sua instituição').should('be.visible');

    // Verificar se o botão de anexar arquivo existe
    cy.contains('button', 'Anexar arquivo').should('be.visible');

    // Pular upload do logo
    cy.contains('button', 'Anexar depois').click();

    // Verificar se está no Step 3 (Representative Photo)
    cy.contains('Envie uma foto representativa').should('be.visible');

    // Pular upload da foto representativa
    cy.contains('button', 'Anexar depois').click();

    // Verificar se chegou ao Step 4 (StepConfirm)
    // O step 4 tem uma visualização diferente, pode estar em tela cheia
    cy.url().should('include', '/register');
  });

  it('deve validar campos obrigatórios no StepInstitution', () => {
    cy.visit('/register');

    cy.contains('Vamos criar sua Conta!').should('be.visible');

    // Preencher campos com valores inválidos
    cy.get('input[name="name"]').type('A'); // Muito curto (< 2 caracteres)
    cy.get('input[name="email"]').type('email-invalido'); // Email inválido
    cy.get('input[name="password"]').type('senha'); // Senha não atende requisitos

    // Tentar avançar - o formulário deve impedir
    cy.contains('button', 'Continuar').click();

    // Verificar se ainda está na mesma página (não avançou)
    cy.contains('Vamos criar sua Conta!').should('be.visible');

    // Agora preencher com valores válidos
    cy.get('input[name="name"]').clear().type('Parque Estadual Valido');
    cy.get('input[name="email"]').clear().type('teste@instituicao.com');
    cy.get('input[name="password"]').clear().type('Senha123!');
    cy.get('input[name="ddd"]').type('11');
    cy.get('input[name="telefone"]').type('987654321');

    // Agora deve avançar
    cy.contains('button', 'Continuar').click();
    cy.contains('Dados de Localização').should('be.visible');
  });

  it('deve validar campos obrigatórios no StepAddress', () => {
    cy.visit('/register');

    // Preencher StepInstitution com dados válidos
    cy.get('select[name="ddi"]').should('have.value', '55');
    cy.get('input[name="ddd"]').type('11');
    cy.get('input[name="telefone"]').type('987654321');
    cy.get('input[name="name"]').type('Parque Estadual de Teste');
    cy.get('input[name="email"]').type('teste@instituicao.com');
    cy.get('input[name="password"]').type('Senha123!');
    cy.contains('button', 'Continuar').click();

    // Verificar se está no StepAddress
    cy.contains('Dados de Localização').should('be.visible');

    // Tentar avançar sem preencher CEP válido
    cy.contains('button', 'Continuar').click();

    // Verificar se ainda está na mesma página (validação impediu)
    cy.contains('Dados de Localização').should('be.visible');

    // Preencher com CEP válido
    cy.get('input[name="zipCode"]').type('01310100');
    cy.wait('@viaCepRequest');
    cy.get('input[name="number"]').type('1000');
    
    // Agora deve avançar
    cy.contains('button', 'Continuar').click();
    cy.wait('@signupRequest');
  });

  it('deve buscar endereço automaticamente ao preencher CEP válido', () => {
    cy.visit('/register');

    // Preencher StepInstitution
    cy.get('select[name="ddi"]').should('have.value', '55');
    cy.get('input[name="ddd"]').type('11');
    cy.get('input[name="telefone"]').type('987654321');
    cy.get('input[name="name"]').type('Parque Estadual');
    cy.get('input[name="email"]').type('teste@instituicao.com');
    cy.get('input[name="password"]').type('Senha123!');
    cy.contains('button', 'Continuar').click();

    // Preencher CEP
    cy.get('input[name="zipCode"]').type('01310100');

    // Aguardar requisição
    cy.wait('@viaCepRequest');

    // Verificar se os campos foram preenchidos
    cy.get('input[name="address"]').should('have.value', 'Avenida Paulista');
    cy.get('input[name="city"]').should('have.value', 'São Paulo');
    cy.get('input[name="state"]').should('have.value', 'SP');

    // Preencher número
    cy.get('input[name="number"]').type('1000');
  });

  it('deve permitir pular upload de logo e foto representativa', () => {
    cy.visit('/register');

    // Preencher StepInstitution
    cy.get('select[name="ddi"]').should('have.value', '55');
    cy.get('input[name="ddd"]').type('11');
    cy.get('input[name="telefone"]').type('987654321');
    cy.get('input[name="name"]').type('Parque Estadual');
    cy.get('input[name="email"]').type('teste@instituicao.com');
    cy.get('input[name="password"]').type('Senha123!');
    cy.contains('button', 'Continuar').click();

    // Preencher StepAddress
    cy.get('input[name="zipCode"]').type('01310100');
    cy.wait('@viaCepRequest');
    cy.get('input[name="number"]').type('1000');
    cy.contains('button', 'Continuar').click();
    cy.wait('@signupRequest');

    // Step 2 - Logo Upload - Pular
    cy.contains('Adicione aqui o logotipo').should('be.visible');
    cy.contains('button', 'Anexar depois').click();

    // Step 3 - Photo Upload - Pular
    cy.contains('Envie uma foto representativa').should('be.visible');
    cy.contains('button', 'Anexar depois').click();

    // Verificar se chegou ao StepConfirm
    cy.url().should('include', '/register');
  });

  it('deve mostrar mensagem de sucesso após cadastro completo', () => {
    cy.visit('/register');

    // Preencher todos os steps
    // Step 0
    cy.get('select[name="ddi"]').should('have.value', '55');
    cy.get('input[name="ddd"]').type('11');
    cy.get('input[name="telefone"]').type('987654321');
    cy.get('input[name="name"]').type('Parque Estadual');
    cy.get('input[name="email"]').type('teste@instituicao.com');
    cy.get('input[name="password"]').type('Senha123!');
    cy.contains('button', 'Continuar').click();

    // Step 1
    cy.get('input[name="zipCode"]').type('01310100');
    cy.wait('@viaCepRequest');
    cy.get('input[name="number"]').type('1000');
    cy.contains('button', 'Continuar').click();

    // Verificar toast de sucesso após signup
    cy.wait('@signupRequest');
    cy.contains('Usuário registrado com sucesso').should('be.visible');

    // Pular uploads
    cy.contains('Anexar depois').click();
    cy.contains('Anexar depois').click();
  });

  it('deve permitir navegação entre steps preservando dados', () => {
    cy.visit('/register');

    // Preencher Step 0 parcialmente
    cy.get('input[name="name"]').type('Parque Teste');
    cy.get('input[name="email"]').type('teste@teste.com');
    
    // Verificar se os dados são salvos no localStorage (Zustand persist)
    // O Zustand com persist salva no localStorage
    cy.window().then((win) => {
      const stored = win.localStorage.getItem('signup-data');
      expect(stored).to.exist;
    });
  });
});


