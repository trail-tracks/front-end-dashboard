import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TrailCard from '@/components/dashboard/TrailCard';

describe('TrailCard (básico)', () => {
  it('renderiza título e botão', () => {
    render(
      <TrailCard
        title="Trilha X"
        estimatedTime="30 min"
        distance="2 km"
        difficulty="Fácil"
        imageUrl="/img.png"
      />
    );

    expect(screen.getByText('Trilha X')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /ver mais detalhes/i })).toBeInTheDocument();
  });
});


