import React from 'react';
import LogoUploadPage from '@/components/auth/register/Logo';

describe('Logo Component (LogoUploadPage)', () => {

  beforeEach(() => {
    cy.clearLocalStorage();
    
    cy.intercept('POST', '**/attachments', {
      statusCode: 200,
      body: {
        message: 'Imagem enviada com sucesso',
        url: 'https://example.com/logo.png',
      },
    }).as('logoUpload');
  });

  it('deve renderizar o componente corretamente', () => {
    const onNext = cy.stub();
    cy.mount(<LogoUploadPage onNext={onNext} />);
    
    cy.contains('Adicione aqui o logotipo da sua instituição.').should('be.visible');
    cy.contains('Formatos aceitos: PNG, JPG, SVG.').should('be.visible');
  });

  it('deve exibir os botões de ação', () => {
    const onNext = cy.stub();
    cy.mount(<LogoUploadPage onNext={onNext} />);
    
    cy.contains('button', 'Anexar arquivo').should('exist');
    cy.contains('button', 'Continuar').should('exist');
    cy.contains('button', 'Anexar depois').should('exist');
  });

  it('deve abrir seletor de arquivo ao clicar em "Anexar arquivo"', () => {
    const onNext = cy.stub();
    cy.mount(<LogoUploadPage onNext={onNext} />);
    
    // Criar arquivo de imagem para upload
    const imgLogo = 'logo.png';
    const fileContent = 'fake-image-content';
    
    cy.get('input[type="file"]').should('exist');
    cy.get('input[type="file"]').selectFile(
      {
        contents: Cypress.Buffer.from(fileContent),
        fileName: imgLogo,
        mimeType: 'image/png',
      },
      { force: true }
    );
    
    // Verificar se a preview foi criada
    cy.get('img[alt="Uploaded Logo"]').should('exist');
  });

  it('deve exibir preview da imagem após seleção', () => {
    const onNext = cy.stub();
    cy.mount(<LogoUploadPage onNext={onNext} />);
    
    const fileContent = 'fake-image-content';
    cy.get('input[type="file"]').selectFile(
      {
        contents: Cypress.Buffer.from(fileContent),
        fileName: 'logo.png',
        mimeType: 'image/png',
      },
      { force: true }
    );
    
    cy.get('img[alt="Uploaded Logo"]').should('exist');
    cy.get('img[alt="Uploaded Logo"]').should('be.visible');
  });

  it('deve permitir pular upload e continuar', () => {
    const onNext = cy.stub();
    cy.mount(<LogoUploadPage onNext={onNext} />);
    
    cy.contains('button', 'Anexar depois').click();
    
    // Verificar se onNext foi chamado
    cy.then(() => {
      expect(onNext).to.have.been.called;
    });
  });

  it('deve chamar onNext ao clicar em continuar sem arquivo', () => {
    const onNext = cy.stub();
    cy.mount(<LogoUploadPage onNext={onNext} />);
    
    cy.contains('button', 'Continuar').click();
    
    // Verificar se onNext foi chamado
    cy.then(() => {
      expect(onNext).to.have.been.called;
    });
  });

  it('deve enviar arquivo e chamar onNext ao continuar com arquivo selecionado', () => {
    const onNext = cy.stub();
    cy.mount(<LogoUploadPage onNext={onNext} />);
    
    // Selecionar arquivo
    const fileContent = 'fake-image-content';
    cy.get('input[type="file"]').selectFile(
      {
        contents: Cypress.Buffer.from(fileContent),
        fileName: 'logo.png',
        mimeType: 'image/png',
      },
      { force: true }
    );
    
    // Clicar em continuar
    cy.contains('button', 'Continuar').click();
    
    // Aguardar upload
    cy.wait('@logoUpload');
    
    // Verificar se onNext foi chamado após sucesso
    cy.then(() => {
      expect(onNext).to.have.been.called;
    });
  });

  it('deve aceitar apenas formatos de imagem permitidos', () => {
    const onNext = cy.stub();
    cy.mount(<LogoUploadPage onNext={onNext} />);
    
    // Verificar atributo accept do input
    cy.get('input[type="file"]').should('have.attr', 'accept', 'image/png, image/jpeg, image/svg+xml');
  });

  it('deve exibir ícone de câmera', () => {
    const onNext = cy.stub();
    cy.mount(<LogoUploadPage onNext={onNext} />);
    
    // Verificar se o ícone de câmera está presente
    cy.get('svg').should('exist');
  });
});

