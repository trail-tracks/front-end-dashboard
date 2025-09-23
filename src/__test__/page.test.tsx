import {render, screen, fireEvent} from '@testing-library/react';
import Register from '@/app/(auth)/register/page';
import '@testing-library/jest-dom';

describe('Tela de Login', () => {
    it('renderiza todos os elementos do formulário', () => {
      render(<Register />);
  
      // Verifica se o título está presente
      expect(screen.getByText(/fazer login/i)).toBeInTheDocument();
  
      // Verifica se os campos de input estão presentes
      expect(screen.getByPlaceholderText(/digite seu email/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/digite sua senha/i)).toBeInTheDocument();
  
      // Verifica se o botão Entrar está presente
      expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument();
  
      // Verifica se o link de cadastro está presente
      expect(screen.getByText(/cadastre-se/i)).toBeInTheDocument();
    });
