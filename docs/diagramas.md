# Diagramas

Usados na parte 1 do vídeo. O GitHub desenha os blocos Mermaid direto nesta página.

## Pastas

```mermaid
flowchart TD
  main["main.tsx<br/>navegador"] --> app
  entry["entry-server.tsx<br/>build"] --> app
  app["app/<br/>rotas e providers"] --> pages["pages/<br/>uma por rota"]
  pages --> sections["components/sections<br/>blocos da Home"]
  pages --> projects["components/projects<br/>e dashboard"]
  sections --> ui["components/ui<br/>só apresentação"]
  projects --> ui
  sections --> three["components/three<br/>3D sob demanda"]
  sections --> hooks["hooks/"]
  projects --> hooks
  hooks --> services["services/<br/>só acesso a APIs"]
  hooks --> schemas["schemas/<br/>validação"]
  sections --> content["content/<br/>textos fixos"]
```

Critério de divisão: `ui` não sabe de regra de negócio, `sections` e `pages` montam a tela, `hooks` guardam a lógica e `services` são os únicos que falam com APIs.

## Fluxo de dados

```mermaid
flowchart LR
  gh["API do GitHub"] --> sgh["services/github"]
  sgh --> repos["useRepos<br/>TanStack Query"]
  cache[("Cache no<br/>localStorage")] <--> repos
  repos --> grid["RepoGrid"]
  grid --> card["ui/Card"]

  db[("Supabase<br/>Postgres + RLS")] --> sfeat["services/featured"]
  sfeat --> feat["useFeaturedRepos"]
  repos --> feat
  feat --> home["Seção do GitHub<br/>na Home"]

  form["ContactForm"] --> hookform["useContactForm"]
  hookform --> smsg["services/messages"]
  smsg --> db
  smsg --> mail["Formspree<br/>e-mail ao dono"]

  dash["Dashboard"] --> auth["useAuth"]
  auth --> supa["Supabase Auth"]
  dash --> inbox["useMessages"]
  inbox --> smsg
```

## Da branch ao deploy

```mermaid
flowchart LR
  a["Branch<br/>feature/x"] --> b["Commit"]
  b --> c{"Husky<br/>ESLint, Prettier<br/>commitlint"}
  c -->|recusa| b
  c --> d["Push e PR"]
  d --> e{"CI: commits, lint,<br/>formatação, testes, build"}
  e -->|falha| b
  e --> f["Merge na main"]
  f --> g["Build com<br/>pré-renderização"]
  g --> h["Deploy na Cloudflare"]
  h --> i["savioomiodev.com.br"]
```

## Como uma página chega ao navegador

```mermaid
flowchart TD
  r["Pedido de /projetos/platao"] --> w{"Existe arquivo<br/>em dist?"}
  w -->|sim| html["HTML pronto, com título,<br/>conteúdo e JSON-LD"]
  html --> hyd["React assume a página<br/>com hydrateRoot"]
  w -->|não| nf["404.html, status 404"]
  nf --> rend["React monta a tela no navegador:<br/>repositório novo ou página de erro"]
```
