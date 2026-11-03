# Requisitos do trabalho

Enunciado original, transcrito para que qualquer pessoa (ou sessão da IA) tenha o contexto completo sem depender do Teams. No fim, o diagnóstico do código herdado do portfólio pessoal.

---

## Visão geral

Você vai construir e publicar o seu próprio site de portfólio em React e apresentar as decisões de engenharia do projeto num vídeo que simula uma entrevista de emprego.

- **Formato:** individual
- **Entrega (na tarefa do Teams):**
  - Link do projeto no GitHub
  - Link do projeto publicado na Vercel
  - Link do vídeo no modo não listado no YouTube
- **Prazo:** 03/11
- **Uso de IA:** liberado e esperado. Você deve saber explicar tudo o que está no seu código e mostrar como configurou e conduziu a IA durante o projeto.

### Inspirações

- https://reactjsexample.com/24-best-free-open-source-react-portfolio-page-templates/
- https://bruno-simon.com/
- https://www.awwwards.com/websites/portfolio/

Os requisitos abaixo descrevem o que o site precisa fazer. Cada um traz, em itálico, algumas possibilidades de implementação. Elas servem de ponto de partida: você pode usar outras, desde que pesquise as alternativas, compare prós e contras e justifique a sua escolha.

## Requisitos do site

Todos os requisitos são obrigatórios.

### 1. Rotas

- Link individual para cada projeto (ex.: `/projetos/meu-app`)
- Página amigável para rota inexistente (404) e para falha no carregamento da API
- Link compartilhado abre direto na página certa, inclusive ao atualizar o navegador

*Possibilidades: React Router, TanStack Router, wouter, Next.js; configuração de redirecionamento no servidor (ex.: .htaccess)*

### 2. Estados de carregamento

- Todo dado vindo de API exibe os estados de carregamento, erro e lista vazia
- Indicador visual enquanto carrega (ex.: skeleton nos cards de projeto, spinner no envio do formulário)
- Botão de enviar bloqueado durante o envio, evitando mensagens duplicadas

*Possibilidades: skeleton ou spinner; estados com useState, Suspense, TanStack Query, SWR; react-loading-skeleton ou componentes da biblioteca de UI*

### 3. Integração com o GitHub

- Projetos carregados pela API do GitHub, sem cadastro manual
- Cada card exibe dados do repositório (ex.: descrição, linguagem, data da última atualização)

*Possibilidades: fetch, axios, TanStack Query; tratamento do limite de requisições da API*

### 4. Formulário de contato

- Validação por campo com mensagem específica (ex.: "e-mail inválido", "mensagem com no mínimo 20 caracteres")
- Mensagem enviada por e-mail ao dono do site e salva para consulta no dashboard
- Feedback de sucesso ou erro após o envio

*Possibilidades: validação manual, React Hook Form, Formik; Zod, Yup; EmailJS, Formspree, backend próprio*

### 5. Dashboard do dono

- Acesso protegido por login, redirecionando quem não está autenticado
- Lista das mensagens recebidas, com opção de marcar como respondida
- Seleção dos projetos que aparecem em destaque na home

*Possibilidades: Supabase, Firebase, Appwrite, PocketBase, backend em Node; rotas protegidas; Context, Zustand, Redux Toolkit ou nenhuma biblioteca de estado*

### 6. Preferências do visitante

- Tema claro/escuro persistido entre visitas (ex.: o site abre no escuro se o visitante saiu no escuro)

*Possibilidades: Context + localStorage, Zustand, bibliotecas de tema*

### 7. Interface

- Layout responsivo testado em celular e desktop
- Componentes visuais reaproveitados (ex.: o mesmo botão e o mesmo card em todas as páginas)
- Identidade visual própria, podendo incluir elementos 3D interativos (ex.: objeto na home que reage ao mouse ou à rolagem)

*Possibilidades: CSS puro, CSS Modules, Tailwind, shadcn/ui, MUI, Mantine; Three.js, React Three Fiber, Spline*

### 8. Performance

- Nota mínima de 80 em performance no Lighthouse, em modo mobile
- Imagens otimizadas em formato e tamanho, carregadas só quando aparecem na tela
- Dashboard e elementos pesados (ex.: cena 3D) carregados sob demanda, fora do pacote inicial do visitante
- Sem saltos de layout durante o carregamento
- Sem requisições repetidas à API do GitHub ao navegar entre páginas

*Possibilidades: React.lazy + Suspense, divisão por rota; WebP ou AVIF, loading="lazy", sharp; cache com TanStack Query ou SWR; memo e useMemo; rollup-plugin-visualizer; Lighthouse e PageSpeed Insights*

### 9. Testes

- Testes automatizados cobrindo, no mínimo, a validação do formulário e o bloqueio do dashboard sem login

*Possibilidades: Vitest + Testing Library, Playwright*

### 10. Deploy

- Site publicado com URL pública
- Publicação automática a cada push na branch principal

*Possibilidades: Vercel, Netlify, Hostinger, Locaweb, HostGator, KingHost; deploy via GitHub Actions*

### 11. Versionamento

- Commits seguindo um padrão de mensagem definido (ex.: `feat: adiciona validação do formulário de contato`)
- Estratégia de branches definida, com cada funcionalidade desenvolvida em branch própria e integrada à principal (ex.: `feature/dashboard`)
- Padrões descritos no README e nas instruções do projeto para a IA, para que ela também os siga

*Possibilidades: Conventional Commits, Gitmoji; commitlint + Husky; GitHub Flow, Git Flow, trunk-based; pull requests e proteção da branch principal*

### 12. Arquitetura e padronização do código

- Estrutura de pastas com responsabilidades claras (ex.: `components`, `pages`, `services`, `hooks`)
- Componentes pequenos e reaproveitáveis, com a lógica separada da apresentação (ex.: chamadas à API em `services` ou em hooks personalizados, fora dos componentes visuais)
- Convenções de nomenclatura definidas (ex.: componentes em PascalCase, hooks começando com `use`), descritas no README e nas instruções do projeto para a IA
- Padrão de código verificado automaticamente (ex.: lint e formatação aplicados antes de cada commit)

*Possibilidades: organização por tipo de arquivo ou por funcionalidade (feature-based), atomic design; hooks personalizados; ESLint, Prettier, Biome; Husky + lint-staged; TypeScript*

## Repositório

- Repositório público no GitHub, com histórico de commits distribuído ao longo do prazo
- Arquivo `.env` fora do repositório, com um `.env.example` indicando as variáveis necessárias
- README com informações sobre o projeto, tecnologias utilizadas e instruções para rodar o projeto

## Vídeo de entrevista

Imagine que você está numa entrevista técnica para uma vaga de desenvolvimento front-end e o entrevistador pediu para você apresentar o seu portfólio, com foco na stack tecnológica e no harness de IA que você montou para desenvolvê-lo.

- Duração máxima de 8 minutos
- Rosto e tela visíveis durante todo o vídeo
- Publicado no YouTube como **não listado**

O vídeo deve cobrir três partes:

1. **Stack e arquitetura:** apresente as tecnologias do projeto e como elas se conectam. Use elementos visuais como um diagrama simples da estrutura de pastas e do fluxo de dados, explique o critério usado para dividir os componentes e o caminho de uma alteração desde a branch até o deploy.
2. **Justificativas da stack:** para cada escolha relevante, diga quais opções você comparou, qual critério usou e o que aceitou perder.
3. **Harness de IA:** apresente o conjunto que você montou para trabalhar com a IA neste projeto e justifique cada escolha, como fez com a stack:
   - ferramenta e modelo utilizados, e por que eles
   - instruções do projeto, skills, conectores/MCPs e agentes configurados, mostrando os arquivos versionados no repositório
   - como esse conjunto faz a IA seguir os padrões de arquitetura, código, commits e branches do projeto

---

## Diagnóstico do código herdado (20/10/2026)

O projeto partiu do portfólio pessoal ([ADR 0001](./adr/0001-reaproveitar-portfolio-existente.md)). Situação de cada requisito no ponto de partida:

| # | Requisito | Já existe | Falta |
| --- | --- | --- | --- |
| 1 | Rotas | React Router 7 com `/` e `/links`; F5 em rota interna funciona (fallback de SPA no Worker) | `/projetos/:slug`; página 404 (hoje `*` renderiza a Home); página de erro de API |
| 2 | Estados de carregamento | — | Tudo: não há dado vindo de API |
| 3 | GitHub | — | Tudo: `Projects.tsx` tem 4 projetos fixos no código |
| 4 | Formulário de contato | — | Tudo: `Contact.tsx` só tem links sociais |
| 5 | Dashboard | — | Tudo |
| 6 | Tema | `next-themes` instalado, mas não usado | Tema claro e alternância persistida |
| 7 | Interface | Identidade visual própria, cena 3D (React Three Fiber), componentes em `components/ui/` | `Button`/`Card`/`Input` padronizados e reaproveitados; teste responsivo documentado |
| 8 | Performance | Seções da Home e cena 3D com `React.lazy`; `manualChunks`; imagens WebP com `loading="lazy"`; `rollup-plugin-visualizer` instalado | Medir Lighthouse mobile; `srcset`/`sizes`; 2 imagens `.jfif`; cache da API; dashboard em chunk separado |
| 9 | Testes | — | Tudo |
| 10 | Deploy | `https://savioomiodev.com.br` (Cloudflare Workers, `npm run deploy`); CI valida o build | Deploy automático a cada push; **link na Vercel** (exigido na entrega) |
| 11 | Versionamento | Histórico novo desde 20/10 em Conventional Commits | commitlint + Husky; branch por funcionalidade; proteção da `main`; padrões no README e no `CLAUDE.md` |
| 12 | Arquitetura | TypeScript, ESLint, pastas `components`, `pages`, `hooks`, `lib` | `services/`; Prettier; lint-staged; convenções escritas |
| — | Repositório | Público | `.env.example`; README atualizado (o atual cita Cloudflare Pages, `About.tsx` e `DESIGN_SYSTEM.md`, que não existem) |

### Bugs encontrados no código herdado

- **Vídeo da aranha robô não carrega:** `Experience.tsx` aponta para `https://savioomiodev.com.br/assets/videos/aranha-robo.mp4`, que devolve HTML (fallback de SPA). O arquivo não estava no repositório. Versão comprimida gerada em 20/10 a partir do YouTube (ver T06).
- **E-mail errado no rodapé:** `Contact.tsx` usa `mailto:saviopessaafonso@gmail.com` (falta um "o").
- **Google Analytics do site pessoal:** `index.html` carrega o `G-D95NTX6SGZ`, então as visitas deste projeto caem nas estatísticas do portfólio pessoal.
- **CI procurava `_redirects`:** corrigido em `54ceb4f`.

---

## Situação na entrega (31/10/2026)

| # | Requisito | Onde está |
| --- | --- | --- |
| 1 | Rotas | `src/app/AppRoutes.tsx`; `/projetos/:slug` em `src/pages/ProjectDetail.tsx`; 404 em `src/pages/NotFound.tsx`; erro de API em `RepoError`; F5 servido por HTML gerado ([ADR 0014](./adr/0014-seo-pre-renderizacao.md)) |
| 2 | Estados de carregamento | `src/components/projects/RepoGrid.tsx`, `src/components/ui/Skeleton.tsx`, `src/components/sections/ContactForm.tsx` |
| 3 | GitHub | `src/services/github.ts`, `src/hooks/useRepos.ts`, `src/components/projects/RepoCard.tsx` |
| 4 | Formulário | `src/schemas/contactSchema.ts`, `src/hooks/useContactForm.ts`, `src/services/messages.ts` |
| 5 | Dashboard | `src/pages/Dashboard.tsx`, `src/components/layout/RequireAuth.tsx`, `src/components/dashboard/`, `supabase/schema.sql` |
| 6 | Tema | `index.html`, `src/app/ThemeProvider.tsx`, `src/components/layout/ThemeToggle.tsx` |
| 7 | Interface | `DESIGN.md`, `src/components/ui/`, `src/components/three/`; conferido em 390 e 1440 px |
| 8 | Performance | [`docs/qualidade/lighthouse.md`](./qualidade/lighthouse.md), `src/app/pages.ts`, `src/hooks/useFacaStage.ts` |
| 9 | Testes | `src/**/*.test.ts(x)`, passo **Testes** do CI |
| 10 | Deploy | `.github/workflows/deploy.yml`, em Cloudflare ([ADR 0004](./adr/0004-entrega-sem-vercel.md)) |
| 11 | Versionamento | `commitlint.config.js`, `.husky/`, proteção da `main`, README e `CLAUDE.md` |
| 12 | Arquitetura | Estrutura descrita no README e no `CLAUDE.md`; ESLint, Prettier, Husky e lint-staged |
| — | Repositório | Público, `.env.example` e README |
