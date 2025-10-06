import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import StepInstitution from '@/components/auth/register/StepInstitution';

describe('StepInstitution (básico)', () => {
  it('renderiza títulos, campos e botão Continuar', () => {
    const onNext = jest.fn();
    const onData = jest.fn();

    render(<StepInstitution onNext={onNext} onData={onData} />);

    expect(screen.getByText('Vamos criar sua Conta!')).toBeInTheDocument();
    expect(screen.getByText('Numero de Telefone*')).toBeInTheDocument();
    expect(screen.getByText('Seu Acesso')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /continuar/i })).toBeInTheDocument();
  });
});


