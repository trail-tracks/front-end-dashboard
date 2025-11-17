describe('Fluxo de Adicionar Trilha', () => {
  beforeEach(() => {
    // Limpar localStorage antes de cada teste
    cy.clearLocalStorage();

    // Mock da API de criação de trilha
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

    // Mock da API de attachments (para upload de imagens)
    cy.intercept('POST', '**/attachments', {
      statusCode: 200,
      body: {
        message: 'Imagem enviada com sucesso',
        url: 'https://example.com/trail-image.jpg',
      },
    }).as('uploadImageRequest');

    // Visitar a página de adicionar trilha
    cy.visit('/dashboard/gerenciar-trilhas/add-trilha');
  });

  it('deve exibir o formulário de criação de trilha', () => {
    // Verificar se o título está visível
    cy.contains('Criar Trilha').should('be.visible');

    // Verificar se os campos principais estão presentes
    cy.get('input[id="name"]').should('be.visible');
    cy.get('textarea[id="shortDescription"]').should('be.visible');
    cy.get('input[id="duration"]').should('be.visible');
    cy.get('input[id="distance"]').should('be.visible');
    cy.get('select[id="difficulty"]').should('be.visible');
    cy.get('textarea[id="safetyTips"]').should('be.visible');
    cy.contains('button', 'Cadastrar').should('be.visible');
  });

  it('deve preencher e submeter o formulário com dados válidos', () => {
    // Preencher nome da trilha
    cy.get('input[id="name"]').type('Trilha da Floresta');

    // Preencher breve descrição
    cy.get('textarea[id="shortDescription"]').type(
      'Uma trilha incrível pela floresta com belas paisagens naturais'
    );

    // Preencher tempo estimado (em minutos)
    cy.get('input[id="duration"]').type('120');

    // Preencher distância (em km)
    cy.get('input[id="distance"]').type('5.5');

    // Selecionar dificuldade (já vem "facil" por padrão, mas vamos mudar)
    cy.get('select[id="difficulty"]').select('moderado');

    // Preencher dicas de segurança (opcional)
    cy.get('textarea[id="safetyTips"]').type(
      'Leve água, use protetor solar e calçados adequados para trilha'
    );

    // Submeter o formulário
    cy.contains('button', 'Cadastrar').click();

    // Aguardar a requisição
    cy.wait('@createTrailRequest');

    // Verificar se foi redirecionado para a página de gerenciar trilhas
    cy.url().should('include', '/dashboard/gerenciar-trilhas');

    // Verificar mensagem de sucesso (toast)
    cy.contains('Trilha criada com sucesso!').should('be.visible');
  });

  it('deve validar campos obrigatórios', () => {
    // Tentar submeter sem preencher nada
    cy.contains('button', 'Cadastrar').click();

    // Verificar se há mensagens de erro
    // Nome deve ter pelo menos 3 caracteres
    cy.get('input[id="name"]').should('have.attr', 'aria-invalid');

    // Preencher nome muito curto
    cy.get('input[id="name"]').type('Ab');
    cy.contains('button', 'Cadastrar').click();
    cy.contains('Nome da trilha deve ter pelo menos 3 caracteres').should(
      'be.visible'
    );

    // Preencher nome válido mas descrição curta
    cy.get('input[id="name"]').clear().type('Trilha Válida');
    cy.get('textarea[id="shortDescription"]').type('Curta');
    cy.contains('button', 'Cadastrar').click();
    cy.contains('Breve descrição deve ter pelo menos 10 caracteres').should(
      'be.visible'
    );
  });

  it('deve validar campos numéricos', () => {
    // Preencher dados básicos válidos
    cy.get('input[id="name"]').type('Trilha Teste');
    cy.get('textarea[id="shortDescription"]').type(
      'Descrição válida com mais de 10 caracteres'
    );

    // Tentar com tempo inválido (negativo)
    cy.get('input[id="duration"]').type('-10');
    cy.contains('button', 'Cadastrar').click();
    cy.contains('Tempo estimado deve ser positivo').should('be.visible');

    // Corrigir tempo
    cy.get('input[id="duration"]').clear().type('60');

    // Tentar com distância inválida (muito pequena)
    cy.get('input[id="distance"]').type('0.05');
    cy.contains('button', 'Cadastrar').click();
    cy.contains('Distância deve ser no mínimo 0.1 km').should('be.visible');

    // Corrigir distância
    cy.get('input[id="distance"]').clear().type('3.5');
  });

  it('deve permitir upload de imagens', () => {
    // Verificar se a área de upload está visível
    cy.get('label[htmlFor="file-upload"]').should('be.visible');

    // Criar um arquivo de imagem fake para upload
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
    
    // Verificar se o botão de remover aparece
    cy.get('button[type="button"]').should('exist');
  });

  it('deve permitir remover imagens enviadas', () => {
    // Adicionar uma imagem primeiro
    const fileName = 'test-image.jpg';
    cy.get('input[id="file-upload"]').selectFile(
      {
        contents: Cypress.Buffer.from('fake image content'),
        fileName: fileName,
        mimeType: 'image/jpeg',
      },
      { force: true }
    );

    // Verificar se a imagem foi adicionada
    cy.get('img[alt*="Preview"]').should('be.visible');

    // Encontrar e clicar no botão de remover (botão dentro do container da imagem)
    cy.get('img[alt*="Preview"]')
      .parent()
      .within(() => {
        cy.get('button[type="button"]').click();
      });

    // Verificar se a área de upload voltou a aparecer
    cy.get('label[htmlFor="file-upload"]').should('be.visible');
  });

  it('deve permitir criar trilha sem dicas de segurança', () => {
    // Preencher apenas campos obrigatórios
    cy.get('input[id="name"]').type('Trilha Sem Dicas');
    cy.get('textarea[id="shortDescription"]').type(
      'Uma trilha sem dicas de segurança preenchidas'
    );
    cy.get('input[id="duration"]').type('90');
    cy.get('input[id="distance"]').type('4.0');
    // Dificuldade já vem com "facil" por padrão
    // Não preencher safetyTips (é opcional)

    // Submeter
    cy.contains('button', 'Cadastrar').click();

    // Aguardar requisição
    cy.wait('@createTrailRequest');

    // Verificar redirecionamento
    cy.url().should('include', '/dashboard/gerenciar-trilhas');
  });

  it('deve validar tamanho máximo dos campos de texto', () => {
    // Nome muito longo
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
    // Verificar opções disponíveis
    cy.get('select[id="difficulty"]').should('have.value', 'facil');
    cy.get('select[id="difficulty"]').select('moderado');
    cy.get('select[id="difficulty"]').should('have.value', 'moderado');
    cy.get('select[id="difficulty"]').select('dificil');
    cy.get('select[id="difficulty"]').should('have.value', 'dificil');
    cy.get('select[id="difficulty"]').select('muito_dificil');
    cy.get('select[id="difficulty"]').should('have.value', 'muito_dificil');
  });

  it('deve exibir mensagem de erro ao falhar criação da trilha', () => {
    // Mock de erro na API
    cy.intercept('POST', '**/trails', {
      statusCode: 400,
      body: {
        message: 'Erro ao criar trilha',
      },
    }).as('createTrailError');

    // Preencher formulário
    cy.get('input[id="name"]').type('Trilha Teste');
    cy.get('textarea[id="shortDescription"]').type(
      'Descrição válida com mais de 10 caracteres'
    );
    cy.get('input[id="duration"]').type('60');
    cy.get('input[id="distance"]').type('3.0');

    // Submeter
    cy.contains('button', 'Cadastrar').click();

    // Aguardar requisição com erro
    cy.wait('@createTrailError');

    // Verificar mensagem de erro
    cy.contains('Erro ao enviar o formulário').should('be.visible');
  });
});

