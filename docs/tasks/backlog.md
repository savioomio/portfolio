# Backlog

Legenda: `[ ]` a fazer · `[~]` em andamento · `[x]` feito · `[!]` bloqueado (motivo ao lado).
IDs: `T` para tarefa de código ou config, `R` para research (vira ADR). Cada tarefa tem uma branch própria; tarefas da mesma branch saem no mesmo PR.
Ao terminar: marque aqui no mesmo PR e siga a [definição de pronto](../planejamento.md#definição-de-pronto-vale-para-toda-tarefa).

## Fase 0: Fundação (20/10 – 21/10)

- [x] **T00** Criar o repositório `savioomio/portfolio` a partir do portfólio pessoal, com o deploy em `savioomiodev.com.br`. *(feito em 20/10, commits `dc92a80` e `54ceb4f`)*
- [x] **T01** Pasta `docs/` (requisitos, planejamento, backlog, ADRs, runbooks), `CLAUDE.md` inicial, README reescrito, `.env` no `.gitignore`, e descrição, site e tópicos do repositório no GitHub. Branch: `docs/planejamento`.
- [x] **T02** Padrões automáticos: Prettier, Husky, lint-staged (ESLint + Prettier nos arquivos do commit) e commitlint com Conventional Commits; scripts `format` e `lint` no `package.json`. Branch: `chore/qualidade-codigo`. Req 11, 12.
  - Aceite: um commit com mensagem fora do padrão é recusado; um arquivo mal formatado é corrigido no commit.
- [x] **T03** Proteção da `main`: push direto bloqueado, merge só por PR com o CI verde (via `gh api`). Estratégia de branches descrita no README e no `CLAUDE.md`. Branch: `docs/estrategia-branches`. Req 11.
  - Aceite: `git push origin main` é recusado pelo GitHub.
- [x] **T04** Remover o Google Analytics do site pessoal (`G-D95NTX6SGZ`) do `index.html`; se quiser analytics, usar `VITE_GA_ID` e criar o `.env.example`. Branch: `fix/analytics`. *(removido sem substituto; o `VITE_GA_ID` fica para quando houver um ID próprio do projeto)*
  - Aceite: nenhuma requisição para `google-analytics.com` com o ID pessoal.
- [x] **T05** Corrigir o e-mail do rodapé: `saviopessaafonso` → `saviopessoaafonso`. Branch: `fix/email-rodape`. *(corrigido também na página `/links`)*
- [x] **T30** Corrigir o WhatsApp do contato e da página `/links`: `77 99159-9090` → `77 99196-6527`. Branch: `fix/whatsapp`.
- [x] **T06** Vídeo da aranha robô no `Experience.tsx`: trocar a URL absoluta por `/videos/aranha-robo.mp4`, usar `poster="/videos/aranha-robo-poster.webp"` e `preload="none"`, e dar play só quando o vídeo aparecer na tela (IntersectionObserver). Branch: `fix/video-aranha`. Req 8.
  - Arquivos em `public/videos/`: `aranha-robo.mp4` (1,36 MB; 640×360, 30 fps, H.264, sem áudio, `faststart`) e `aranha-robo-poster.webp` (35 KB). Origem: https://www.youtube.com/watch?v=ujD9UP9rh4U (canal próprio, 26 s), comprimido com o `ffmpeg-static` do projeto: `-an -vf "scale=640:-2,fps=30" -c:v libx264 -preset slow -crf 28 -movflags +faststart`.
  - Aceite: o vídeo roda em loop no desktop e no celular, e não aparece na aba Network antes de rolar até a seção.
- [x] **T07** Deploy automático a cada push na `main`, na Cloudflare (Workers Builds ligado ao repo, ou GitHub Actions com `CLOUDFLARE_API_TOKEN`). Sem Vercel ([ADR 0004](../adr/0004-entrega-sem-vercel.md)). Branch: `chore/deploy-automatico`. Req 10. Runbook: [`deploy-cloudflare.md`](../runbooks/deploy-cloudflare.md).
  - Aceite: um merge na `main` atualiza `savioomiodev.com.br` sem comando manual.
- [x] **R06** Research do harness de IA: ferramenta e modelo, o que vai em `CLAUDE.md`, skills, agents, hooks e MCPs; comparar com Cursor e Copilot. Vira ADR. Req 11, 12, vídeo parte 3.
- [x] **T09** Montar o harness definido na R06: `CLAUDE.md` completo (arquitetura, nomenclatura, commits, branches), `.claude/settings.json`, skills e agents versionados. Branch: `chore/harness-ia`. *(o aceite é conferido na primeira tarefa de código numa sessão nova, a T10)*
  - Aceite: pedir uma feature para a IA gera branch, commits e estrutura de pastas no padrão sem precisar lembrar as regras no prompt.

## Fase 1: Rotas e GitHub (22/10 – 24/10)

- [x] **R07** Research de identidade visual: o que representa a área de e-commerce. Decidida: Faca Dourada ([ADR 0008](../adr/0008-identidade-faca-dourada.md)). Req 7, 8.
- [x] **T29** Conteúdo de 2024 em diante: experiências e projetos pessoais. Branch: `feature/identidade-faca-dourada`. *Saiu junto com a T34: o lorem ipsum foi removido e o conteúdo real está em `src/content/`.*
- [x] **T31** Harness no Mac: a skill `conferir-no-navegador` e o `CLAUDE.md` citam só o MCP `chrome-devtools`, mas o Mac usa o Comet com `dev-browser`. Registrar a skill `impeccable`. Branch: `chore/harness-mac`.
- [ ] **T32** *(fica para depois da entrega)* Estudo sobre o Savio para levantar projetos e conteúdo: percorrer as pastas de trabalho, separar o que pode ser público e transformar em fichas de projeto. Atenção a dados de clientes e documentos internos da Wicomm. Branch: `docs/estudo-conteudo`.
- [x] **T33** História no fim da Home: lista de projetos e trilho horizontal com uma seção por projeto (aranha, drones, Callidus Link, mão robótica, JSOM, GasMaster, Synesthesia e Platão), cada uma com a cor do projeto, vídeos, fotos e telas. Branch: `feature/identidade-faca-dourada`. *Sem rostos de colegas nas fotos e com a mão 3D modelada em código.*
- [x] **T34** Levar a Faca Dourada ao site: tokens, tema base, fontes próprias, motor 3D em Three.js, novo objeto do WordPress, seções da Home, `DESIGN.md` e remoção do visual antigo, do R3F, do Framer Motion e do Helmet. Branch: `feature/identidade-faca-dourada`. Req 7.
- [x] **R01** Research de rotas e dados ([ADR 0009](../adr/0009-rotas-e-dados.md)): React Router vs TanStack Router; TanStack Query vs SWR vs `fetch` manual. Critérios: cache entre páginas, estados de loading/erro/vazio, tamanho do bundle, curva de aprendizado. Vira ADR.
- [x] **T10** Reorganizar as pastas conforme a [arquitetura alvo](../planejamento.md#arquitetura-alvo). Branch: `feature/identidade-faca-dourada`. Req 12. *Feita na T34: o código antigo saiu inteiro, então não valia mover antes. Entraram `components/layout/` e `content/`.*
- [x] **T11** Componentes base em `components/ui/`: `Button`, `Card`, `Skeleton`, `Spinner`, `BrandLogo` e `StatusMessage`. Branch: `feature/identidade-faca-dourada`. Req 7. *O `Input` entra com o formulário (T16).*
- [x] **T12** `services/github.ts` e hooks `useRepos` / `useRepo` com cache; tratar o limite da API (403/429) com mensagem própria. Branch: `feature/github-api`. Req 3, 8.
  - Aceite: navegar Home → projeto → Home não gera uma segunda requisição ao GitHub (conferir na aba Network).
- [x] **T13** Cards de projeto vindos da API: descrição, linguagem e data da última atualização; skeleton ao carregar, estado de erro e de lista vazia. Branch: `feature/github-api`. Req 2, 3.
- [x] **T14** Rotas: `/projetos/:slug` (detalhe do repositório), página 404 para rota inexistente e página de erro de API. Branch: `feature/rotas`. Req 1.
  - Aceite: abrir `/projetos/<repo>` direto e dar F5 mostra o projeto; `/qualquer-coisa` mostra o 404.

## Fase 2: Contato (25/10 – 27/10)

- [x] **R02** Research de backend e e-mail ([ADR 0010](../adr/0010-backend-supabase-e-formspree.md)): Supabase vs Firebase vs Appwrite vs PocketBase; EmailJS vs Formspree vs Resend. Critérios: auth pronto, regras de acesso no banco, plano gratuito, funcionar com front estático na Cloudflare e na Vercel. Vira ADR.
- [x] **R03** Research de formulário ([ADR 0011](../adr/0011-formulario-rhf-zod.md)): React Hook Form + Zod vs Formik + Yup vs validação manual. Vira ADR.
- [x] **T15** Projeto no backend escolhido: tabelas `messages` (nome, e-mail, mensagem, `answered`, `created_at`) e `featured_projects`; regras de acesso (visitante só insere mensagem, só o dono lê); variáveis no `.env.example`. Branch: `feature/backend`. Req 4, 5.
- [x] **T16** Formulário de contato com validação por campo e mensagens específicas ("e-mail inválido", "mensagem com no mínimo 20 caracteres"). Branch: `feature/formulario-contato`. Req 4.
- [x] **T17** Envio: salva no banco e manda e-mail ao dono; botão bloqueado com spinner durante o envio; feedback de sucesso ou erro. Branch: `feature/formulario-contato`. Req 2, 4.
  - Aceite: clicar duas vezes rápido em "Enviar" gera uma mensagem só.

## Fase 3: Dashboard e tema (28/10 – 29/10)

- [x] **T18** Login do dono e rota protegida: quem não está logado e acessa `/dashboard` vai para `/login`. Dashboard num chunk separado (`React.lazy`). Branch: `feature/dashboard`. Req 5, 8.
- [x] **T19** Dashboard: lista de mensagens com "marcar como respondida". Branch: `feature/dashboard`. Req 5.
- [x] **T20** Dashboard: seleção dos projetos em destaque, lida pela Home. Branch: `feature/dashboard`. Req 5.
- [x] **R04** Research de tema ([ADR 0012](../adr/0012-tema-sem-flash.md)): `next-themes` (já instalado) vs Context + `localStorage` vs Zustand. Critério principal: sem piscar o tema errado ao abrir a página. Vira ADR.
- [x] **T21** Tema claro/escuro com alternância no header, persistido entre visitas, sem flash ao carregar. Branch: `feature/tema`. Req 6.

## Fase 4: Qualidade (30/10 – 31/10)

- [x] **T35** SEO: pré-renderização de cada rota, 404 real, JSON-LD, Open Graph, sitemap gerado no build, `robots.txt` e `llms.txt` ([ADR 0014](../adr/0014-seo-pre-renderizacao.md)). Branch: `feature/seo`. Aceite: Lighthouse SEO 100 no celular; `/qualquer-coisa` responde 404.
- [x] **R05** Research de testes ([ADR 0013](../adr/0013-testes-vitest.md)): Vitest + Testing Library vs Playwright. Vira ADR.
- [x] **T22** Testes da validação do formulário e do bloqueio do dashboard sem login; o CI roda os testes e bloqueia o merge se falharem. Branch: `test/formulario-e-dashboard`. Req 9.
- [x] **T23** Performance: Lighthouse mobile ≥ 80 (print salvo em `docs/`); imagens com `srcset`/`sizes` e AVIF/WebP; `.jfif` convertidos; cena 3D fora do bundle inicial; CLS próximo de 0; análise do bundle com `rollup-plugin-visualizer`. Branch: `perf/lighthouse`. Req 8.
- [x] **T24** Revisão responsiva em celular (390 px) e desktop (1440 px), com prints de cada página. Branch: `fix/responsivo`. Req 7.
- [x] **T54** Título da história na Home mais profissional: "Minha trajetória em tecnologia, da robótica ao software", no lugar do tom informal anterior. Branch: `fix/titulo-historia`. *Feita na branch designada da sessão.*
- [x] **T53** Painel do Platão com a janelinha animada em 3D, portada do site do app, e ajustes de altura em telas baixas. Branch: `fix/texto-experiencia`.
- [x] **T52** GasMaster: aba com o assistente de IA (MCP) e texto sobre a conexão do dono do posto. Branch: `fix/texto-experiencia`.
- [x] **T51** Experiência em ordem cronológica, com os cargos da Wicomm e o Wackathon como conquista do período. Sem o termo dev lead. Branch: `fix/experiencia-cronologica`.
- [x] **T50** Cenas 3D resilientes: contexto devolvido ao sair, nova tentativa em falha de carga e recriação após perda de contexto. Branch: `fix/cenas-3d-resilientes`.
- [x] **T49** Painel da mão no celular: toque nas letras e no link, 26 letras visíveis e mão menor. Branch: `fix/mao-celular`.
- [x] **T48** Página de links com a caixa e a sacola, botões de vidro e ícone oficial do WhatsApp. Branch: `feature/links-marcas`.
- [x] **T47** Trilho volta à rolagem clássica também no celular e aceita gesto lateral enquanto está na tela. Branch: `refactor/trilho-rolagem`.
- [x] **T46** Celular: telas do JSOM e GasMaster sem corte, vídeo da mão maior e Synesthesia com a tela no lugar das abas. Branch: `fix/midias-celular`.
- [x] **T45** Contagens de lojas editáveis no painel, publicadas no build ([ADR 0015](../adr/0015-contagens-no-painel.md)). Branch: `feature/contagens-no-painel`.
- [x] **T44** Logos do JSOM, GasMaster, Synesthesia e Platão no painel e na página do projeto, e WhatsApp nos contatos. Branch: `feature/logos-projetos`.
- [x] **T43** Corrigir a história dos Drones Guanambi: vitória na DronesIFSC 2023, inscrição na IMAV 2024 e papel principal em mecânica e modelagem 3D. Branch: `fix/historia-drones`.
- [x] **T42** Logo oficial dos Drones Guanambi e novas fotos nas galerias dos drones, da mão e do Callidus. Branch: `feature/marca-drones`.
- [x] **T41** Transição animada entre páginas com View Transitions, largura máxima de 1440 px nas páginas de projeto, logo e nova seleção de fotos dos Drones Guanambi. Branch: `feature/transicao-paginas`.
- [x] **T40** Galerias dos projetos com o melhor material das pastas, sem rostos de colegas nem dados reais. Branch: `feature/galerias`.
- [x] **T39** Polimento: caixa fechada sem frestas, troca entre plataformas sem sobreposição, trilho com deslize no celular, marca no cabeçalho, conteúdo alinhado ao cabeçalho, imagem de abertura igual à peça 3D e vídeo com botão válido. Branch: `fix/polimento-faca`.
- [x] **T38** Versões em alta das mídias com original disponível: o navegador escolhe pela densidade da tela e o visor sempre abre em alta. Branch: `feature/midias-hd`.
- [x] **T37** Clicar num vídeo ou foto real amplia na tela, e toda mídia real dos painéis aparece na página do projeto, em mosaico. Branch: `feature/zoom-midias`.
- [x] **T36** Synesthesia só com a gravação da tela, editada, e nomes novos nas mídias trocadas, para o cache não servir o vídeo antigo; hover da letra ativa da mão legível. Branch: `fix/video-synesthesia`.

## Fase 5: Entrega (01/11 – 03/11)

- [x] **T25** README final: sobre o projeto, tecnologias, como rodar, variáveis de ambiente, padrões de commits, branches, pastas e nomenclatura, e links das URLs publicadas. Branch: `docs/readme`. Repositório, req 11, 12.
- [x] **T26** Diagramas para o vídeo: pastas, fluxo de dados e branch até deploy. Branch: `docs/diagramas`.
- [x] **T27** Roteiro do vídeo em `docs/video-roteiro.md`: três partes, até 8 minutos. Branch: `docs/roteiro-video`.
- [ ] **T28** *(com o Savio)* Gravar (rosto e tela), subir no YouTube como não listado e entregar os três links no Teams até 03/11.
