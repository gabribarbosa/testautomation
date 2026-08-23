# Testes de API - Backend

Testes automatizados para validação da API REST do ServeRest usando `cy.request()` com `describe/it`.

## 📋 Estrutura

```
cypress/e2e/back/
└── usuarios.cy.js         # Testes completos da API de usuários
```

## 🔗 Fluxo dos Testes

Os testes são **sequenciais e correlacionados** dentro de um único arquivo:

1. **POST /usuarios** → Cria um usuário dinâmico com Faker e armazena o `_id`
2. **GET /usuarios/:id** → Busca o usuário criado usando o `_id` armazenado
3. **GET /usuarios/:id (inválido)** → Testa busca com ID inválido (validação de erro)
4. **DELETE /usuarios/:id** → Remove o usuário usando o `_id` armazenado
5. **GET /usuarios/:id (após DELETE)** → Confirma que o usuário foi deletado

## 🛠️ Arquitetura

### Service Object Pattern
- `UserService.js` — Encapsula todas as requisições HTTP da API de usuários
  - `register(userData)` → POST /usuarios
  - `getById(userId)` → GET /usuarios/:id
  - `delete(userId)` → DELETE /usuarios/:id

### Helpers
- `DataGenerator.js` — Gera dados dinâmicos com [@faker-js/faker](https://fakerjs.dev/)
  - `generateUserData(isAdmin)` → Retorna `{ nome, email, password, administrador }`
- `SchemaValidator.js` — Valida schemas JSON com [AJV](https://ajv.js.org/)
  - `validate(data, schema)` → Retorna `true` ou lança erro detalhado

### Fixtures
- `schemas.json` — Schemas de validação para todas as respostas
  - `registerSuccess` — Resposta de cadastro com sucesso
  - `getUserSuccess` — Resposta de busca de usuário
  - `deleteSuccess` — Resposta de exclusão com sucesso
  - `userNotFound` — Resposta de erro para ID inválido
- `responses.json` — Mensagens esperadas da API

## ✅ Validações

Cada teste valida:
- ✅ **Status code** correto (200, 201, 400)
- ✅ **Estrutura da resposta** (campos obrigatórios)
- ✅ **Valores esperados** (mensagens, IDs, dados do usuário)
- ✅ **Schema JSON completo** usando AJV (tipos, formatos, campos adicionais)

## 🚀 Executar

```bash
# Apenas testes de API backend
npx cypress run --spec "cypress/e2e/back/**/*.cy.js"

# Modo interativo
npx cypress open
```

## 📊 Resultado Atual

```
✔  5 passing (1s)

API de Usuários - Fluxo Completo
  POST /usuarios - Cadastro
    ✓ Deve cadastrar um novo usuário com sucesso
  GET /usuarios/:id - Busca
    ✓ Deve buscar um usuário por ID válido
    ✓ Deve retornar erro ao buscar usuário com ID inválido
  DELETE /usuarios/:id - Exclusão
    ✓ Deve deletar um usuário por ID válido
    ✓ Deve confirmar que o usuário foi deletado (GET após DELETE)
```

## 📝 Observações

- ✅ Dados gerados dinamicamente a cada execução (nome, email, senha)
- ✅ ID compartilhado entre testes via closure
- ✅ Zero hardcode — tudo em fixtures
- ✅ Service Object para isolamento de requisições HTTP
- ✅ Validação rigorosa de schemas com AJV
