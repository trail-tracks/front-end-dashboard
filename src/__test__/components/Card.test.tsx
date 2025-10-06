import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Card from '@/components/dashboard/Card';

describe('Card (básico)', () => {
  it('renderiza label e value', () => {
    render(<Card value="10" label="Trilhas" />);
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('Trilhas')).toBeInTheDocument();
  });
});


