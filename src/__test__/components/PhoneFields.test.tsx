import { render, screen, fireEvent } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import PhoneFields from '@/components/auth/register/PhoneFields';
import { registerSchema } from '@/schema/authSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import '@testing-library/jest-dom';

// Wrapper component para testar com react-hook-form
const TestWrapper = ({ children }: { children: any }) => {
  const { register, formState: { errors } } = useForm({
    resolver: zodResolver(registerSchema),
  });

  return children({ register, errors });
};

describe('PhoneFields Component', () => {
  it('renderiza todos os campos de telefone', () => {
    render(
      <TestWrapper>
        {({ register, errors }: any) => (
          <PhoneFields register={register} errors={errors} />
        )}
      </TestWrapper>
    );

    expect(screen.getByDisplayValue('+55')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('DDD')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('99999-9999')).toBeInTheDocument();
  });

  it('permite selecionar DDI diferente', () => {
    render(
      <TestWrapper>
        {({ register, errors }: any) => (
          <PhoneFields register={register} errors={errors} />
        )}
      </TestWrapper>
    );

    const ddiSelect = screen.getByDisplayValue('+55');
    fireEvent.change(ddiSelect, { target: { value: '+1' } });
    expect(ddiSelect).toHaveValue('+1');
  });

  it('permite digitar DDD', () => {
    render(
      <TestWrapper>
        {({ register, errors }: any) => (
          <PhoneFields register={register} errors={errors} />
        )}
      </TestWrapper>
    );

    const dddInput = screen.getByPlaceholderText('DDD');
    fireEvent.change(dddInput, { target: { value: '11' } });
    expect(dddInput).toHaveValue('11');
  });

  it('permite digitar telefone', () => {
    render(
      <TestWrapper>
        {({ register, errors }: any) => (
          <PhoneFields register={register} errors={errors} />
        )}
      </TestWrapper>
    );

    const phoneInput = screen.getByPlaceholderText('99999-9999');
    fireEvent.change(phoneInput, { target: { value: '999999999' } });
    expect(phoneInput).toHaveValue('999999999');
  });

  it('mostra erros de validação quando fornecidos', () => {
    const mockErrors = {
      ddi: { message: 'DDI obrigatório' },
      ddd: { message: 'DDD obrigatório' },
      telefone: { message: 'Telefone obrigatório' },
    };

    render(
      <TestWrapper>
        {({ register }: any) => (
          <PhoneFields register={register} errors={mockErrors} />
        )}
      </TestWrapper>
    );

    expect(screen.getByText('DDI obrigatório')).toBeInTheDocument();
    expect(screen.getByText('DDD obrigatório')).toBeInTheDocument();
    expect(screen.getByText('Telefone obrigatório')).toBeInTheDocument();
  });
});

