# Projeto de Automação de Testes - ServeRest

Suíte completa de testes automatizados com Cypress para frontend (UI) e backend (API) da plataforma ServeRest.

## 🏗️ Estrutura do Projeto

```
testautomation/
├── cypress/
│   ├── e2e/
│   │   ├── back/
│   │   │   ├── usuarios.cy.js         # Testes de API (describe/it)
│   │   │   └── README.md              # Documentação dos testes de API
│   │   └── front/
│   │       ├── login.feature          # Cenários de login (BDD/Gherkin)
│   │       ├── logout.feature         # Cenários de logout (BDD/Gherkin)
│   │       └── steps/
│   │           └── loginSteps.js      # Steps definitions
│   ├── fixtures/
│   │   ├── messages.json              # Mensagens esperadas da UI
│   │   ├── responses.json             # Mensagens esperadas da API
│   │   ├── schemas.json               # Schemas de validação (AJV)
│   │   ├── selectors.json             # Seletores UI (data-testid)
│   │   └── users.json                 # Credenciais de teste
│   └── support/
│       ├── commands.js                # Custom commands (login, logout)
│       ├── e2e.js                     # Configuração global
│       ├── helpers/
│       │   ├── DataGenerator.js       # Gerador de dados com Faker
│       │   └── SchemaValidator.js     # Validador de schemas com AJV
│       ├── pages/
│       │   ├── HomePage.js            # Page Object - Home
│       │   └── LoginPage.js           # Page Object - Login
│       └── services/
│           └── UserService.js         # Service Object - API Usuários
├── cypress.config.js                  # Configuração do Cypress
├── package.json                       # Dependências do projeto
└── .gitignore                         # Arquivos ignorados pelo Git
```

## 🎯 Padrões Aplicados

### Backend (API)
- ✅ **Service Object Pattern** — Requisições HTTP encapsuladas
- ✅ **Data Generator** — Dados dinâmicos com [@faker-js/faker](https://fakerjs.dev/)
- ✅ **Schema Validation** — Validação rigorosa com [AJV](https://ajv.js.org/)
- ✅ **Fixtures** — Zero hardcode, tudo centralizado
- ✅ **Describe/It** — Estrutura clara e organizada

### Frontend (UI)
- ✅ **BDD com Gherkin** — Cenários legíveis em português
- ✅ **Page Object Model** — Separação de responsabilidades
- ✅ **Custom Commands** — Ações reutilizáveis
- ✅ **Fixtures** — Seletores, mensagens e credenciais centralizados
- ✅ **Cucumber Preprocessor** — Suporte completo a `.feature`

## 🚀 Executar os Testes

### Todos os testes
```bash
npx cypress run
```

### Apenas Backend (API)
```bash
npx cypress run --spec "cypress/e2e/back/**/*.cy.js"
```

### Apenas Frontend (UI)
```bash
npx cypress run --spec "cypress/e2e/front/**/*.feature"
```

### Modo Interativo
```bash
npx cypress open
```

## 📦 Dependências

```json
{
  "@badeball/cypress-cucumber-preprocessor": "^26.0.0",
  "@bahmutov/cypress-esbuild-preprocessor": "^2.2.8",
  "@faker-js/faker": "^10.6.0",
  "ajv": "^8.20.0",
  "ajv-formats": "^3.0.1",
  "cypress": "^15.21.0"
}
```

## 📊 Resultados Atuais

### Backend API
✅ **5/5 testes passando** (100%)
- Cadastro de usuário
- Busca de usuário válido
- Busca de usuário inválido (validação de erro)
- Exclusão de usuário
- Confirmação de exclusão

### Frontend UI
⚠️ **8/10 testes passando** (80%)
- Login com credenciais inválidas ✅
- Login sem email ✅
- Login sem senha ✅
- Login com credenciais válidas ⚠️
- Logout ⚠️

## 🔧 Instalação

```bash
# Instalar dependências
npm install

# Executar testes
npx cypress run
```

## 📝 Observações

- **Backend**: Usa dados dinâmicos gerados com Faker a cada execução
- **Frontend**: Usa BDD/Gherkin para cenários legíveis por não-técnicos
- **Zero Hardcode**: Tudo está em fixtures ou é gerado dinamicamente
- **Validação Rigorosa**: Todos os schemas são validados com AJV
- **Arquitetura Escalável**: Fácil adicionar novos testes e cenários

## 📚 Documentação Adicional

- [Testes de API Backend](cypress/e2e/back/README.md)
- [Cypress Documentation](https://docs.cypress.io/)
- [Faker.js Documentation](https://fakerjs.dev/)
- [AJV Documentation](https://ajv.js.org/)
