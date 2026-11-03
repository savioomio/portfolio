# Portfólio WebDev · Sávio Pessôa Afonso

Portfólio em React de um desenvolvedor front-end especialista em e-commerce. A folha de uma embalagem dobra em 3D com a rolagem, os projetos vêm da API do GitHub, o contato vai para o banco e por e-mail, e um dashboard protegido responde mensagens e escolhe os destaques.

Trabalho da disciplina de Web Development da FIAP, entregue em 03/11/2026.

| | |
| --- | --- |
| Site | https://savioomiodev.com.br |
| Repositório | https://github.com/savioomio/portfolio |
| Vídeo | Link entregue no Teams |

## Tecnologias

| Área | Tecnologia | Decisão |
| --- | --- | --- |
| Base | React 19, TypeScript 5.8, Vite 5 | [ADR 0001](./docs/adr/0001-reaproveitar-portfolio-existente.md) |
| Identidade e 3D | Tailwind CSS 3, Three.js | [ADR 0008](./docs/adr/0008-identidade-faca-dourada.md) |
| Rotas e dados | React Router 7, TanStack Query | [ADR 0009](./docs/adr/0009-rotas-e-dados.md) |
| Backend e e-mail | Supabase (Auth, Postgres, RLS), Formspree | [ADR 0010](./docs/adr/0010-backend-supabase-e-formspree.md) |
| Formulário | React Hook Form, Zod | [ADR 0011](./docs/adr/0011-formulario-rhf-zod.md) |
| Tema | Context, `localStorage` e script no `<head>` | [ADR 0012](./docs/adr/0012-tema-sem-flash.md) |
| Testes | Vitest, Testing Library | [ADR 0013](./docs/adr/0013-testes-vitest.md) |
| SEO | Pré-renderização no build, 404 real, JSON-LD | [ADR 0014](./docs/adr/0014-seo-pre-renderizacao.md) |
| Qualidade | ESLint, Prettier, Husky, lint-staged, commitlint | [ADR 0003](./docs/adr/0003-qualidade-de-codigo.md) |
| Hospedagem e CI/CD | Cloudflare Workers, GitHub Actions | [ADR 0005](./docs/adr/0005-deploy-automatico-github-actions.md) |

## Como rodar

Pré-requisitos: Node.js 22 e npm.

```bash
git clone https://github.com/savioomio/portfolio.git
cd portfolio
npm install
cp .env.example .env
npm run dev
```

O site abre em `http://localhost:5173`. Sem o `.env`, ele funciona normalmente, exceto formulário, login e destaques.

| Script | O que faz |
| --- | --- |
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Checa os tipos, gera o build, pré-renderiza as rotas e o sitemap |
| `npm test` | Roda os testes |
| `npm run lint` | Roda o ESLint |
| `npm run format` | Formata com o Prettier |
| `npm run format:check` | Só confere a formatação |
| `npm run deploy` | Build e publicação manual, só em emergência ([runbook](./docs/runbooks/deploy-cloudflare.md)) |

O `.npmrc` usa `legacy-peer-deps=true`.

### Variáveis de ambiente

Listadas em [`.env.example`](./.env.example). Todas são públicas por natureza, porque quem protege os dados é o RLS do banco.

| Variável | Para quê |
| --- | --- |
| `VITE_SUPABASE_URL` | Endereço do projeto no Supabase |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Chave pública do Supabase |
| `VITE_FORMSPREE_ID` | Formulário do Formspree que envia o e-mail |

Para criar o backend do zero, siga o [runbook](./docs/runbooks/backend-supabase.md).

## Estrutura de pastas

```
src/
├── app/            # rotas, providers e cliente de cache
├── pages/          # uma página por rota
├── components/
│   ├── ui/         # Button, Card, Input, Skeleton, Spinner: só apresentação
│   ├── layout/     # Header, Footer, Seo e o que envolve todas as páginas
│   ├── sections/   # blocos da Home, com o trilho em rail/
│   ├── projects/   # cartões e páginas de projeto
│   ├── dashboard/  # blocos do painel
│   └── three/      # cenas 3D, sempre carregadas sob demanda
├── content/        # textos e dados fixos do site
├── hooks/          # useRepos, useContactForm, useAuth, useTheme...
├── services/       # acesso a APIs, sem React
├── schemas/        # validação com Zod
├── lib/            # funções puras
├── types/
└── entry-server.tsx  # renderização das rotas no build
tools/prerender.mjs   # grava o HTML de cada rota, o 404 e o sitemap
supabase/schema.sql   # tabelas e regras de acesso
```

A regra central: **componente visual não chama API**. Ele recebe dados de um hook, e o hook usa um service. Diagramas em [`docs/diagramas.md`](./docs/diagramas.md).

## Padrões

### Nomenclatura

- Componentes em PascalCase: `ProjectRail.tsx`.
- Hooks começando com `use`: `useRepos.ts`.
- Services e funções em camelCase: `github.ts`.
- Imports a partir de `src` com `@/`.
- Nomes no código em inglês; textos da interface, comentários, commits e documentação em português.

### Commits

[Conventional Commits](https://www.conventionalcommits.org/pt-br/) em português, como `feat: adiciona validação do formulário de contato`. Tipos: `feat`, `fix`, `docs`, `chore`, `refactor`, `test` e `perf`.

Antes de cada commit, o Husky roda ESLint e Prettier nos arquivos alterados e o commitlint na mensagem. O CI repete tudo.

### Branches

GitHub Flow: a `main` é sempre publicável e protegida, com push direto recusado. Cada tarefa ganha uma branch `feature/*`, `fix/*`, `docs/*`, `chore/*`, `refactor/*`, `test/*` ou `perf/*`, e entra por PR com o CI verde.

### Deploy

Cada merge na `main` passa por commitlint, lint, formatação, testes e build, e o job **Deploy na Cloudflare** publica o site. O caminho completo está em [`docs/diagramas.md`](./docs/diagramas.md).

## Requisitos e qualidade

- Cada requisito do enunciado aponta para onde está no código: [`docs/requisitos.md`](./docs/requisitos.md#situação-na-entrega-31102026).
- PageSpeed e performance real: [`docs/qualidade/lighthouse.md`](./docs/qualidade/lighthouse.md).
- Identidade visual: [`DESIGN.md`](./DESIGN.md).

## IA no projeto

O desenvolvimento foi conduzido com Claude Code. O harness está versionado no repositório ([ADR 0006](./docs/adr/0006-harness-ia-claude-code.md)):

| Arquivo | Papel |
| --- | --- |
| [`CLAUDE.md`](./CLAUDE.md) | Regras, arquitetura e fluxo |
| [`.claude/settings.json`](./.claude/settings.json) | Permissões e hooks |
| [`.claude/hooks/`](./.claude/hooks) | Bloqueiam pular os hooks do Git, config global e deploy no Worker errado |
| [`.claude/skills/`](./.claude/skills) | `tarefa`, `decisao`, `conferir-no-navegador` e `impeccable` |
| [`.claude/agents/`](./.claude/agents) | `revisor` e `pesquisador` |
| [`.mcp.json`](./.mcp.json) | Documentação da Cloudflare e banco Supabase, só leitura |

## Documentação

| Pasta | Conteúdo |
| --- | --- |
| [`docs/planejamento.md`](./docs/planejamento.md) | Cronograma e arquitetura |
| [`docs/tasks/backlog.md`](./docs/tasks/backlog.md) | Tarefas |
| [`docs/research/`](./docs/research) | Comparação de alternativas, com fontes |
| [`docs/adr/`](./docs/adr) | Decisões e o que aceitamos perder |
| [`docs/runbooks/`](./docs/runbooks) | Passo a passo de operação |
| [`docs/video-roteiro.md`](./docs/video-roteiro.md) | Roteiro do vídeo |
