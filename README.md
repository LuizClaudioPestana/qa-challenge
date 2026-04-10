# 🤖 QA Automation Challenge

Projeto de automação de testes desenvolvido como parte do **QA Automation Challenge da Accenture**, cobrindo testes de API e testes de interface frontend.

**Stack:** JavaScript · Cypress · Cucumber BDD · Page Object Model

---

## 📋 Sobre o Projeto

O desafio está dividido em duas partes:

**Parte 1 — API Testing** ([demoqa.com/swagger](https://demoqa.com/swagger/))
Fluxo completo: criação de usuário → autenticação → listagem de livros → reserva → consulta de detalhes.

**Parte 2 — Frontend Testing** ([demoqa.com](https://demoqa.com/))
Automação de formulários, janelas do browser, tabelas com CRUD, barra de progresso e drag & drop.

---

## 🗂️ Estrutura do Projeto

```
qa-challenge/
├── cypress/
│   ├── e2e/
│   │   ├── api/
│   │   │   └── bookstore.cy.js
│   │   └── frontend/
│   │       ├── forms.cy.js
│   │       ├── browserWindows.cy.js
│   │       ├── webTables.cy.js
│   │       ├── progressBar.cy.js
│   │       └── sortable.cy.js
│   ├── fixtures/
│   │   └── upload.txt              ← arquivo usado no upload do formulário
│   └── support/
│       ├── commands.js
│       └── e2e.js
├── cucumber/
│   ├── features/
│   │   ├── api/bookstore.feature
│   │   └── frontend/
│   │       ├── forms.feature
│   │       ├── browserWindows.feature
│   │       ├── webTables.feature
│   │       ├── progressBar.feature
│   │       └── sortable.feature
│   └── step_definitions/
│       ├── api/bookstore.steps.js
│       └── frontend/
│           ├── forms.steps.js
│           ├── browserWindows.steps.js
│           ├── webTables.steps.js
│           ├── progressBar.steps.js
│           └── sortable.steps.js
├── pages/
│   ├── PracticeFormPage.js
│   ├── BrowserWindowsPage.js
│   ├── WebTablesPage.js
│   ├── ProgressBarPage.js
│   └── SortablePage.js
├── cypress.config.js
└── package.json
```

---

## ✅ Pré-requisitos

Antes de executar o projeto, certifique-se de ter instalado:

- [Node.js](https://nodejs.org/) versão **18 ou superior**
- [npm](https://www.npmjs.com/) versão **9 ou superior**
- [Git](https://git-scm.com/)

Para verificar as versões instaladas:

```bash
node --version
npm --version
```

---

## 🚀 Instalação

**1. Clone o repositório:**

```bash
git clone https://github.com/LuizClaudioPestana/qa-challenge.git
cd qa-challenge
```

**2. Instale as dependências:**

```bash
npm install
```

**3. Verifique se o Cypress está configurado corretamente:**

```bash
npx cypress verify
```

---

## ▶️ Executando os Testes

### Interface gráfica (modo interativo)

```bash
npx cypress open
```

Abre o Cypress Test Runner. Selecione o tipo de teste (E2E), escolha um navegador e clique no arquivo de teste desejado.

### Linha de comando (modo headless)

```bash
# Executar todos os testes
npx cypress run

# Executar apenas os testes de API
npx cypress run --spec "cypress/e2e/api/**"

# Executar apenas os testes de frontend
npx cypress run --spec "cypress/e2e/frontend/**"

# Executar um cenário específico
npx cypress run --spec "cypress/e2e/frontend/webTables.cy.js"
```

### Executar features do Cucumber

```bash
# Todos os features
npx cypress run --spec "cucumber/features/**/*.feature"

# Feature específica
npx cypress run --spec "cucumber/features/frontend/webTables.feature"
```

---

## 🧪 Cobertura de Testes

### Parte 1 — API

| Cenário | Método | Endpoint |
|---------|--------|----------|
| Criar usuário | POST | `/Account/v1/User` |
| Gerar token de acesso | POST | `/Account/v1/GenerateToken` |
| Verificar autorização | POST | `/Account/v1/Authorized` |
| Listar livros disponíveis | GET | `/BookStore/v1/Books` |
| Reservar 2 livros | POST | `/BookStore/v1/Books` |
| Consultar detalhes do usuário | GET | `/Account/v1/User/{userID}` |

### Parte 2 — Frontend

| Módulo | Funcionalidade testada |
|--------|----------------------|
| Forms → Practice Form | Preenchimento completo, upload de arquivo, validação de popup, fechar popup |
| Alerts → Browser Windows | Abrir nova janela, validar texto "This is a sample page", fechar janela |
| Elements → Web Tables | Criar registro, editar registro, deletar registro |
| Widgets → Progress Bar | Parar antes de 25%, validar valor, atingir 100%, resetar |
| Interactions → Sortable | Drag & drop para ordenação crescente |

### Bônus

| Bônus | Descrição |
|-------|-----------|
| 12 registros dinâmicos | Criar 12 registros via `Scenario Outline` no Cucumber |
| Deletar todos os registros | Remover todos os 12 registros criados |

---

## 🏗️ Padrões e Arquitetura

### Page Object Model

Os seletores e ações de cada página ficam encapsulados em classes dentro da pasta `pages/`. Os testes consomem essas classes sem duplicar lógica. Todas as páginas testadas possuem seu Page Object correspondente:

| Page Object | Página coberta |
|-------------|---------------|
| `PracticeFormPage.js` | Forms → Practice Form |
| `BrowserWindowsPage.js` | Alerts → Browser Windows |
| `WebTablesPage.js` | Elements → Web Tables |
| `ProgressBarPage.js` | Widgets → Progress Bar |
| `SortablePage.js` | Interactions → Sortable |

```js
// Exemplo de uso
const WebTablesPage = require('../../pages/WebTablesPage')

it('deve criar um novo registro', () => {
  WebTablesPage.addRecord({ firstName: 'Alice', lastName: 'Silva', ... })
  WebTablesPage.assertRecordExists('Alice')
})
```

### Cucumber BDD

Os cenários de teste são escritos em Gherkin (português) nos arquivos `.feature`, tornando os testes legíveis por qualquer pessoa da equipe.

```gherkin
# Exemplo de Scenario Outline com tabela de dados
Scenario Outline: Criar 12 registros dinamicamente
  Given estou na página Web Tables
  When adiciono um registro com nome "<firstName>"
  Then o registro "<firstName>" deve aparecer na tabela

  Examples:
    | firstName |
    | Alice     |
    | Bruno     |
    | Carlos    |
    ...
```

---

## 📁 Arquivo de Upload

O arquivo `cypress/fixtures/upload.txt` é obrigatório para o teste do **Practice Form**. Ele já está incluído no repositório e será referenciado automaticamente durante o teste.

---

## ⚠️ Observações sobre o demoqa.com

O site utilizado nos testes possui **anúncios com iframes de origens externas** que podem interferir na execução. As seguintes medidas foram adotadas no projeto:

- `chromeWebSecurity: false` no `cypress.config.js` — evita erros de cross-origin (incluindo o `bad IPC message reason 114` do Chromium)
- `cy.dismissOverlays()` — comando customizado que oculta banners e ads antes de cada teste
- Remoção de `<iframe>` de ads antes de usar `cy.stub(win, 'open')` no cenário de Browser Windows

---

## 🛠️ Dependências

| Pacote | Versão | Finalidade |
|--------|--------|-----------|
| `cypress` | ^13.x | Framework de automação E2E |
| `@badeball/cypress-cucumber-preprocessor` | ^20.x | Integração Cucumber + Cypress |
| `@bahmutov/cypress-esbuild-preprocessor` | ^2.x | Bundler para os feature files |
| `@4tw/cypress-drag-drop` | ^2.x | Plugin para drag & drop |

---

## ⚙️ Configuração Principal

O arquivo `cypress.config.js` centraliza as configurações do projeto:

```js
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://demoqa.com',
    specPattern: ['cypress/e2e/**/*.cy.js', 'cucumber/features/**/*.feature'],
    viewportWidth: 1280,
    viewportHeight: 720,
    video: false,
    defaultCommandTimeout: 10000,
    chromeWebSecurity: false,   // necessário para sites com iframes cross-origin (ex: ads do demoqa)
    setupNodeEvents(on, config) {
      // configuração do Cucumber preprocessor via addCucumberPreprocessorPlugin
    }
  }
})

```
## 📝 Licença

Projeto desenvolvido para fins avaliativos — QA Automation Challenge.