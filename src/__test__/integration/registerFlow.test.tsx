import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Register from '@/app/(auth)/register/page';
import '@testing-library/jest-dom';

// Mock do useRouter
const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe('Fluxo de Registro - Integração', () => {
  beforeEach(() => {
    // Limpar mocks antes de cada teste
    jest.clearAllMocks();
  });

  it('permite navegar entre as etapas do registro', async () => {
    const user = userEvent.setup();
    render(<Register />);

    // Verifica se está na primeira etapa
    expect(screen.getByText(/vamos criar sua conta/i)).toBeInTheDocument();

    // Preenche os campos da primeira etapa
    await user.type(screen.getByPlaceholderText(/parque estadual/i), 'Parque Estadual Teste');
    await user.type(screen.getByPlaceholderText(/núcleo caraguatatuba/i), 'Núcleo Teste');
    await user.type(screen.getByPlaceholderText(/digite seu email/i), 'teste@email.com');
    await user.type(screen.getByPlaceholderText(/digite sua senha/i), 'Senha123!');
    await user.type(screen.getByPlaceholderText(/ddd/i), '11');
    await user.type(screen.getByPlaceholderText(/99999-9999/i), '999999999');

    // Clica em continuar
    await user.click(screen.getByRole('button', { name: /continuar/i }));

    // Verifica se navegou para a segunda etapa
    await waitFor(() => {
      expect(screen.getByText(/dados de localização/i)).toBeInTheDocument();
    });
  });

  it('valida campos obrigatórios na primeira etapa', async () => {
    const user = userEvent.setup();
    render(<Register />);

    // Tenta submeter sem preencher campos
    await user.click(screen.getByRole('button', { name: /continuar/i }));

    // Verifica se os erros de validação aparecem (mensagens atuais do Zod)
    await waitFor(() => {
      expect(
        screen.getByText(/o nome deve ter pelo menos 2 caracteres/i),
      ).toBeInTheDocument();
      expect(screen.getByText(/email inválido/i)).toBeInTheDocument();
      expect(
        screen.getByText(/a senha deve ter pelo menos 8 caracteres/i),
      ).toBeInTheDocument();
    });
  });

  it('permite preencher dados de endereço na segunda etapa', async () => {
    const user = userEvent.setup();
    render(<Register />);

    // Preenche primeira etapa e navega
    await user.type(screen.getByPlaceholderText(/parque estadual/i), 'Parque Estadual Teste');
    await user.type(screen.getByPlaceholderText(/ddd/i), '11');
    await user.type(screen.getByPlaceholderText(/99999-9999/i), '999999999');
    await user.type(screen.getByPlaceholderText(/digite seu email/i), 'teste@email.com');
    await user.type(screen.getByPlaceholderText(/digite sua senha/i), 'Senha123!');
    await user.click(screen.getByRole('button', { name: /continuar/i }));

    // Aguarda segunda etapa
    await waitFor(() => {
      expect(screen.getByText(/dados de localização/i)).toBeInTheDocument();
    });

    // Mockar fetch para evitar erro do efeito do CEP
    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve({ logradouro: '', complemento: '', localidade: '', uf: '' }),
    });

    // Preenche dados de endereço
    await user.type(screen.getByPlaceholderText(/00000000/i), '12345678');
    await user.type(screen.getByPlaceholderText(/nucleo caraguatatuba/i), 'Rua das Flores');
    const caraguas = screen.getAllByPlaceholderText(/caraguatatuba/i);
    const cidadeInput = caraguas.find((el) => (el as HTMLInputElement).name === 'cidade') as HTMLInputElement;
    await user.type(cidadeInput, 'São Paulo');
    await user.type(screen.getByPlaceholderText(/123/i), '123');
    await user.type(screen.getByPlaceholderText(/sp/i), 'SP');

    // Submete o formulário
    await user.click(screen.getByRole('button', { name: /continuar/i }));

    // Verifica se houve navegação para login
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/login');
    });
  });

  it('valida CEP e preenche automaticamente endereço', async () => {
    // Mock da API ViaCEP
    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve({
        logradouro: 'Rua das Flores',
        complemento: 'Centro',
        localidade: 'São Paulo',
        uf: 'SP',
      }),
    });

    const user = userEvent.setup();
    render(<Register />);

    // Navega para segunda etapa
    await user.type(screen.getByPlaceholderText(/parque estadual/i), 'Parque Estadual Teste');
    await user.type(screen.getByPlaceholderText(/ddd/i), '11');
    await user.type(screen.getByPlaceholderText(/99999-9999/i), '999999999');
    await user.type(screen.getByPlaceholderText(/digite seu email/i), 'teste@email.com');
    await user.type(screen.getByPlaceholderText(/digite sua senha/i), 'Senha123!');
    await user.click(screen.getByRole('button', { name: /continuar/i }));

    await waitFor(() => {
      expect(screen.getByText(/dados de localização/i)).toBeInTheDocument();
    });

    // Digita CEP
    await user.type(screen.getByPlaceholderText(/00000000/i), '12345678');

    // Aguarda a busca do CEP
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('https://viacep.com.br/ws/12345678/json/');
    });

    // Verifica se os campos foram preenchidos automaticamente
    await waitFor(() => {
      expect(screen.getByDisplayValue('Rua das Flores')).toBeInTheDocument();
      expect(screen.getByDisplayValue('São Paulo')).toBeInTheDocument();
      expect(screen.getByDisplayValue('SP')).toBeInTheDocument();
    });
  });
});
