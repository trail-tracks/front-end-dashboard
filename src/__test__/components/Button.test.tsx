import { render, screen, fireEvent } from '@testing-library/react';
import Button from '@/components/common/Button';
import '@testing-library/jest-dom';

describe('Button Component', () => {
  it('renderiza o botão com texto', () => {
    render(<Button text="Teste" />);
    expect(screen.getByRole('button', { name: /teste/i })).toBeInTheDocument();
  });

  it('executa onClick quando clicado', () => {
    const handleClick = jest.fn();
    render(<Button text="Teste" onClick={handleClick} />);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('aplica variante primary por padrão', () => {
    render(<Button text="Teste" />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-primary-light');
  });

  it('aplica variante secondary quando especificada', () => {
    render(<Button text="Teste" variant="secondary" />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-primary-dark');
  });

  it('aplica className customizada', () => {
    render(<Button text="Teste" className="custom-class" />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class');
  });

  it('define type correto', () => {
    render(<Button text="Teste" type="submit" />);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('type', 'submit');
  });
});

