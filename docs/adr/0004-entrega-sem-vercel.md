# 0004. Entregar só com a Cloudflare, sem a Vercel

- **Status:** Aceito
- **Data:** 2026-10-21

## Contexto

O enunciado pede o link da Vercel na entrega, e o [ADR 0002](./0002-hospedagem-cloudflare-workers.md) previa a Vercel como segunda hospedagem do mesmo build. O site já está público em `https://savioomiodev.com.br` (Worker `portfolio-webdev`). O requisito 10 pede uma URL pública e publicação automática, sem exigir uma plataforma específica. Segundo o Savio, o professor aceita a URL da Cloudflare no lugar da Vercel.

## Opções consideradas

- **Cloudflare + Vercel:** cumpre a entrega ao pé da letra. Por outro lado, são dois deploys e duas configurações de variáveis para manter, e cada merge tem duas URLs para conferir.
- **Só Cloudflare:** uma hospedagem só, com domínio próprio e já no ar. Por outro lado, foge da letra da entrega.

## Critério

1. Atender o requisito 10, que não depende da Vercel.
2. Menos coisa para manter nos 13 dias até a entrega.

## Decisão

Só Cloudflare. Na entrega, o link da Vercel é substituído por `https://savioomiodev.com.br`.

## O que aceitamos perder

- A entrega não segue a letra do enunciado; depende do aceite do professor.
- O preview automático por PR que a Vercel daria sem configuração. Na Cloudflare isso fica para a T07, se valer o esforço.

## Consequências

- A frase "A Vercel entra como segunda hospedagem" do ADR 0002 deixa de valer; o resto dele continua.
- A T07 passa a ser só o deploy automático na Cloudflare.
- Planejamento e README sem a Vercel.
