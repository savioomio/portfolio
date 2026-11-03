---
name: conferir-no-navegador
description: Confere uma mudança no navegador do Savio (site local ou publicado), pelo dev-browser no Mac e pelo MCP chrome-devtools no lab — print, erros do console, requisições com falha e versão de celular em 390 px — e, quando a tarefa é de performance, roda o Lighthouse mobile. Use depois de qualquer mudança de interface e depois de cada deploy.
---

# Conferir no navegador

## Pré-requisitos

- **No Mac:** o navegador é o Comet, sem Google Chrome. Use o CLI `dev-browser`, conectado ao WebSocket lido de `~/Library/Application Support/Comet/DevToolsActivePort` (primeira linha é a porta, segunda é o caminho), sempre com `browser.getPage("portfolio")`. O processo do `dev-browser` guarda a conexão: o Allow aparece uma vez só e tudo fica na mesma aba.
- **No PC do lab:** as ferramentas `mcp__chrome-devtools__*` precisam estar disponíveis. Se não estiverem, siga o passo 4 de `docs/runbooks/setup-pc-do-lab.md`.
- Site local: `npm run dev` em segundo plano, em <http://localhost:5173>. Site publicado: <https://savioomiodev.com.br>.

## Passos

Os nomes abaixo são do MCP. No `dev-browser`, use a API do Playwright: `page.goto`, `page.screenshot`, `page.on("console")`, `page.on("response")` e `page.setViewportSize`. Antes de tirar um print, confira `scrollY`: print fora da posição pedida não vale.

1. Abra uma aba nova com a página da mudança (`new_page`). Não feche nem mexa nas outras abas do Savio.
2. Confira o conteúdo pela árvore de acessibilidade (`take_snapshot`) e tire um print (`take_screenshot`) quando o visual importar.
3. Console: `list_console_messages` com `error` e `warn`. Erro novo é problema; aviso antigo, só anote.
4. Rede: `list_network_requests` e procure respostas 4xx e 5xx ou requisições que não deveriam existir.
5. Celular: `emulate` (ou `resize_page`) para 390 × 844 e repita os passos 2 e 3.
6. Performance (tarefas de req 8): `lighthouse_audit` no modo mobile; a meta é nota ≥ 80. No Mac, rode `CHROME_PATH=/Applications/Comet.app/Contents/MacOS/Comet npx -y lighthouse@12 <url> --only-categories=performance --form-factor=mobile --chrome-flags="--headless=new"`, que abre um processo separado.

## Limites

- Não digite senhas, não crie tokens e não aceite telas de permissão ou de pagamento: peça ao Savio.
- Com a depuração remota ligada, o MCP enxerga tudo o que está logado no Chrome. Use só as abas do projeto.

## Relatório

Uma linha por item conferido (ok ou problema, com o que apareceu), e o print quando houver mudança visual.
