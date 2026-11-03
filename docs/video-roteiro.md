# Roteiro do vídeo (5 minutos)

Máximo de 8 minutos, com rosto e tela visíveis o tempo todo, publicado como **não listado** no YouTube. Este roteiro tem cerca de 700 palavras, o que dá 5 minutos em ritmo de conversa. Fale com as suas palavras: o texto é um guia, não uma leitura.

## Antes de gravar: abas abertas, nesta ordem

1. O site publicado, no topo: https://savioomiodev.com.br
2. `docs/diagramas.md` (pastas e fluxo de dados), no editor ou no GitHub
3. A aba Actions do GitHub, com um deploy verde
4. A pasta `docs/adr`
5. `CLAUDE.md`, `.claude/settings.json`, `.claude/hooks/guard-bash.mjs`, `.claude/skills/`, `.claude/agents/`, `.mcp.json`
6. A lista de PRs fechados no GitHub

Grave fora da rede do laboratório e com o rosto sempre na câmera.

## Abertura (0:00 a 0:30)

**Tela:** o site no topo; role devagar até a caixa dobrar.

> Oi, eu sou o Sávio, desenvolvedor front-end especialista em e-commerce, com foco em VTEX. Este é o meu portfólio, e hoje eu vou mostrar a stack, por que escolhi cada peça e o conjunto de IA que montei para desenvolver.
>
> Como eu trabalho com loja, a identidade nasceu de uma faca de embalagem: a folha dobra em caixa, sacola e envelope conforme a rolagem, com a cor de cada plataforma.

## Parte 1: stack e arquitetura (0:30 a 1:50)

**Tela:** `docs/diagramas.md`, o diagrama de pastas.

> É um site em React 19 com TypeScript e Vite. O estilo é Tailwind, o 3D é Three.js, as rotas são React Router, os dados passam pelo TanStack Query, o backend é Supabase, e o site roda na Cloudflare.
>
> Dividi os componentes por responsabilidade. Em `ui` ficam as peças que só apresentam. `sections` e `pages` montam a tela. A lógica fica nos hooks, e só os services falam com APIs. A regra é: componente visual nunca chama API.

**Tela:** diagrama do fluxo de dados.

> O caminho é sempre o mesmo: a API do GitHub entra pelo service, o hook guarda em cache, e o componente só recebe o dado. O formulário de contato valida, salva no Supabase e manda e-mail. O painel fica atrás de login.

**Tela:** diagrama da branch até o deploy, depois a aba Actions.

> Uma alteração nasce numa branch própria. No commit, o Husky roda lint, formatação e o padrão da mensagem. No pull request, o CI repete tudo e roda os testes. Com o verde, o merge na `main` faz o deploy automático na Cloudflare. A `main` é protegida: nem eu consigo dar push direto.

## Parte 2: justificativas da stack (1:50 a 3:20)

**Tela:** pasta `docs/adr`. Abra os arquivos citados, só mostrando o título.

> Toda escolha passou por uma comparação e virou um ADR, que é um registro de decisão com o que eu aceitei perder.
>
> **Three.js direto.** Comparei com React Three Fiber. O critério foi controlar a rolagem sem renderizar o React a cada quadro. Perdi a escrita declarativa das cenas.
>
> **React Router com TanStack Query.** Comparei com SWR e fetch manual. O critério foi cache entre páginas, porque a API do GitHub só dá 60 chamadas por hora. Aceitei alguns kilobytes a mais.
>
> **Supabase.** Comparei com Firebase e PocketBase. O critério foi login pronto e regra de acesso no banco, sem servidor próprio: o visitante só insere, e só eu leio. Perdi um captcha mais forte contra spam.
>
> **Pré-renderização.** O site era uma SPA, e toda rota devolvia o mesmo HTML. Agora cada página sai pronta no build, o que ajuda o SEO. Aceitei um build mais longo.
>
> **Cloudflare no lugar da Vercel.** O enunciado pedia Vercel, mas já tenho domínio na Cloudflare. O requisito de fundo é deploy automático, e está cumprido. Foi uma decisão consciente, registrada.

## Parte 3: harness de IA (3:20 a 4:40)

**Tela:** `CLAUDE.md`.

> A ferramenta é o Claude Code, com modelos Claude da Anthropic. Comparei com Cursor e Copilot, e o critério foi garantir regra por código, não só por texto, com tudo versionado no repositório. Aceitei que é uma ferramenta paga.
>
> O `CLAUDE.md` traz o fluxo, a arquitetura e a nomenclatura. A IA lê no começo de cada sessão, então eu não repito.

**Tela:** `.claude/settings.json` e `.claude/hooks/guard-bash.mjs`.

> Texto a IA pode esquecer, então as regras críticas viraram hooks. Este bloqueia pular os hooks do Git, mexer na configuração global e publicar no site pessoal. Token e senha continuam comigo.

**Tela:** `.claude/skills/`, depois `.claude/agents/` e `.mcp.json`.

> As skills são receitas: a `tarefa` faz o ciclo do backlog até o deploy conferido, e a `decisao` obriga a pesquisar e escrever o ADR antes de adicionar tecnologia. Os agentes são especialistas: um pesquisa com documentação oficial, outro revisa o diff contra as regras. E o MCP traz a documentação da Cloudflare e o banco para dentro da conversa.

**Tela:** a lista de PRs fechados.

> Na prática, cada tarefa virou uma branch, commits no padrão e um PR integrado só com o CI verde. A IA escreveu boa parte do código, mas as decisões são minhas e eu sei explicar cada uma.

## Fecho (4:40 a 5:00)

**Tela:** volte ao site e role pelo trilho de projetos, parando no card do Platão.

> Esse é o portfólio: um site de loja feito por quem faz loja, com a minha história de robótica, drones e sistemas reais. Obrigado!

## Se travar

- Esqueceu uma frase: siga para a próxima tela, o ADR e o diagrama sustentam o que você disser.
- Pergunta provável: "por que não Vercel?" Resposta: pedido no enunciado, mas o requisito é deploy automático; já tenho domínio na Cloudflare; está no ADR 0004.
