import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import StepConfirm from '@/components/auth/register/StepConfirm';

jest.useFakeTimers();

describe('StepConfirm (básico)', () => {
  it('renderiza mensagens de confirmação', () => {
    render(<StepConfirm />);
    expect(screen.getByText('Perfil criado!')).toBeInTheDocument();
    expect(screen.getByText('Redirecionando...')).toBeInTheDocument();
  });
});


