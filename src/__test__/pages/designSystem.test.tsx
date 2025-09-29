import { render, screen, fireEvent } from '@testing-library/react';
import DesignSystem from '@/app/(auth)/designSystem/page';
import '@testing-library/jest-dom';

describe('Design System Page', () => {
  it('renderiza todas as seções do design system', () => {
    render(<DesignSystem />);

    // Verifica seções de cores
    expect(screen.getByText(/cores primárias/i)).toBeInTheDocument();
    expect(screen.getByText(/cores secundárias/i)).toBeInTheDocument();
    expect(screen.getByText(/sistema de tipografia/i)).toBeInTheDocument();

    // Verifica cores primárias
    expect(screen.getByText(/primary dark/i)).toBeInTheDocument();
    expect(screen.getByText(/primary medium/i)).toBeInTheDocument();
    expect(screen.getByText(/primary light/i)).toBeInTheDocument();

    // Verifica cores secundárias
    expect(screen.getByText(/secondary danger/i)).toBeInTheDocument();
    expect(screen.getByText(/secondary cream/i)).toBeInTheDocument();
    expect(screen.getByText(/secondary dark/i)).toBeInTheDocument();
  });

  it('renderiza exemplos de tipografia', () => {
    render(<DesignSystem />);

    expect(screen.getByText(/gabarito bold/i)).toBeInTheDocument();
    expect(screen.getByText(/gabarito regular/i)).toBeInTheDocument();
    expect(screen.getByText(/uso em títulos, botões/i)).toBeInTheDocument();
    expect(screen.getByText(/uso em textos/i)).toBeInTheDocument();
  });

  it('renderiza botões de exemplo', () => {
    render(<DesignSystem />);

    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(2);
    expect(screen.getAllByRole('button', { name: /continuar/i })).toHaveLength(2);
  });

  it('executa onClick dos botões de exemplo', () => {
    // Mock do alert
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
    
    render(<DesignSystem />);

    const buttons = screen.getAllByRole('button');
    buttons.forEach(button => {
      fireEvent.click(button);
    });

    expect(alertSpy).toHaveBeenCalledTimes(2);
    expect(alertSpy).toHaveBeenCalledWith('Teste!');

    alertSpy.mockRestore();
  });

  it('aplica classes CSS corretas para cores', () => {
    render(<DesignSystem />);

    // Verifica se as divs têm as classes de cor corretas
    const primaryDarkDiv = screen.getByText(/primary dark/i).closest('div');
    expect(primaryDarkDiv).toHaveClass('bg-primary-dark');

    const primaryMediumDiv = screen.getByText(/primary medium/i).closest('div');
    expect(primaryMediumDiv).toHaveClass('bg-primary-medium');

    const primaryLightDiv = screen.getByText(/primary light/i).closest('div');
    expect(primaryLightDiv).toHaveClass('bg-primary-light');
  });
});
