import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '@/components/dashboard/Header';

describe('Header (básico)', () => {
  it('renderiza nome, subtítulo e imagem', () => {
    render(<Header name="Nome" subtitle="Sub" logo="logo.svg" />);
    expect(screen.getByText('Nome')).toBeInTheDocument();
    expect(screen.getByText('Sub')).toBeInTheDocument();
    // A imagem possui alt vazio, logo o papel acessível é "presentation"
    expect(screen.getByRole('presentation')).toBeInTheDocument();
  });
});


