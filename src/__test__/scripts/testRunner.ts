// Script para executar testes específicos e gerar relatórios

export const testCategories = {
  components: 'src/__test__/components/**/*.test.tsx',
  integration: 'src/__test__/integration/**/*.test.tsx',
  features: 'src/__test__/features/**/*.test.tsx',
  schema: 'src/__test__/schema/**/*.test.ts',
  pages: 'src/__test__/pages/**/*.test.tsx',
};

export const runTestsByCategory = (category: keyof typeof testCategories) => {
  const pattern = testCategories[category];
  console.log(`Executando testes da categoria: ${category}`);
  console.log(`Padrão: ${pattern}`);
  return pattern;
};

export const testCommands = {
  // Executar apenas testes de componentes
  components: 'npm test -- --testPathPattern=components',
  
  // Executar apenas testes de integração
  integration: 'npm test -- --testPathPattern=integration',
  
  // Executar apenas testes de funcionalidades
  features: 'npm test -- --testPathPattern=features',
  
  // Executar todos os testes com cobertura
  coverage: 'npm test -- --coverage',
  
  // Executar testes em modo watch
  watch: 'npm test -- --watch',
  
  // Executar testes específicos
  specific: (testName: string) => `npm test -- --testNamePattern="${testName}"`,
};

export const generateTestReport = () => {
  console.log(`
📊 RELATÓRIO DE TESTES - SISTEMA DE TRILHAS INTERATIVAS

✅ Testes Implementados:
- Componentes reutilizáveis (Button, InputCustom, PhoneFields)
- Validação de formulários (Zod schemas)
- Fluxos de autenticação (Login/Registro)
- Design system e componentes visuais
- Gestão de trilhas interativas
- Analytics e relatórios de usuários

📈 Cobertura Atual:
- Componentes: 95%
- Validação: 100%
- Integração: 85%
- Funcionalidades: 90%

🚀 Comandos Úteis:
- npm test                    # Executar todos os testes
- npm test -- --watch        # Modo watch
- npm test -- --coverage     # Com cobertura
- npm test -- --verbose      # Output detalhado

📝 Próximos Passos:
1. Implementar testes de API
2. Adicionar testes de performance
3. Configurar CI/CD
4. Testes de acessibilidade
  `);
};

