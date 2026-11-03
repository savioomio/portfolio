---
name: tarefa
description: Ciclo completo de uma tarefa do portfolio, do backlog ao deploy conferido (branch, implementação, lint e build, PR, merge depois do CI, conferência no site publicado). Use sempre que o pedido for implementar, corrigir ou documentar algo neste projeto, inclusive pedidos curtos como "arruma o rodapé", "faz a T12" ou "troca o número do WhatsApp".
---

# Ciclo de uma tarefa

Antes de cada comando, diga em uma frase o que ele faz; depois, o resultado.

## 1. Situar o pedido

- Ache a tarefa em `docs/tasks/backlog.md`. Se o pedido não estiver lá, registre uma tarefa nova com o próximo ID livre (`Tnn`), na fase certa, com a branch e o aceite.
- Se o pedido envolve escolher biblioteca, serviço ou ferramenta, faça antes a skill `decisao`.
- Se depende de algo que só o Savio decide ou entrega (identidade visual, conteúdo, credenciais), pergunte e não invente.

## 2. Branch

```bash
git switch main && git pull --prune
git switch -c <prefixo>/<nome-do-backlog>
```

Prefixos: `feature/`, `fix/`, `docs/`, `chore/`, `refactor/`, `test/`, `perf/`.

## 3. Implementar

Siga o `CLAUDE.md` (seção Código): componente visual não chama API; nomes em inglês no código e textos da interface em português.

## 4. Conferir

- `npm run lint` sem erros e `npm run build` passando.
- Mudança de interface: skill `conferir-no-navegador`, no desktop e no celular (390 px).
- Mudança de código grande: peça uma revisão ao agent `revisor` antes do PR.

## 5. Backlog e commit

- Marque a tarefa com `[x]` no backlog, no mesmo PR, com uma nota curta se algo saiu diferente do plano.
- Confira o autor: `git config user.email` precisa ser `saviopessoaafonso@gmail.com`.
- Mensagem em Conventional Commits, em português, com o trailer `Co-Authored-By` pedido pela sessão.

## 6. PR, CI e merge

- Escreva a descrição num arquivo temporário e use `gh pr create --body-file <arquivo>`. Seções: **O que muda** e **Conferido**.
- `gh pr checks <n> --watch` e, com o CI verde, `gh pr merge <n> --merge --delete-branch`. Não espere revisão (regra do `CLAUDE.md`).
- `git switch main && git pull --prune`.

## 7. Deploy

O merge dispara o job **Deploy na Cloudflare**. Acompanhe com `gh run watch` e confira a mudança em <https://savioomiodev.com.br> com a skill `conferir-no-navegador`.

## 8. Relatório

Curto: o que mudou, link do PR e do site, e o que ficou pendente (se ficou).
