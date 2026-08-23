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

## 🚀 Running Tests

### Run All Tests
```bash
npm test
# or
npx cypress run
```

### Run Tests and Generate Report
```bash
npm run test:report
```

### Backend Tests Only (API)
```bash
npm run test:backend
# or
npx cypress run --spec "cypress/e2e/back/**/*.cy.js"
```

### Frontend Tests Only (UI)
```bash
npm run test:frontend
# or
npx cypress run --spec "cypress/e2e/front/**/*.feature"
```

### Interactive Mode
```bash
npm run cy:open
# or
npx cypress open
```

## 📊 Test Reports

This project uses **Cypress Mochawesome Reporter** to generate beautiful and detailed HTML reports.

### Generate Report
```bash
npm run test:report
```

This command will:
1. Clean previous reports, screenshots, and videos
2. Run all tests with automatic screenshot capture on failures
3. Generate a consolidated HTML report

### Open Report
```bash
npm run report:open
```

Or manually open: `cypress/reports/pass_[datetime]-[name]-report.html`

### Report Features
- ✅ **Visual Dashboard** — Test suite overview with pass/fail statistics and charts
- ✅ **Detailed Test Results** — Individual test execution details with duration
- ✅ **Test Hierarchy** — Organized by describe/feature blocks with test names
- ✅ **Failure Analysis** — Complete stack traces and error messages
- ✅ **Embedded Screenshots** — Automatic screenshots on test failures (inline in report)
- ✅ **Test Timing** — Execution time for each test and suite
- ✅ **Status Badges** — Quick visual indicators for pass/fail status
- ✅ **Responsive Design** — Works perfectly on all screen sizes

### Report Location
```
cypress/reports/
├── pass_[datetime]-[name]-report.html    # Main consolidated HTML report
└── .jsons/                                # Individual JSON reports (merged automatically)
    ├── pass_[datetime]-usuarios-report.json
    ├── pass_[datetime]-login-report.json
    └── pass_[datetime]-logout-report.json
```

### Screenshots
Screenshots are automatically captured on test failures and embedded directly in the HTML report. No need to manually open screenshot files!

**Note**: Reports, screenshots, and videos are automatically excluded from Git via `.gitignore`


## 📦 Dependencies

```json
{
  "@badeball/cypress-cucumber-preprocessor": "^26.0.0",
  "@bahmutov/cypress-esbuild-preprocessor": "^2.2.8",
  "@faker-js/faker": "^10.6.0",
  "ajv": "^8.20.0",
  "ajv-formats": "^3.0.1",
  "cypress": "^15.21.0",
  "cypress-mochawesome-reporter": "^5.0.0",
  "mochawesome": "^8.0.1",
  "mochawesome-merge": "^5.1.1",
  "mochawesome-report-generator": "^6.3.2"
}
```

## 📊 Current Results

### Backend API
✅ **5/5 tests passing** (100%)
- User registration
- Fetch user by valid ID
- Fetch user by invalid ID (error validation)
- User deletion
- Deletion confirmation

### Frontend UI
✅ **5/5 tests passing** (100%)
- Login with valid credentials ✅
- Login with invalid credentials ✅
- Login without email ✅
- Login without password ✅
- Successful logout ✅

**Total: 10/10 tests passing** 🎉

## 🔧 Installation

```bash
# Install dependencies
npm install

# Run tests
npm test

# Run tests with report
npm run test:report
```

## 📝 Notes

- **Backend**: Uses dynamic data generated with Faker on each execution
- **Frontend**: Uses BDD/Gherkin for readable scenarios by non-technical stakeholders
- **Zero Hardcode**: Everything is in fixtures or dynamically generated
- **Strict Validation**: All schemas are validated with AJV
- **Scalable Architecture**: Easy to add new tests and scenarios
- **Automated Reports**: Mochawesome generates beautiful HTML reports
- **Auto-registration**: Frontend tests automatically register users via API before execution

## 📚 Additional Documentation

- [Backend API Tests Documentation](cypress/e2e/back/README.md)
- [Cypress Official Documentation](https://docs.cypress.io/)
- [Faker.js Documentation](https://fakerjs.dev/)
- [AJV JSON Schema Validator](https://ajv.js.org/)
- [Cypress Mochawesome Reporter](https://github.com/LironEr/cypress-mochawesome-reporter)
