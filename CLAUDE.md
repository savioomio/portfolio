# portfolio-webdev

Trabalho da faculdade com entrega em **03/11/2026**: portfólio em React publicado e vídeo de entrevista técnica. O enunciado completo está em `docs/requisitos.md`.

## Antes de qualquer tarefa

1. **PC do laboratório** (Windows, usuário `labsfiap`): o hook de início de sessão diz o que falta configurar. Se faltar algo, rode o [setup do PC do lab](docs/runbooks/setup-pc-do-lab.md) antes de tudo. No Mac (máquina principal) nada se perde e o setup não se aplica.
2. Leia `docs/planejamento.md` (cronograma, arquitetura, fluxo de entrega).
3. Pegue a próxima tarefa aberta em `docs/tasks/backlog.md` e use a branch indicada nela.
4. Decisões tomadas estão em `docs/adr/`. Não reabra uma decisão sem um motivo novo; se mudar, escreva um ADR que substitui o anterior.
5. Escolha de tecnologia passa por uma research em `docs/research/` e vira ADR antes do código (skill `decisao`).

O ciclo completo de uma tarefa, do backlog ao deploy conferido, está na skill `tarefa`.

## Regras

- **Comandos:** antes de rodar cada comando, diga em uma frase o que ele faz e por quê; depois, o resultado. Nunca rode comandos em sequência sem explicar.
- **Autor dos commits:** `savioomio <saviopessoaafonso@gmail.com>`, configurado só no repositório, nunca `--global` (no PC do lab, a config global assinaria os commits de outras pessoas). Confira `git config user.email` antes do primeiro commit.
- **Commits:** Conventional Commits em português, ex.: `feat: adiciona validação do formulário de contato`. Tipos: `feat`, `fix`, `docs`, `chore`, `refactor`, `test`, `perf`.
- **Hooks do Git** ([ADR 0003](docs/adr/0003-qualidade-de-codigo.md)): o `pre-commit` roda ESLint e Prettier nos arquivos do commit e o `commit-msg` roda o commitlint. Nunca pule os hooks; se um deles recusar, corrija a causa e faça um commit novo. O CI repete as mesmas checagens.
- **Branches:** GitHub Flow. Uma branch por tarefa (`feature/*`, `fix/*`, `docs/*`, `chore/*`, `refactor/*`, `test/*`, `perf/*`), integrada na `main` por PR. Não commitar direto na `main`: ela é protegida (push direto recusado, merge só com o check `Build de validacao` verde).
- **PRs e merge:** o Claude abre o PR e faz o merge sozinho assim que o CI passar (`gh pr merge --merge --delete-branch`), sem esperar revisão; o Savio só confere o resultado. Relatório final curto: o que mudou e o link.
- **Deploy** ([ADR 0005](docs/adr/0005-deploy-automatico-github-actions.md)): automático, pelo job **Deploy na Cloudflare** do CI, a cada merge na `main`. Depois do merge, confira a mudança em `https://savioomiodev.com.br`. Deploy manual só em emergência (`docs/runbooks/deploy-cloudflare.md`). Nunca publicar no Worker `savioomiodev`, que é o site pessoal.
- **Credenciais:** tokens e segredos (Cloudflare, GitHub, backend) são criados pelo Savio. A IA não cria token, não grava segredo e não digita senha; ela prepara o passo a passo e espera.
- **Logins por navegador** (Wrangler etc.): gerar o link sem abrir o navegador e abrir no navegador da máquina (Chrome no lab, Comet no Mac).
- **Ao terminar uma tarefa:** siga a definição de pronto em `docs/planejamento.md` e marque `[x]` no backlog no mesmo PR.
- **Antes de sair do lab:** tudo enviado ao GitHub e os logins encerrados (passo 5 do setup).

## Código

- **Arquitetura** (a T10 move os arquivos atuais para cá):

  ```
  src/
  ├── app/          # App, rotas e providers
  ├── pages/        # uma página por rota
  ├── components/
  │   ├── ui/       # Button, Card, Input, Skeleton, Spinner: só apresentação
  │   ├── layout/   # Header, Footer e o que envolve todas as páginas
  │   ├── sections/ # blocos da Home
  │   ├── projects/ # cartões e páginas de projeto
  │   ├── dashboard/ # blocos do painel
  │   └── three/    # cenas 3D, sempre carregadas sob demanda
  ├── content/      # textos e dados fixos do site
  ├── hooks/        # useRepos, useContactForm, useAuth...
  ├── services/     # acesso a APIs, sem React
  ├── schemas/      # schemas de validação
  ├── lib/          # funções puras
  └── types/
  ```

  Componente visual não chama API: ele recebe dados de um hook, e o hook usa um service.
- **Nomenclatura:** componentes em PascalCase (`ProjectCard.tsx`), hooks começando com `use` (`useRepos.ts`), services e funções em camelCase (`github.ts`), imports a partir de `src` com `@/`.
- **Idioma:** nomes no código em inglês; textos da interface, comentários, commits e documentação em português.
- **Performance** (requisito 8): cena 3D e páginas pesadas (dashboard) com `React.lazy`, fora do bundle inicial; imagens com largura e altura definidas.
- **SEO** ([ADR 0014](docs/adr/0014-seo-pre-renderizacao.md)): toda página renderiza no build, então nada de `window` durante o render, e cada página declara o componente `Seo`. Rota nova entra em `src/app/pages.ts`, `src/entry-server.tsx` e, se for fixa, em `staticPaths`.
- **Estilo:** Tailwind. Componente que se repete em mais de uma página vira `components/ui/`.

## Harness de IA ([ADR 0006](docs/adr/0006-harness-ia-claude-code.md))

| Arquivo | Papel |
| --- | --- |
| `.claude/settings.json` | Libera comandos de verificação e liga os hooks |
| `.claude/hooks/guard-bash.mjs` | Bloqueia pular os hooks do Git, config global do Git e deploy no Worker do site pessoal |
| `.claude/hooks/lab-check.mjs` | No PC do lab, diz no início da sessão o que falta do setup |
| `.claude/skills/` | `tarefa`, `decisao`, `conferir-no-navegador`, `impeccable` (design, instalada em `.agents/`) |
| `PRODUCT.md` e `DESIGN.md` | Público, conteúdo real e identidade visual, lidos pela skill `impeccable` |
| `.claude/agents/` | `revisor` (diff contra estas regras), `pesquisador` (research com fontes oficiais) |
| `.mcp.json` | Documentação da Cloudflare e banco Supabase, só leitura |

No PC do lab, o navegador é controlado pelo MCP do Chrome (`chrome-devtools`), no escopo de usuário (passo 4 do setup). No Mac, que usa o Comet, é pelo CLI `dev-browser` ([ADR 0007](docs/adr/0007-navegador-no-mac-com-dev-browser.md)).
