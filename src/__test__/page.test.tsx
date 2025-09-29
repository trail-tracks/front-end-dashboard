import { render, screen, fireEvent } from '@testing-library/react';
import Register from '@/app/(auth)/register/page';
import '@testing-library/jest-dom';

describe('Tela de Registro', () => {
  it('renderiza todos os elementos do formulário de registro', () => {
    render(<Register />);

    // Verifica se o título está presente
    expect(screen.getByText(/vamos criar sua conta/i)).toBeInTheDocument();

    // Verifica se os campos de input estão presentes
    expect(screen.getByPlaceholderText(/digite seu email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/digite sua senha/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/parque estadual/i)).toBeInTheDocument();

    // Verifica se o botão Continuar está presente
    expect(screen.getByRole('button', { name: /continuar/i })).toBeInTheDocument();
  });
});
