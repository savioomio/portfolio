# Runbook: deploy na Cloudflare

Publica o build em `https://savioomiodev.com.br` (Worker `portfolio-webdev`). Decisões em [ADR 0002](../adr/0002-hospedagem-cloudflare-workers.md) (hospedagem) e [ADR 0005](../adr/0005-deploy-automatico-github-actions.md) (deploy automático).

> **Atenção:** o Worker `savioomiodev` é o **site pessoal**. Antes de qualquer deploy, confira que `wrangler.jsonc` tem `"name": "portfolio-webdev"`.

## Deploy automático (o normal)

Cada merge na `main` dispara o job **Deploy na Cloudflare** do CI ([`.github/workflows/deploy.yml`](../../.github/workflows/deploy.yml)): ele só roda depois do `Build de validacao` passar e executa o mesmo `npm run deploy` do deploy manual. PR nunca publica. Acompanhe em **Actions** no GitHub ou com:

```bash
gh run watch                       # acompanha a execução mais recente
npx wrangler deployments list      # a versão nova aparece com a hora do merge
```

### Token da Cloudflare (criar ou trocar)

O job precisa do segredo `CLOUDFLARE_API_TOKEN` no GitHub. O ID da conta já está no `wrangler.jsonc`. Se o token expirar ou vazar:

1. Em <https://dash.cloudflare.com/profile/api-tokens>: **Create Token** → modelo **Edit Cloudflare Workers** → **Use template**.
2. **Account Resources:** Include → `Saviopessoaafonso@gmail.com's Account`. **Zone Resources:** Include → Specific zone → `savioomiodev.com.br`.
3. **Continue to summary** → **Create Token** → copie o token (ele só aparece uma vez).
4. Em <https://github.com/savioomio/portfolio/settings/secrets/actions>: **New repository secret**, nome `CLOUDFLARE_API_TOKEN`, cole o token e salve. Pelo terminal: `gh secret set CLOUDFLARE_API_TOKEN` e cole quando pedir.
5. Rode o job de novo em **Actions** (ou faça um merge) e confira que ele passou.

Se o job falhar com erro de permissão no domínio, edite o token e acrescente **Zone → DNS → Edit** para `savioomiodev.com.br`.

## Deploy manual (emergência)

Use só se o CI estiver fora do ar ou para publicar uma correção urgente que já está na `main`.

### Pré-requisitos

- Dependências instaladas: `npm install`.
- Wrangler logado na conta `saviopessoaafonso@gmail.com`. Confira com `npx wrangler whoami`; se não estiver logado, siga o [setup do PC do lab](./setup-pc-do-lab.md#3-login-no-cloudflare).
- Estar na `main` atualizada: `git switch main && git pull`.

### Passos

```bash
npm run deploy          # = npm run build && wrangler deploy
```

A saída termina com as URLs e o `Current Version ID`. Anote o ID se for precisar de rollback.

## Verificação

```bash
for p in / /links /projetos/teste /rota-que-nao-existe; do
  printf "%s -> " "$p"; curl -s -o /dev/null -w "%{http_code}\n" "https://savioomiodev.com.br$p"
done
```

Todas devem responder `200`: o Worker devolve o `index.html` e o React Router decide a página (inclusive o 404). Depois, abra o site no navegador e confira a mudança.

## Rollback

```bash
npx wrangler deployments list     # lista as versões publicadas
npx wrangler rollback <version-id> # volta para uma versão anterior
```

## Configuração envolvida

| Arquivo | Papel |
| --- | --- |
| `wrangler.jsonc` | Nome do Worker, conta (`account_id`), pasta `dist/`, fallback de SPA (`not_found_handling`) e domínio (`routes`) |
| `public/_headers` | Cache: `assets/` e `fonts/` imutáveis; imagens por 7 dias; HTML sempre revalida |
| `package.json` | Script `deploy` |
| `.github/workflows/deploy.yml` | Job **Deploy na Cloudflare**, que roda `npm run deploy` a cada push na `main` |
| Segredo `CLOUDFLARE_API_TOKEN` (GitHub) | Token do modelo "Edit Cloudflare Workers", usado só pelo job de deploy |

## Problemas conhecidos

- **`wrangler login` falha com `request_forbidden` / CSRF:** o login aconteceu no meio do fluxo do OAuth, no navegador padrão. Use o fluxo com o Chrome do [setup](./setup-pc-do-lab.md#3-login-no-cloudflare).
- **URL `*.workers.dev` com erro de SSL logo após criar o Worker:** o certificado demora alguns minutos para ser emitido. O domínio próprio não é afetado.
