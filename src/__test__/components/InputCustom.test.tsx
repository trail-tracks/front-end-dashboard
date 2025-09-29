import { render, screen, fireEvent } from '@testing-library/react';
import InputCustom from '@/components/common/InputCustom';
import '@testing-library/jest-dom';

describe('InputCustom Component', () => {
  it('renderiza input com label', () => {
    render(<InputCustom label="Teste" />);
    expect(screen.getByText('Teste')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('renderiza input com placeholder', () => {
    render(<InputCustom placeholder="Digite aqui" />);
    expect(screen.getByPlaceholderText('Digite aqui')).toBeInTheDocument();
  });

  it('renderiza ícone quando fornecido', () => {
    const icon = <span data-testid="icon">🔍</span>;
    render(<InputCustom icon={icon} />);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('mostra erro quando fornecido', () => {
    render(<InputCustom error="Campo obrigatório" />);
    expect(screen.getByText('Campo obrigatório')).toBeInTheDocument();
    expect(screen.getByText('Campo obrigatório')).toHaveClass('text-red-500');
  });

  it('aplica variante primary por padrão', () => {
    render(<InputCustom />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('border-primary-dark');
  });

  it('aplica variante secondary quando especificada', () => {
    render(<InputCustom variant="secondary" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('border-primary-light');
  });

  it('aplica className customizada', () => {
    render(<InputCustom className="custom-class" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('custom-class');
  });

  it('permite digitação no input', () => {
    render(<InputCustom />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'teste' } });
    expect(input).toHaveValue('teste');
  });

  it('aplica atributos HTML corretamente', () => {
    render(<InputCustom type="email" name="email" required />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('type', 'email');
    expect(input).toHaveAttribute('name', 'email');
    expect(input).toHaveAttribute('required');
  });
});

