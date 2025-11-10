import React from 'react';
import PhoneFields from '@/components/auth/register/PhoneFields';
import { useForm } from 'react-hook-form';
import { registerSchema } from '@/schema/authSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

type FormValues = z.infer<typeof registerSchema>;

// Wrapper component para testar PhoneFields com react-hook-form
function PhoneFieldsWrapper() {
  const {
    register,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(registerSchema),
  });

  return <PhoneFields register={register} errors={errors} />;
}

describe('PhoneFields Component', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
  });

  it('deve renderizar os campos de telefone corretamente', () => {
    cy.mount(<PhoneFieldsWrapper />);
    
    // Verificar se o select de DDI existe
    cy.get('select[name="ddi"]').should('exist');
    cy.get('select[name="ddi"]').should('have.value', '55');
    
    // Verificar se os campos de DDD e telefone existem
    cy.get('input[name="ddd"]').should('exist');
    cy.get('input[name="telefone"]').should('exist');
  });

  it('deve permitir selecionar DDI', () => {
    cy.mount(<PhoneFieldsWrapper />);
    
    cy.get('select[name="ddi"]').select('1');
    cy.get('select[name="ddi"]').should('have.value', '1');
    
    cy.get('select[name="ddi"]').select('55');
    cy.get('select[name="ddi"]').should('have.value', '55');
  });

  it('deve permitir preencher DDD e telefone', () => {
    cy.mount(<PhoneFieldsWrapper />);
    
    cy.get('input[name="ddd"]').type('11');
    cy.get('input[name="ddd"]').should('have.value', '11');
    
    cy.get('input[name="telefone"]').type('987654321');
    cy.get('input[name="telefone"]').should('have.value', '987654321');
  });

  it('deve limitar o tamanho máximo do DDD a 3 caracteres', () => {
    cy.mount(<PhoneFieldsWrapper />);
    
    cy.get('input[name="ddd"]').type('1234');
    cy.get('input[name="ddd"]').should('have.value', '123');
  });

  it('deve limitar o tamanho máximo do telefone a 9 caracteres', () => {
    cy.mount(<PhoneFieldsWrapper />);
    
    cy.get('input[name="telefone"]').type('9876543210');
    cy.get('input[name="telefone"]').should('have.value', '987654321');
  });

  it('deve exibir mensagens de erro quando houver validação', () => {
    // Criar wrapper que força erro
    function PhoneFieldsWithError() {
      const {
        register,
        formState: { errors: formErrors },
        setError,
      } = useForm<FormValues>({
        resolver: zodResolver(registerSchema),
      });

      React.useEffect(() => {
        setError('ddd', { type: 'manual', message: 'DDD é obrigatório' });
      }, [setError]);

      return <PhoneFields register={register} errors={formErrors} />;
    }

    cy.mount(<PhoneFieldsWithError />);
    
    // Verificar se a mensagem de erro aparece
    cy.contains('DDD é obrigatório').should('be.visible');
  });
});

