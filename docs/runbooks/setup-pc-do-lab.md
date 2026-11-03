# Runbook: preparar o PC do laboratório

Os PCs da FIAP são compartilhados (usuário Windows `labsfiap`), não têm identidade do Git configurada e **apagam tudo ao desligar**: o clone, o `node_modules`, os logins do `gh` e do Wrangler, os MCPs e a memória do Claude Code. Por isso este runbook roda **no começo de toda sessão no lab**. No Mac (máquina principal) nada disso se perde e o runbook não se aplica.

Com o Claude Code, ele mesmo roda os passos e explica cada comando; você só faz os logins no navegador.

## 1. Clonar e configurar o autor dos commits

```bash
git clone https://github.com/savioomio/portfolio.git
cd portfolio
git config user.name "savioomio"
git config user.email "saviopessoaafonso@gmail.com"
```

Configure **só no repositório** (sem `--global`): no PC compartilhado, uma config global assinaria os commits de outras pessoas com o seu nome. Sem este passo, os commits saem como "Laboratório FIAP".

Confira antes do primeiro commit:

```bash
git config user.email   # tem que mostrar saviopessoaafonso@gmail.com
```

## 2. Dependências e GitHub CLI

```bash
npm install
gh auth status          # se não estiver logado: gh auth login
```

## 3. Login no Cloudflare

O navegador padrão do lab quebra o OAuth (erro `request_forbidden: No CSRF value`). Gere o link sem abrir o navegador e abra no Chrome:

```bash
npx wrangler login --browser=false
```

Copie a URL impressa e, no PowerShell:

```powershell
Start-Process chrome '<URL copiada>'
```

Entre com `saviopessoaafonso@gmail.com` e clique em **Allow** logo em seguida: o Wrangler espera só alguns minutos. O terminal confirma o login. Confira com `npx wrangler whoami`.

- **`Timed out waiting for authorization code`:** o Allow demorou demais. Rode o login de novo; o link antigo não vale mais.
- **`Received query string parameter doesn't match the one sent!`:** o Allow foi clicado na aba de um link antigo. Feche todas as abas da Cloudflare e rode o login de novo, usando só a aba nova.

## 4. Controle do Chrome pelo Claude Code

Deixa o Claude abrir o site, tirar print, ler o console e rodar o Lighthouse no seu Chrome. Usa o [Chrome DevTools MCP](https://github.com/ChromeDevTools/chrome-devtools-mcp) no modo `--autoConnect`, que exige Chrome 144 ou mais novo (o do lab é o 155). O [dev-browser](https://github.com/sawyerhood/dev-browser) não serve: não roda no Windows.

1. No Chrome, abra `chrome://inspect/#remote-debugging` e ligue a depuração remota. A página passa a mostrar `Server running at: 127.0.0.1:9222`.
2. Registre o MCP, no Git Bash:

   ```bash
   MSYS_NO_PATHCONV=1 claude mcp add chrome-devtools --scope user -- cmd /c npx -y chrome-devtools-mcp@latest --autoConnect
   ```

   - `--scope user`, e não `local`: o escopo local grava o projeto como `C:/Users/...` e o VS Code abre a pasta como `c:\Users\...`, então o MCP não carrega.
   - `MSYS_NO_PATHCONV=1`: sem ele, o Git Bash troca o `/c` do `cmd /c` por `C:\`.

3. Reinicie a conversa do Claude Code (ou `Developer: Reload Window` no VS Code). Um MCP novo só aparece numa sessão nova.
4. Na primeira conexão, o Chrome pede permissão: clique em **Allow**.

Com isso ligado, o Claude enxerga tudo o que está aberto e logado nesse Chrome.

## 5. Ao sair do laboratório

O PC apaga tudo ao desligar, inclusive commits que não foram enviados. Antes de sair, confira que nada ficou só na máquina:

```bash
git status              # sem alterações pendentes
git push                # em cada branch com trabalho novo
```

Até o PC desligar, o login do Wrangler (salvo em `%APPDATA%\xdg.config\.wrangler`) deixa qualquer pessoa publicar na sua conta, e a depuração remota deixa qualquer programa controlar o seu Chrome. Saia sempre:

```bash
npx wrangler logout
gh auth logout          # se não quiser deixar o GitHub logado
```

E desligue a depuração remota em `chrome://inspect/#remote-debugging`.
