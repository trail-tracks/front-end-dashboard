import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NavBar from '@/components/dashboard/NavBar';

describe('NavBar (básico)', () => {
  it('renderiza itens principais de navegação', () => {
    render(<NavBar />);
    expect(screen.getByText('Trilhas Interativas')).toBeInTheDocument();
    expect(screen.getByText('Inicio')).toBeInTheDocument();
    expect(screen.getByText('Gerenciar Trilhas')).toBeInTheDocument();
    expect(screen.getByText('Perfil da Instituição')).toBeInTheDocument();
    expect(screen.getByText('Encerrar Sessão')).toBeInTheDocument();
  });
});


