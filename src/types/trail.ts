type Trail = {
  id: string;
  imageUrl: string;
  title: string;
  estimatedTime: string;
  distance: string;
  difficulty: string;
  interaction: string;
};

type TrailResponse = {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  duration: number;
  distance: number;
  difficulty: 'facil' | 'moderado' | 'dificil' | 'muito_dificil';
  safetyTips: string;
  coverUrl: string | null;
};

export type { Trail, TrailResponse };
