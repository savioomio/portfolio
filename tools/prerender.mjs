// Gera o HTML pronto de cada rota, o 404.html e o sitemap depois do build do Vite.
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const dist = path.join(root, "dist");
const ssrBundle = path.join(root, "dist-ssr", "entry-server.js");

const { cleanRepos, renderPage, renderSeoTags, seoForNotFound, site, staticPaths, stores } =
  await import(pathToFileURL(ssrBundle).href);

async function fetchRepos() {
  const headers = { Accept: "application/vnd.github+json" };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  try {
    const url = `https://api.github.com/users/${site.githubUser}/repos?per_page=100&sort=pushed&type=owner`;
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`GitHub respondeu ${response.status}`);
    return cleanRepos(await response.json());
  } catch (error) {
    // Sem o GitHub o deploy continua: só as páginas de repositório ficam para o navegador
    console.warn(`Repositórios fora do build: ${error.message}`);
    return [];
  }
}

// O CSS vai dentro do HTML: a primeira pintura não espera mais um arquivo
const builtHtml = await readFile(path.join(dist, "index.html"), "utf8");
const cssHref = builtHtml.match(/<link rel="stylesheet"[^>]*href="([^"]+)"[^>]*>/);
const css = await readFile(path.join(dist, cssHref[1]), "utf8");
const template = builtHtml.replace(cssHref[0], () => `<style>${css}</style>`);

function fillHead(seo) {
  return template.replace(
    /<!--head:start-->[\s\S]*<!--head:end-->/,
    () => renderSeoTags(seo), // Função: um `$` no texto não vira padrão de substituição
  );
}

async function writePage(route, content) {
  const file =
    route === "/" ? path.join(dist, "index.html") : path.join(dist, route.slice(1), "index.html");
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, content);
}

const repos = await fetchRepos();
const routes = [...staticPaths, ...repos.map((repo) => `/projetos/${repo.name}`)];
const sitemap = [];

for (const route of routes) {
  const { html, seo, state } = renderPage(route, repos);
  if (!seo) throw new Error(`A rota ${route} não declarou SEO`);

  const stateScript = state.queries.length
    ? `<script id="query-state" type="application/json">${JSON.stringify(state).replace(/</g, "\\u003c")}</script>`
    : "";
  const page = fillHead(seo)
    .replace("<!--app-html-->", () => html)
    .replace("</body>", () => `${stateScript}</body>`);
  await writePage(route, page);

  if (!seo.noindex) {
    const repo = repos.find((item) => route === `/projetos/${item.name}`);
    // Imagens da página no sitemap: é por onde o Google Imagens descobre as fotos
    const images = [
      ...new Set([...html.matchAll(/<img[^>]*\ssrc="(\/media\/[^"]+)"/g)].map((m) => m[1])),
    ];
    // Vídeos declarados no SEO da página viram entradas de vídeo no sitemap
    const videos = (seo.jsonLd ?? []).filter((item) => item["@type"] === "VideoObject");
    sitemap.push({
      loc: `${site.url}${route === "/" ? "/" : route}`,
      lastmod: repo?.pushed_at,
      images,
      videos,
    });
  }
}

// O 404 vai sem conteúdo: o React decide no navegador, inclusive para repositório criado depois do build
await writeFile(
  path.join(dist, "404.html"),
  fillHead(seoForNotFound()).replace("<!--app-html-->", ""),
);

const xml = (text) =>
  String(text).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const urls = sitemap
  .map(({ loc, lastmod, images = [], videos = [] }) => {
    const date = lastmod ? `<lastmod>${lastmod.slice(0, 10)}</lastmod>` : "";
    const pics = images
      .map((src) => `<image:image><image:loc>${site.url}${src}</image:loc></image:image>`)
      .join("");
    const clips = videos
      .map(
        (video) =>
          `<video:video><video:thumbnail_loc>${video.thumbnailUrl}</video:thumbnail_loc>` +
          `<video:title>${xml(video.name)}</video:title>` +
          `<video:description>${xml(video.description)}</video:description>` +
          `<video:content_loc>${video.contentUrl}</video:content_loc>` +
          `<video:publication_date>${video.uploadDate}</video:publication_date></video:video>`,
      )
      .join("");
    return `  <url><loc>${loc}</loc>${date}${pics}${clips}</url>`;
  })
  .join("\n");
await writeFile(
  path.join(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">\n${urls}\n</urlset>\n`,
);

await rm(path.join(root, "dist-ssr"), { recursive: true, force: true });
console.log(`Pré-renderização: ${routes.length} páginas, ${sitemap.length} no sitemap.`);

// O llms.txt também mostra as contagens do painel
const llmsFile = path.join(dist, "llms.txt");
const llms = await readFile(llmsFile, "utf8");
await writeFile(
  llmsFile,
  llms
    .replaceAll("{vtex}", stores.vtex)
    .replaceAll("{wake}", stores.wake)
    .replaceAll("{wordpress}", stores.wordpress),
);
