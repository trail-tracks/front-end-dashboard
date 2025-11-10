import React from 'react';
import StepAddress from '@/components/auth/register/StepAddress';

describe('StepAddress Component', () => {
  beforeEach(() => {
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
  });

  it('deve renderizar o componente corretamente', () => {
    const onNext = cy.stub();
    cy.mount(<StepAddress onNext={onNext} />);
    
    cy.contains('Dados de Localização').should('be.visible');
    cy.get('input[name="zipCode"]').should('exist');
    cy.contains('button', 'Continuar').should('exist');
  });

  it('deve exibir todos os campos do formulário', () => {
    const onNext = cy.stub();
    cy.mount(<StepAddress onNext={onNext} />);
    
    cy.get('input[name="zipCode"]').should('exist');
    cy.get('input[name="address"]').should('exist');
    cy.get('input[name="addressComplement"]').should('exist');
    cy.get('input[name="city"]').should('exist');
    cy.get('input[name="number"]').should('exist');
    cy.get('input[name="state"]').should('exist');
  });

  it('deve buscar endereço automaticamente ao preencher CEP válido', () => {
    const onNext = cy.stub();
    cy.mount(<StepAddress onNext={onNext} />);
    
    cy.get('input[name="zipCode"]').type('01310100');
    
    // Aguardar requisição do CEP
    cy.wait('@viaCepRequest');
    
    // Verificar se os campos foram preenchidos automaticamente
    cy.get('input[name="address"]').should('have.value', 'Avenida Paulista');
    cy.get('input[name="city"]').should('have.value', 'São Paulo');
    cy.get('input[name="state"]').should('have.value', 'SP');
  });

  it('deve exibir loader durante busca do CEP', () => {
    const onNext = cy.stub();
    cy.mount(<StepAddress onNext={onNext} />);
    
    cy.get('input[name="zipCode"]').type('01310100');
    
    // Verificar se o loader aparece (ícone de loading)
    cy.get('svg.animate-spin').should('exist');
    
    cy.wait('@viaCepRequest');
  });

  it('deve permitir preencher número do endereço', () => {
    const onNext = cy.stub();
    cy.mount(<StepAddress onNext={onNext} />);
    
    cy.get('input[name="zipCode"]').type('01310100');
    cy.wait('@viaCepRequest');
    
    cy.get('input[name="number"]').type('1000');
    cy.get('input[name="number"]').should('have.value', '1000');
  });

  it('deve permitir preencher complemento do endereço', () => {
    const onNext = cy.stub();
    cy.mount(<StepAddress onNext={onNext} />);
    
    cy.get('input[name="zipCode"]').type('01310100');
    cy.wait('@viaCepRequest');
    
    cy.get('input[name="addressComplement"]').type('Sala 101');
    cy.get('input[name="addressComplement"]').should('have.value', 'Sala 101');
  });

  it('deve limitar o tamanho máximo dos campos', () => {
    const onNext = cy.stub();
    cy.mount(<StepAddress onNext={onNext} />);
    
    const longAddress = 'A'.repeat(50);
    cy.get('input[name="address"]').type(longAddress);
    cy.get('input[name="address"]').should('have.value', 'A'.repeat(40));
    
    const longNumber = '1'.repeat(10);
    cy.get('input[name="number"]').type(longNumber);
    cy.get('input[name="number"]').should('have.value', '1'.repeat(6));
    
    const longState = 'ABC';
    cy.get('input[name="state"]').type(longState);
    cy.get('input[name="state"]').should('have.value', 'AB');
  });

  it('deve chamar onNext após submeter formulário válido', () => {
    const onNext = cy.stub();
    cy.mount(<StepAddress onNext={onNext} />);
    
    // Preencher CEP e aguardar busca
    cy.get('input[name="zipCode"]').type('01310100');
    cy.wait('@viaCepRequest');
    
    // Preencher número
    cy.get('input[name="number"]').type('1000');
    
    // Submeter formulário
    cy.contains('button', 'Continuar').click();
    
    // Aguardar requisição de signup
    cy.wait('@signupRequest');
    
    // Verificar se onNext foi chamado após sucesso
    cy.then(() => {
      expect(onNext).to.have.been.called;
    });
  });

  it('deve validar campos obrigatórios', () => {
    const onNext = cy.stub();
    cy.mount(<StepAddress onNext={onNext} />);
    
    // Tentar submeter sem preencher CEP válido
    cy.contains('button', 'Continuar').click();
    
    // onNext não deve ser chamado quando há erros
    cy.then(() => {
      expect(onNext).not.to.have.been.called;
    });
  });
});

