import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { NavItem } from '@/components/dashboard/NavItem';

describe('NavItem (básico)', () => {
  it('renderiza link com texto', () => {
    render(<NavItem text="Inicio" href="#" />);
    const link = screen.getByRole('link', { name: 'Inicio' });
    expect(link).toBeInTheDocument();
  });
});

// Testa se rendeiza o item com texto e href
// Apos, testa se o link gerado tem correspondecia com o href passado


