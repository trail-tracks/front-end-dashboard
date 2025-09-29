Estratégia de Testes – Dashboard gerencial: Trilhas Interativas 

### Visão geral
Esta suíte valida componentes, páginas e fluxos principais (login e registro), com validação de formulários via Zod e mocks para integrações do Next.js. O objetivo é garantir feedback rápido, previsível e automatizável em CI.

### Estrutura dos testes
- **Componentes** (`src/__test__/components/`)
  - `Button.test.tsx`: variantes, renderização e eventos
  - `InputCustom.test.tsx`: erros, ícone de toggle, variantes
  - `PhoneFields.test.tsx`: DDI/DDD/telefone e mensagens de erro
- **Validação (schema)** (`src/__test__/schema/`)
  - `authSchema.test.ts`: regras Zod de login/registro/endereço
- **Integração** (`src/__test__/integration/`)
  - `loginFlow.test.tsx`: fluxo de login completo (validação + navegação)
  - `registerFlow.test.tsx`: registro em etapas (instituição → endereço)
- **Páginas** (`src/__test__/pages/`)
  - `designSystem.test.tsx`: renderização e elementos base do design system

### Bibliotecas e ferramentas
- **Jest 30** + `next/jest`: runner e integração com Next.js
- **jest-environment-jsdom**: ambiente DOM para testes de UI
- **@testing-library/react** e **@testing-library/user-event**: interação realista
- **@testing-library/jest-dom**: matchers para o DOM
- **Zod**: validação consistente com o runtime

### Configuração relevante
```ts
// jest.config.ts (trecho)
import nextJest from 'next/jest.js'
const createJestConfig = nextJest({ dir: './' })
export default createJestConfig({
  coverageProvider: 'babel',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts', '<rootDir>/src/__test__/setupTests.ts'],
})
```

Scripts úteis (`package.json`):
```json
{
  "test": "jest",
  "test:watch": "jest --watch",
  "test:coverage": "jest --coverage",
  "test:components": "jest --testPathPatterns=components",
  "test:integration": "jest --testPathPatterns=integration",
  "test:features": "jest --testPathPatterns=features"
}
```

### Execução
```bash
# Todos os testes
npm test

# Integração
npm run test:integration

# Cobertura
npm run test:coverage

# Abrir relatório HTML
# coverage/lcov-report/index.html
```

### Relatórios
- Cobertura: HTML/LCOV em `coverage/` (via `test:coverage`).
- Terminal: `npx jest --coverage --coverageReporters=text`.
- CI (opcional): `jest-junit` para `junit.xml` e Codecov para publicar cobertura.

### Estratégias e diretrizes
- Preferir seletores acessíveis: `getByRole`, `getByLabelText` antes de `getByPlaceholderText`.
- Mocks estáveis:
  - `next/navigation` (roteamento) e `next/image` em `__mocks__`.
  - `fetch`: mock manual local; recomendável migrar para **MSW** para cenários de API.
- Testes de integração simulam fluxos end-to-end no nível de UI (sem navegador real).
- Evitar acoplamento a estilos/estrutura de DOM; focar em comportamento observável.

### Padrões de qualidade
- Testes isolados, idempotentes, e com Arrange-Act-Assert.
- Mensagens do Zod alinhadas ao UI para evitar falsos negativos.
- Cobertura orientada a risco (fluxos críticos primeiro). Sugestão de threshold global ≥ 80%.

### Roadmap (próximos passos)
- Adicionar thresholds de cobertura no `jest.config.ts`.
- Introduzir **MSW** para mocks de rede mais realistas.
- Adicionar testes de acessibilidade com `jest-axe`.
- Pipeline CI (ex.: GitHub Actions) com `npm ci && npm run test:ci` (script a criar).
- E2E leve com Playwright/Cypress quando rotas/UX estiverem mais completas.

### Estado atual (resumo)
- Suites cobertas: componentes, schema, integração de login/registro e página de design system.
- Execução rápida e determinística em `jsdom`.
- Pronto para automação em CI; melhorias incrementais sugeridas acima.
