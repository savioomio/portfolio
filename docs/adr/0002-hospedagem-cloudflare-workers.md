# 0002. Hospedar em Cloudflare Workers, num Worker separado do site pessoal

- **Status:** Aceito; a parte da Vercel foi substituída pelo [ADR 0004](./0004-entrega-sem-vercel.md)
- **Data:** 2026-10-20

## Contexto

O site precisa de uma URL pública e o enunciado pede o link da Vercel na entrega. O domínio `savioomiodev.com.br` já está na Cloudflare, servindo o site pessoal pelo Worker `savioomiodev`. O site é uma SPA: qualquer rota (`/projetos/x`) precisa devolver o `index.html` para o F5 funcionar (requisito 1).

## Opções consideradas

- **Só Vercel:** atende a entrega com o mínimo de esforço e tem deploy automático nativo por push. Por outro lado, um domínio próprio exigiria apontar o DNS da Cloudflare para a Vercel.
- **Cloudflare Workers (Static Assets) num Worker novo:** o domínio já está lá, o subdomínio sai na hora e o fallback de SPA é uma linha de config (`not_found_handling`). Por outro lado, sozinho não atende o link da Vercel.
- **Reaproveitar o Worker `savioomiodev`:** nada a configurar. Por outro lado, sobrescreveria o site pessoal.

## Critério

1. Nunca afetar o site pessoal em produção.
2. URL própria, apresentável num portfólio.
3. Fallback de SPA sem servidor próprio.

## Decisão

Worker novo `portfolio-webdev`, servindo o `dist/` como Static Assets, no domínio `savioomiodev.com.br`. Configuração em `wrangler.jsonc`, deploy com `npm run deploy`. A Vercel entra como segunda hospedagem do mesmo build (T07).

## O que aceitamos perder

- Duas hospedagens para manter, com dois deploys a conferir por merge.
- Enquanto a T07 não estiver pronta, o deploy na Cloudflare é manual (o requisito 10 exige automático).
- O subdomínio fica em `savioomiodev.com.br`: a conta não tem o domínio `savioomio.com.br`.

## Consequências

- O app precisa continuar sendo um build estático, sem nada específico de uma das plataformas. Isso pesa a favor de um backend gerenciado (R02).
- Runbook do deploy: [`runbooks/deploy-cloudflare.md`](../runbooks/deploy-cloudflare.md).
