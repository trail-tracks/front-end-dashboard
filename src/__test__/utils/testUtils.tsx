import { render, RenderOptions } from '@testing-library/react';
import { ReactElement } from 'react';

// Wrapper customizado para testes que precisam de providers
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

// Mock para fetch global
export const mockFetch = (data: any, ok = true) => {
  global.fetch = jest.fn().mockResolvedValue({
    ok,
    json: () => Promise.resolve(data),
  });
};

// Mock para console.log
export const mockConsoleLog = () => {
  const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  return consoleSpy;
};

// Helper para aguardar elementos aparecerem
export const waitForElement = async (text: string) => {
  const { screen } = await import('@testing-library/react');
  const { waitFor } = await import('@testing-library/react');
  
  return waitFor(() => {
    expect(screen.getByText(text)).toBeInTheDocument();
  });
};

// Helper para simular preenchimento de formulário
export const fillForm = async (user: any, fields: Record<string, string>) => {
  for (const [placeholder, value] of Object.entries(fields)) {
    const input = screen.getByPlaceholderText(new RegExp(placeholder, 'i'));
    await user.clear(input);
    await user.type(input, value);
  }
};

export * from '@testing-library/react';
export { customRender as render };

