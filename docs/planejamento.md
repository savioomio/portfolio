# Planejamento

**Entrega:** terça, 03/11/2026, com três links no Teams: GitHub, site publicado na Cloudflare (no lugar da Vercel, [ADR 0004](./adr/0004-entrega-sem-vercel.md)) e YouTube (não listado).
**Ponto de partida:** portfólio pessoal copiado em 20/10 ([ADR 0001](./adr/0001-reaproveitar-portfolio-existente.md)). O diagnóstico está em [`requisitos.md`](./requisitos.md#diagnóstico-do-código-herdado-20102026).
**Tarefas:** [`tasks/backlog.md`](./tasks/backlog.md).

## Cronograma

Uma fase por bloco de requisitos, com pelo menos um commit por dia para o histórico ficar distribuído ao longo do prazo, como o enunciado pede.

| Fase | Datas | Entrega | Requisitos |
| --- | --- | --- | --- |
| 0. Fundação | ter 20/10 – qua 21/10 | Docs, padrões de código e commits, proteção da `main`, deploy automático na Cloudflare, bugs herdados | 10, 11, 12, repositório |
| 1. Rotas e GitHub | qui 22/10 – sáb 24/10 | Estrutura de pastas, componentes base, cards vindos da API do GitHub com cache, `/projetos/:slug`, 404 e erro | 1, 2, 3, 7, 8 (cache) |
| 2. Contato | dom 25/10 – ter 27/10 | Formulário validado, envio por e-mail e persistência no banco | 2, 4 |
| 3. Dashboard e tema | qua 28/10 – qui 29/10 | Login, rota protegida, mensagens, projetos em destaque e tema persistido | 5, 6, 8 (lazy) |
| 4. Qualidade | sex 30/10 – sáb 31/10 | Testes no CI, Lighthouse mobile ≥ 80, responsivo validado | 7, 8, 9 |
| 5. Entrega | dom 01/11 – ter 03/11 | README final, diagramas, roteiro, gravação e envio | vídeo, repositório |

Folga: a Fase 5 tem dois dias de buffer. Se uma fase atrasar, a gravação do vídeo é o que não pode ser comprimido (precisa de pelo menos um dia).

## Stack

As decisões estão em [`docs/adr`](./adr/README.md) e a lista completa no [README](../README.md#tecnologias).

## Arquitetura alvo

Estrutura de pastas, fechada na T10. A regra é que componente visual não chama API: ele recebe dados de um hook, e o hook usa um service.

```
src/
├── app/            # App, rotas e providers (QueryClient, tema, auth)
├── pages/          # uma página por rota: Home, ProjectDetail, NotFound, Login, Dashboard
├── components/
│   ├── ui/         # Button, Card, Input, Skeleton, Spinner: só apresentação, sem regra de negócio
│   ├── layout/     # Header, Footer, Seo e o que envolve todas as páginas
│   ├── sections/   # blocos da Home: Hero, Storefront, Experience, ProjectRail, Contact
│   ├── projects/   # cartões e páginas de projeto
│   ├── dashboard/  # blocos do painel
│   └── three/      # cenas 3D, sempre carregadas sob demanda
├── content/        # textos e dados fixos do site
├── hooks/          # useRepos, useRepo, useContactForm, useAuth, useTheme
├── services/       # github.ts, supabase.ts, messages.ts: só acesso a APIs, sem React
├── schemas/        # schemas Zod (contactSchema)
├── lib/            # funções puras (cn, formatDate)
└── types/
```

Fluxo de dados da Home:

```
GitHub REST API ──► services/github.ts ──► hooks/useRepos (TanStack Query, cache) ──► sections/Projects ──► ui/Card
Supabase (destaques) ──► services/projects.ts ──┘
```

## Fluxo de uma alteração até o deploy

```
branch feature/x ──► commit ──► push ──► Pull Request ──► CI ──► merge na main ──► deploy automático
                      │                                  │                         └─ Cloudflare: savioomiodev.com.br
                      │                                  └─ lint + testes + build (obrigatório para o merge)
                      └─ Husky: lint-staged (ESLint + Prettier) e commitlint (Conventional Commits)
```

- **Branches (GitHub Flow):** `main` sempre publicável; `feature/*`, `fix/*`, `docs/*`, `chore/*`, `refactor/*`, `test/*` e `perf/*`, um prefixo por tipo de mudança. O nome de cada uma está no backlog.
- **Commits:** Conventional Commits em português (`feat: adiciona validação do formulário de contato`), autor `savioomio <saviopessoaafonso@gmail.com>`.
- **Merge:** por PR, com o CI verde. A `main` fica protegida contra push direto (T03).

## Definição de pronto (vale para toda tarefa)

1. Critério de aceite do backlog atendido e conferido no navegador (desktop e celular quando houver UI).
2. `npm run lint` e `npm run build` passando; testes passando a partir da Fase 4.
3. Se houve escolha de tecnologia: ADR escrito.
4. Tarefa marcada como feita no backlog, no mesmo PR.
5. PR integrado na `main` e o deploy conferido na URL pública.

## Riscos

| Risco | Impacto | Mitigação |
| --- | --- | --- |
| Limite da API do GitHub sem token: 60 requisições/hora **por IP**. No laboratório a turma inteira divide o mesmo IP | Cards em erro durante a aula ou a gravação | Cache do TanStack Query com `staleTime` longo e persistência local; tela de erro amigável para 403/429; gravar o vídeo fora da rede do lab |
| PC do laboratório compartilhado guarda os logins (`gh`, Wrangler) | Outra pessoa publicar na sua conta | Rodar `npx wrangler logout` ao sair ([runbook](./runbooks/setup-pc-do-lab.md)) |
| Segredos do backend expostos no front | Acesso indevido ao banco | Só a chave pública (publishable key) vai para o front; regras de RLS no banco; `.env` fora do Git |
| Cena 3D derrubar a nota do Lighthouse mobile | Requisito 8 reprovado | Cena fora do bundle inicial, carregada depois da primeira pintura; versão leve no celular |
| Vídeo da aranha pesando na página | Pior nota no Lighthouse | Já comprimido para 1,36 MB (T06); `preload="none"` e play só ao aparecer na tela |

## Vídeo (planejado desde já)

Cada fase deixa material para o vídeo, para a gravação não virar uma tarefa de pesquisa no último dia:

- **Parte 1, stack e arquitetura:** os diagramas desta página (pastas, fluxo de dados, branch até deploy).
- **Parte 2, justificativas:** uma fala por ADR (opções, critério, o que aceitamos perder).
- **Parte 3, harness de IA:** `CLAUDE.md`, `.claude/` e MCPs mostrados no repositório, mais um exemplo real de PR feito com a IA seguindo os padrões.

O roteiro fica em `docs/video-roteiro.md` (T27).
