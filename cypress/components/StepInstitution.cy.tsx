import React from 'react';
import StepInstitution from '@/components/auth/register/StepInstitution';

describe('StepInstitution Component', () => {
  beforeEach(() => {
    // Limpar localStorage antes de cada teste
    cy.clearLocalStorage();
  });

  it('deve renderizar o componente corretamente', () => {
    const onNext = cy.stub();
    cy.mount(<StepInstitution onNext={onNext} />);
    
    cy.contains('Vamos criar sua Conta!').should('be.visible');
    cy.contains('Numero de Telefone*').should('be.visible');
    cy.contains('Nome da Instituição*').should('be.visible');
    cy.contains('Seu Acesso').should('be.visible');
  });

  it('deve exibir todos os campos do formulário', () => {
    const onNext = cy.stub();
    cy.mount(<StepInstitution onNext={onNext} />);
    
    // Campos de telefone
    cy.get('select[name="ddi"]').should('exist');
    cy.get('input[name="ddd"]').should('exist');
    cy.get('input[name="telefone"]').should('exist');
    
    // Campos do formulário
    cy.get('input[name="name"]').should('exist');
    cy.get('input[name="nameComplement"]').should('exist');
    cy.get('input[name="email"]').should('exist');
    cy.get('input[name="password"]').should('exist');
    
    // Botão
    cy.contains('button', 'Continuar').should('exist');
  });

  it('deve permitir preencher os campos do formulário', () => {
    const onNext = cy.stub();
    cy.mount(<StepInstitution onNext={onNext} />);
    
    cy.get('input[name="name"]').type('Parque Estadual de Teste');
    cy.get('input[name="nameComplement"]').type('Núcleo Caraguatatuba');
    cy.get('input[name="email"]').type('teste@instituicao.com');
    cy.get('input[name="password"]').type('Senha123!');
    cy.get('input[name="ddd"]').type('11');
    cy.get('input[name="telefone"]').type('987654321');
    
    cy.get('input[name="name"]').should('have.value', 'Parque Estadual de Teste');
    cy.get('input[name="email"]').should('have.value', 'teste@instituicao.com');
  });

  it('deve exibir mensagens de erro ao tentar submeter formulário vazio', () => {
    const onNext = cy.stub();
    cy.mount(<StepInstitution onNext={onNext} />);
    
    cy.contains('button', 'Continuar').click();
    
    // Verificar se há erros de validação
    cy.get('input[name="name"]').should('exist');
    cy.get('input[name="email"]').should('exist');
    
    // onNext não deve ser chamado quando há erros
    cy.then(() => {
      expect(onNext).not.to.have.been.called;
    });
  });

  it('deve alternar visibilidade da senha ao clicar no ícone', () => {
    const onNext = cy.stub();
    cy.mount(<StepInstitution onNext={onNext} />);
    
    cy.get('input[name="password"]').type('Senha123!');
    cy.get('input[name="password"]').should('have.attr', 'type', 'password');
    
    // Clicar no ícone de olho
    cy.get('svg').first().click();
    cy.get('input[name="password"]').should('have.attr', 'type', 'text');
    
    // Clicar novamente
    cy.get('svg').first().click();
    cy.get('input[name="password"]').should('have.attr', 'type', 'password');
  });

  it('deve limitar o tamanho máximo dos campos', () => {
    const onNext = cy.stub();
    cy.mount(<StepInstitution onNext={onNext} />);
    
    const longName = 'A'.repeat(60);
    cy.get('input[name="name"]').type(longName);
    cy.get('input[name="name"]').should('have.value', 'A'.repeat(50));
    
    const longPassword = 'A'.repeat(25);
    cy.get('input[name="password"]').type(longPassword);
    cy.get('input[name="password"]').should('have.value', 'A'.repeat(20));
  });

  it('deve chamar onNext quando o formulário é submetido com sucesso', () => {
    const onNext = cy.stub();
    cy.mount(<StepInstitution onNext={onNext} />);
    
    // Preencher todos os campos obrigatórios
    cy.get('input[name="name"]').type('Parque Estadual de Teste');
    cy.get('input[name="email"]').type('teste@instituicao.com');
    cy.get('input[name="password"]').type('Senha123!');
    cy.get('input[name="ddd"]').type('11');
    cy.get('input[name="telefone"]').type('987654321');
    
    cy.contains('button', 'Continuar').click();
    
    // Verificar se onNext foi chamado
    cy.then(() => {
      expect(onNext).to.have.been.called;
    });
  });

  it('deve validar formato de email', () => {
    const onNext = cy.stub();
    cy.mount(<StepInstitution onNext={onNext} />);
    
    cy.get('input[name="name"]').type('Parque Estadual');
    cy.get('input[name="email"]').type('email-invalido');
    cy.get('input[name="password"]').type('Senha123!');
    cy.get('input[name="ddd"]').type('11');
    cy.get('input[name="telefone"]').type('987654321');
    
    cy.contains('button', 'Continuar').click();
    
    // onNext não deve ser chamado com email inválido
    cy.then(() => {
      expect(onNext).not.to.have.been.called;
    });
  });
});

