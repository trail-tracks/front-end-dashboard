import React from 'react';
import RepresentativePhotoPage from '@/components/auth/register/RepPhoto';

describe('RepPhoto Component (RepresentativePhotoPage)', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    
    // Mock da API de attachments
    cy.intercept('POST', '**/attachments', {
      statusCode: 200,
      body: {
        message: 'Imagem enviada com sucesso',
        url: 'https://example.com/photo.png',
      },
    }).as('photoUpload');
  });

  it('deve renderizar o componente corretamente', () => {
    const onNext = cy.stub();
    cy.mount(<RepresentativePhotoPage onNext={onNext} />);
    
    cy.contains('Envie uma foto representativa da sua instituição ou do parque.').should('be.visible');
    cy.contains('Formatos aceitos: PNG, JPG, SVG.').should('be.visible');
  });

  it('deve exibir os botões de ação', () => {
    const onNext = cy.stub();
    cy.mount(<RepresentativePhotoPage onNext={onNext} />);
    
    cy.contains('button', 'Anexar arquivo').should('exist');
    cy.contains('button', 'Continuar').should('exist');
    cy.contains('button', 'Anexar depois').should('exist');
  });

  it('deve abrir seletor de arquivo ao clicar na área de upload', () => {
    const onNext = cy.stub();
    cy.mount(<RepresentativePhotoPage onNext={onNext} />);
    
    // Clicar na área de upload
    cy.get('div').contains('div', '').first().click({ force: true });
    
    // Verificar se o input de arquivo existe
    cy.get('input[type="file"]').should('exist');
  });

  it('deve exibir preview da imagem após seleção', () => {
    const onNext = cy.stub();
    cy.mount(<RepresentativePhotoPage onNext={onNext} />);
    
    const fileContent = 'fake-image-content';
    cy.get('input[type="file"]').selectFile(
      {
        contents: Cypress.Buffer.from(fileContent),
        fileName: 'photo.jpg',
        mimeType: 'image/jpeg',
      },
      { force: true }
    );
    
    // Verificar se a imagem de preview aparece
    cy.get('img[alt="Uploaded Logo"]').should('exist');
    cy.get('img[alt="Uploaded Logo"]').should('be.visible');
  });

  it('deve permitir pular upload e continuar', () => {
    const onNext = cy.stub();
    cy.mount(<RepresentativePhotoPage onNext={onNext} />);
    
    cy.contains('button', 'Anexar depois').click();
    
    // Verificar se onNext foi chamado
    cy.then(() => {
      expect(onNext).to.have.been.called;
    });
  });

  it('deve chamar onNext ao clicar em continuar sem arquivo', () => {
    const onNext = cy.stub();
    cy.mount(<RepresentativePhotoPage onNext={onNext} />);
    
    cy.contains('button', 'Continuar').click();
    
    // Verificar se onNext foi chamado
    cy.then(() => {
      expect(onNext).to.have.been.called;
    });
  });

  it('deve enviar arquivo e chamar onNext ao continuar com arquivo selecionado', () => {
    const onNext = cy.stub();
    cy.mount(<RepresentativePhotoPage onNext={onNext} />);
    
    // Selecionar arquivo
    const fileContent = 'fake-image-content';
    cy.get('input[type="file"]').selectFile(
      {
        contents: Cypress.Buffer.from(fileContent),
        fileName: 'photo.jpg',
        mimeType: 'image/jpeg',
      },
      { force: true }
    );
    
    // Clicar em continuar
    cy.contains('button', 'Continuar').click();
    
    // Aguardar upload
    cy.wait('@photoUpload');
    
    // Verificar se onNext foi chamado após sucesso
    cy.then(() => {
      expect(onNext).to.have.been.called;
    });
  });

  it('deve aceitar apenas formatos de imagem permitidos', () => {
    const onNext = cy.stub();
    cy.mount(<RepresentativePhotoPage onNext={onNext} />);
    
    // Verificar atributo accept do input
    cy.get('input[type="file"]').should('have.attr', 'accept', 'image/png, image/jpeg, image/svg+xml');
  });

  it('deve exibir área de preview vazia inicialmente', () => {
    const onNext = cy.stub();
    cy.mount(<RepresentativePhotoPage onNext={onNext} />);
    
    // Verificar se há uma div com fundo cinza (área vazia)
    cy.get('div.bg-gray-200').should('exist');
  });
});

