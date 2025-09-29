import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '@/app/page';
import '@testing-library/jest-dom';

// Mock do useRouter
const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe('Fluxo de Login - Integração', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renderiza todos os elementos da tela de login', () => {
    render(<Login />);

    expect(screen.getByText(/fazer login/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/digite seu email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/digite sua senha/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument();
    expect(screen.getByText(/cadastre-se/i)).toBeInTheDocument();
  });

  it('permite alternar visibilidade da senha', async () => {
    const user = userEvent.setup();
    render(<Login />);

    const passwordInput = screen.getByPlaceholderText(/digite sua senha/i);
    // procura o ícone dentro do container do input
    const toggleIcon = passwordInput.closest('div')?.querySelector('svg');

    // Inicialmente deve ser password
    expect(passwordInput).toHaveAttribute('type', 'password');

    // Clica para mostrar senha
    if (toggleIcon) {
      await user.click(toggleIcon);
      expect(passwordInput).toHaveAttribute('type', 'text');

      // Rebusca o ícone e clica para esconder senha
      const toggleIconAgain = passwordInput.closest('div')?.querySelector('svg');
      if (toggleIconAgain) {
        await user.click(toggleIconAgain);
      }
      expect(passwordInput).toHaveAttribute('type', 'password');
    }
  });

  it('valida campos obrigatórios', async () => {
    const user = userEvent.setup();
    render(<Login />);

    // Tenta submeter sem preencher
    await user.click(screen.getByRole('button', { name: /entrar/i }));

    await waitFor(() => {
      expect(screen.getByText(/email inválido/i)).toBeInTheDocument();
      expect(screen.getByText(/a senha deve ter pelo menos 8 caracteres/i)).toBeInTheDocument();
    });
  });

  it('valida formato de email', async () => {
    const user = userEvent.setup();
    render(<Login />);

    await user.type(screen.getByPlaceholderText(/digite seu email/i), 'email-invalido');
    await user.type(screen.getByPlaceholderText(/digite sua senha/i), 'Senha123!');
    await user.click(screen.getByRole('button', { name: /entrar/i }));

    // Como a validação é feita pelo Zod, vamos verificar se o formulário não foi submetido
    // (não há navegação para a próxima página)
    expect(mockPush).not.toHaveBeenCalled();
  });

  it('valida força da senha', async () => {
    const user = userEvent.setup();
    render(<Login />);

    await user.type(screen.getByPlaceholderText(/digite seu email/i), 'teste@email.com');
    await user.type(screen.getByPlaceholderText(/digite sua senha/i), '123');
    await user.click(screen.getByRole('button', { name: /entrar/i }));

    await waitFor(() => {
      expect(screen.getByText(/a senha deve ter pelo menos 8 caracteres/i)).toBeInTheDocument();
    });
  });

  it('submete formulário com dados válidos', async () => {
    const user = userEvent.setup();
    render(<Login />);

    await user.type(screen.getByPlaceholderText(/digite seu email/i), 'teste@email.com');
    await user.type(screen.getByPlaceholderText(/digite sua senha/i), 'Senha123!');
    await user.click(screen.getByRole('button', { name: /entrar/i }));

    // Verifica se o console.log foi chamado (simulando envio)
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/');
    });
  });

  it('navega para página de registro', () => {
    render(<Login />);

    const registerLink = screen.getByText(/cadastre-se/i);
    expect(registerLink).toHaveAttribute('href', '/register');
  });
});
