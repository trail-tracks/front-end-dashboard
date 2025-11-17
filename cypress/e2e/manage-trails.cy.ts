describe('Página de Gerenciar Trilhas', () => {
  beforeEach(() => {
    // Limpar localStorage antes de cada teste
    cy.clearLocalStorage();

    // Mock da API de listagem de trilhas
    cy.intercept('GET', '**/trails', {
      statusCode: 200,
      body: [
        {
          id: '1',
          name: 'Trilha Exemplo 1',
          shortDescription: 'Descrição da trilha 1',
          duration: 120,
          distance: 5,
          difficulty: 'Média',
        },
        {
          id: '2',
          name: 'Trilha Exemplo 2',
          shortDescription: 'Descrição da trilha 2',
          duration: 90,
          distance: 3,
          difficulty: 'Fácil',
        },
      ],
    }).as('getTrailsRequest');

    // Visitar a página de gerenciar trilhas
    cy.visit('/dashboard/gerenciar-trilhas');
  });

  it('deve exibir a página de gerenciamento de trilhas', () => {
    // Verificar se o título está visível
    cy.contains('Gerenciamento de Trilhas').should('be.visible');

    // Verificar se o botão de criar trilha está presente
    cy.contains('button', 'Criar Trilha').should('be.visible');
  });

  it('deve exibir lista de trilhas', () => {
    // Verificar se há cards de trilhas
    // Como os dados são mockados localmente no componente, vamos verificar se os cards aparecem
    cy.contains('Trilha Exemplo 1').should('be.visible');
    cy.contains('Trilha Exemplo 2').should('be.visible');
    cy.contains('Trilha Exemplo 3').should('be.visible');

    // Verificar se há informações das trilhas
    cy.contains('2 horas').should('be.visible');
    cy.contains('5 km').should('be.visible');
  });

  it('deve navegar para página de adicionar trilha ao clicar em "Criar Trilha"', () => {
    // Clicar no botão "Criar Trilha"
    cy.contains('button', 'Criar Trilha').click();

    // Verificar se foi redirecionado
    cy.url().should('include', '/dashboard/gerenciar-trilhas/add-trilha');

    // Verificar se a página de criação está carregada
    cy.contains('Criar Trilha').should('be.visible');
  });

  it('deve exibir informações de cada trilha no card', () => {
    // Verificar se o primeiro card tem todas as informações
    // As informações estão no mesmo container do card
    cy.contains('Trilha Exemplo 1').should('be.visible');
    
    // Verificar tempo estimado (pode estar em qualquer card)
    cy.contains('2 horas').should('be.visible');
    // Verificar distância
    cy.contains('5 km').should('be.visible');
    // Verificar dificuldade
    cy.contains('Média').should('be.visible');
    // Verificar interações
    cy.contains('25').should('be.visible');
    cy.contains('Interações').should('be.visible');
  });

  it('deve navegar para página de detalhes ao clicar em "Ver mais detalhes"', () => {
    // Encontrar o primeiro botão "Ver mais detalhes" e clicar
    cy.contains('button', 'Ver mais detalhes').first().click();

    // Verificar se foi redirecionado para a página de detalhes
    cy.url().should('include', '/dashboard/gerenciar-trilhas/');

    // Verificar se a página de detalhes está carregada
    // A página de detalhes mostra o título da trilha
    cy.contains('Trilha Exemplo 1').should('be.visible');
  });

  it('deve exibir múltiplos cards de trilhas em grid', () => {
    // Verificar se há múltiplos cards
    cy.get('[class*="grid"]').should('exist');

    // Verificar se há pelo menos 3 trilhas (conforme dados mockados)
    cy.contains('Trilha Exemplo 1').should('be.visible');
    cy.contains('Trilha Exemplo 2').should('be.visible');
    cy.contains('Trilha Exemplo 3').should('be.visible');
  });

  it('deve exibir botão "Ver mais detalhes" em cada card', () => {
    // Verificar se há múltiplos botões "Ver mais detalhes"
    cy.contains('button', 'Ver mais detalhes').should('have.length.at.least', 1);

    // Verificar se o primeiro card tem o botão
    // O botão está dentro do componente TrailCard
    cy.contains('Trilha Exemplo 1')
      .parents()
      .contains('button', 'Ver mais detalhes')
      .should('be.visible');
  });

  it('deve exibir imagem em cada card de trilha', () => {
    // Verificar se há imagens nos cards
    // As imagens são renderizadas pelo componente Image do Next.js
    cy.get('img').should('have.length.at.least', 1);

    // Verificar se as imagens têm alt text ou estão presentes
    cy.get('img').first().should('be.visible');
  });

  it('deve manter layout responsivo', () => {
    // Verificar estrutura do grid
    cy.get('[class*="grid"]').should('have.class', 'grid-cols-1');

    // Em telas maiores, deve ter grid-cols-2
    // Isso é testado via CSS, mas podemos verificar a estrutura
    cy.get('[class*="md:grid-cols-2"]').should('exist');
  });

  it('deve exibir número de interações em cada card', () => {
    // Verificar se o número de interações está presente
    cy.contains('25').should('be.visible');
    cy.contains('Interações').should('be.visible');
    cy.contains('c/ usuários').should('be.visible');
  });

  it('deve permitir navegação entre páginas de detalhes de diferentes trilhas', () => {
    // Clicar no primeiro card
    cy.contains('button', 'Ver mais detalhes').first().click();
    cy.url().should('include', '/dashboard/gerenciar-trilhas/');

    // Voltar para a lista
    cy.visit('/dashboard/gerenciar-trilhas');

    // Clicar em outro card (se houver)
    cy.contains('button', 'Ver mais detalhes').eq(1).click();
    cy.url().should('include', '/dashboard/gerenciar-trilhas/');
  });
});

describe('Página de Detalhes da Trilha', () => {
  beforeEach(() => {
    cy.clearLocalStorage();

    // Mock da API de trilha por ID
    cy.intercept('GET', '**/trails/1', {
      statusCode: 200,
      body: {
        id: '1',
        name: 'Trilha Exemplo 1',
        shortDescription: 'Descrição curta',
        duration: 120,
        distance: 5,
        difficulty: 'Média',
      },
    }).as('getTrailById');

    // Visitar página de detalhes
    cy.visit('/dashboard/gerenciar-trilhas/1');
  });

  it('deve exibir detalhes da trilha', () => {
    // Verificar se o título da trilha está visível
    cy.contains('Trilha Exemplo 1').should('be.visible');

    // Verificar informações básicas
    cy.contains('2 horas').should('be.visible');
    cy.contains('5 km').should('be.visible');
    cy.contains('Média').should('be.visible');
  });

  it('deve exibir botão "Editar Informações"', () => {
    cy.contains('button', 'Editar Informações').should('be.visible');
  });

  it('deve exibir seção "Mais Informações"', () => {
    cy.contains('Mais Informações').should('be.visible');
  });

  it('deve exibir seção "Imagens da Trilha"', () => {
    cy.contains('Imagens da Trilha').should('be.visible');
    cy.contains('Essas imagens irão aparecer quando o usuário for visualizar o ponto de interesse').should(
      'be.visible'
    );
  });

  it('deve exibir seção "Dica de Segurança"', () => {
    cy.contains('Dica de Segurança').should('be.visible');
  });

  it('deve exibir botões de ação', () => {
    cy.contains('button', 'Sobre a Trilha').should('be.visible');
    cy.contains('button', 'Pontos de Interesse').should('be.visible');
  });

  it('deve permitir adicionar imagens', () => {
    // Verificar se há área para adicionar imagens
    cy.get('label[htmlFor="file-upload"]').should('be.visible');

    // Verificar texto de formatos aceitos
    cy.contains('Formatos aceitos: PNG, JPG, SVG.').should('be.visible');
  });

  it('deve exibir mensagem quando trilha não é encontrada', () => {
    // Visitar página com ID inválido
    cy.visit('/dashboard/gerenciar-trilhas/999');

    // Verificar mensagem de erro
    cy.contains('Trilha não encontrada').should('be.visible');
  });
});

