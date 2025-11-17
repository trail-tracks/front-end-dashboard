describe('Fluxo de Adicionar Trilha', () => {
  beforeEach(() => {
    cy.clearLocalStorage();

    // Mock 'POST'/trails
    cy.intercept('POST', '**/trails', {
      statusCode: 201,
      body: {
        message: 'Trilha criada com sucesso',
        data: {
          id: '123',
          name: 'Trilha Teste',
        },
      },
    }).as('createTrailRequest');

    // Mock 'POST'/attachments
    cy.intercept('POST', '**/attachments', {
      statusCode: 200,
      body: {
        message: 'Imagem enviada com sucesso',
        url: 'https://example.com/trail-image.jpg',
      },
    }).as('uploadImageRequest');

    cy.visit('/dashboard/gerenciar-trilhas/add-trilha');
  });

  it('deve exibir o formulário de criação de trilha', () => {
    
    cy.contains('Criar Trilha').should('be.visible');

    
    cy.get('input[id="name"]').should('be.visible');
    cy.get('textarea[id="shortDescription"]').should('be.visible');
    cy.get('input[id="duration"]').should('be.visible');
    cy.get('input[id="distance"]').should('be.visible');
    cy.get('select[id="difficulty"]').should('be.visible');
    cy.get('textarea[id="safetyTips"]').should('be.visible');
    cy.contains('button', 'Cadastrar').should('be.visible');
  });

  it('deve preencher e submeter o formulário com dados válidos', () => {

    // Preenchimento
    cy.get('input[id="name"]').type('Trilha da Floresta');
    cy.get('textarea[id="shortDescription"]').type('Uma trilha incrível pela floresta com belas paisagens naturais');
    cy.get('input[id="duration"]').type('120');
    cy.get('input[id="distance"]').type('5.5');
    cy.get('select[id="difficulty"]').select('moderado');
    cy.get('textarea[id="safetyTips"]').type('Leve agua, repelente e roupas adequadas (botas, calças e etc)');
    cy.contains('button', 'Cadastrar').click();
    

    // Validação
    cy.wait('@createTrailRequest');
    cy.url().should('include', '/dashboard/gerenciar-trilhas');
    cy.contains('Trilha criada com sucesso!').should('be.visible');

  });

  it('deve validar campos obrigatórios', () => {
    // Submeter sem preencher nada
    cy.contains('button', 'Cadastrar').click();

    // Verificar mensagem de erro
    // Nome >= 3 caracteres
    cy.get('input[id="name"]').should('have.attr', 'aria-invalid');

    // Nome menor que regra
    cy.get('input[id="name"]').type('Ab');
    cy.contains('button', 'Cadastrar').click();
    cy.contains('Nome da trilha deve ter pelo menos 3 caracteres').should(
      'be.visible'
    );

    // Nome valido e descrição menor que regra
    cy.get('input[id="name"]').clear().type('Trilha Válida');
    cy.get('textarea[id="shortDescription"]').type('Curta');
    cy.contains('button', 'Cadastrar').click();
    cy.contains('Breve descrição deve ter pelo menos 10 caracteres').should(
      'be.visible'
    );
  });

  it('deve validar campos numéricos', () => {
    
    
    cy.get('input[id="name"]').type('Trilha Teste');
    cy.get('textarea[id="shortDescription"]').type(
      'Descrição válida com mais de 10 caracteres'
    );

    // Tentativa de input com tempo negativo
    cy.get('input[id="duration"]').type('-10');
    cy.contains('button', 'Cadastrar').click();
    cy.contains('Tempo estimado deve ser positivo').should('be.visible');

    // corrige o tempo
    cy.get('input[id="duration"]').clear().type('60');

    // Tentativa com menor que regra
    cy.get('input[id="distance"]').type('0.05');
    cy.contains('button', 'Cadastrar').click();
    cy.contains('Distância deve ser no mínimo 0.1 km').should('be.visible');

    // Corrige a distancia
    cy.get('input[id="distance"]').clear().type('3.5');
  });

  it('deve permitir upload de imagens', () => {
    
    cy.get('label[htmlFor="file-upload"]').should('be.visible');

    // Imagem de teste
    const fileName = 'test-image.jpg';
    cy.get('input[id="file-upload"]').selectFile(
      {
        contents: Cypress.Buffer.from('fake image content'),
        fileName: fileName,
        mimeType: 'image/jpeg',
      },
      { force: true }
    );

    // Verificar se a imagem foi adicionada (preview deve aparecer)
    // O componente Image deve aparecer após o upload
    cy.get('img[alt*="Preview"]').should('be.visible');
    cy.get('button[type="button"]').should('exist');
  });

  it('deve permitir remover imagens enviadas', () => {
    
    const fileName = 'test-image.jpg';
    cy.get('input[id="file-upload"]').selectFile(
      {
        contents: Cypress.Buffer.from('fake image content'),
        fileName: fileName,
        mimeType: 'image/jpeg',
      },
      { force: true }
    );
    cy.get('img[alt*="Preview"]').should('be.visible');


    cy.get('img[alt*="Preview"]')
      .parent()
      .within(() => {
        cy.get('button[type="button"]').click();
      });


    cy.get('label[htmlFor="file-upload"]').should('be.visible');

  });

  it('deve permitir criar trilha sem dicas de segurança', () => {

    cy.get('input[id="name"]').type('Trilha Sem Dicas');
    cy.get('textarea[id="shortDescription"]').type(
      'Uma trilha sem dicas de segurança preenchidas'
    );
    cy.get('input[id="duration"]').type('90');
    cy.get('input[id="distance"]').type('4.0');

    // Submeter
    cy.contains('button', 'Cadastrar').click();
    cy.wait('@createTrailRequest');
    cy.url().should('include', '/dashboard/gerenciar-trilhas');
  });

  it('deve validar tamanho máximo dos campos de texto', () => {
    
    // Nome menor que regra
    const longName = 'A'.repeat(101);
    cy.get('input[id="name"]').type(longName);
    cy.contains('button', 'Cadastrar').click();
    cy.contains('Nome da trilha muito longo').should('be.visible');
    // Corrigir nome
    cy.get('input[id="name"]').clear().type('Nome Válido');


    // Descrição muito longa
    const longDescription = 'A'.repeat(501);
    cy.get('textarea[id="shortDescription"]').type(longDescription);
    cy.contains('button', 'Cadastrar').click();
    cy.contains('Breve descrição muito longa').should('be.visible');
  });

  it('deve permitir selecionar diferentes níveis de dificuldade', () => {

    cy.get('select[id="difficulty"]').should('have.value', 'facil');
    cy.get('select[id="difficulty"]').select('moderado');
    cy.get('select[id="difficulty"]').should('have.value', 'moderado');
    cy.get('select[id="difficulty"]').select('dificil');
    cy.get('select[id="difficulty"]').should('have.value', 'dificil');
    cy.get('select[id="difficulty"]').select('muito_dificil');
    cy.get('select[id="difficulty"]').should('have.value', 'muito_dificil');
  });

  it('deve exibir mensagem de erro ao falhar criação da trilha', () => {
    cy.intercept('POST', '**/trails', {
      statusCode: 400,
      body: {
        message: 'Erro ao criar trilha',
      },
    }).as('createTrailError');

    cy.get('input[id="name"]').type('Trilha Teste');
    cy.get('textarea[id="shortDescription"]').type('Descrição válida com mais de 10 caracteres');
    cy.get('input[id="duration"]').type('60');
    cy.get('input[id="distance"]').type('3.0');

    // Submeter
    cy.contains('button', 'Cadastrar').click();
    cy.wait('@createTrailError');
    cy.contains('Erro ao enviar o formulário').should('be.visible');
  });
});

