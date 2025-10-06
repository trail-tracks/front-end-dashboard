import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import StepAddress from '@/components/auth/register/StepAddress';

describe('StepAddress (básico)', () => {
  it('renderiza campos e botão Continuar', () => {
    const onNext = jest.fn();
    const onData = jest.fn();

    render(<StepAddress onNext={onNext} onData={onData} />);

    expect(screen.getByText('Dados de Localização')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('00000000')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /continuar/i })).toBeInTheDocument();
  });
});


