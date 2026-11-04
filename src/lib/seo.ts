import type { Project } from "@/content/projects";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import type { GithubRepo } from "@/types/github";

export interface SeoData {
  title: string;
  description: string;
  /** Caminho sem o domínio. Sem ele, a página não tem canônica. */
  path?: string;
  image?: string;
  type?: "website" | "article" | "profile";
  noindex?: boolean;
  jsonLd?: object[];
}

const DEFAULT_IMAGE = "/og-image.png";
const absolute = (path: string) => `${site.url}${path === "/" ? "/" : path}`;

const person = {
  "@type": "Person",
  "@id": `${site.url}/#pessoa`,
  name: site.fullName,
  alternateName: ["Sávio Pessôa", "Savio Pessoa", "savioomio"],
  url: `${site.url}/`,
  // Foto de rosto: é o que a busca pelo nome mostra ao lado do resultado
  image: `${site.url}/media/savio-perfil-2.webp`,
  jobTitle: "Desenvolvedor Front-End especialista em e-commerce",
  worksFor: { "@type": "Organization", name: "Wicomm" },
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "FIAP" },
    { "@type": "EducationalOrganization", name: "IF Baiano" },
  ],
  knowsAbout: ["VTEX", "VTEX FastStore", "VTEX Store Framework", "Wake Commerce", "React", "SEO"],
  sameAs: [site.github, site.linkedin, site.instagram],
};

function breadcrumbs(items: { name: string; path?: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(item.path ? { item: absolute(item.path) } : {}),
    })),
  };
}

export function seoForHome(): SeoData {
  return {
    title: `${site.fullName} | Especialista E-commerce VTEX e Wake`,
    description:
      "Desenvolvedor front-end especialista em e-commerce, com foco em VTEX e Wake. Veja lojas, experiência e projetos.",
    path: "/",
    type: "profile",
    jsonLd: [
      { "@type": "WebSite", name: site.name, url: `${site.url}/`, inLanguage: "pt-BR" },
      { "@type": "ProfilePage", mainEntity: person },
    ],
  };
}

export function seoForProjects(): SeoData {
  return {
    title: `Projetos | ${site.name}`,
    description:
      "Projetos de Sávio Pessôa além das lojas: robótica, drones, sistemas reais, apps e todos os repositórios públicos do GitHub.",
    path: "/projetos",
    jsonLd: [
      {
        "@type": "CollectionPage",
        name: "Projetos",
        url: absolute("/projetos"),
        hasPart: projects.map((project) => ({
          "@type": "CreativeWork",
          name: project.name,
          url: absolute(`/projetos/${project.slug}`),
        })),
      },
      breadcrumbs([{ name: "Início", path: "/" }, { name: "Projetos" }]),
    ],
  };
}

export function seoForProject(project: Project): SeoData {
  const path = `/projetos/${project.slug}`;
  return {
    title: `${project.name} | ${site.name}`,
    description: project.description,
    path,
    image: project.cover.src,
    type: "article",
    jsonLd: [
      {
        "@type": "CreativeWork",
        name: project.name,
        headline: project.headline ?? project.name,
        description: project.description,
        url: absolute(path),
        image: absolute(project.cover.src),
        author: { "@id": person["@id"] },
        keywords: project.tech.join(", "),
      },
      breadcrumbs([
        { name: "Início", path: "/" },
        { name: "Projetos", path: "/projetos" },
        { name: project.name },
      ]),
    ],
  };
}

export function seoForRepo(repo: GithubRepo): SeoData {
  const path = `/projetos/${repo.name}`;
  const description = repo.description ?? `Repositório ${repo.name}, de Sávio Pessôa, no GitHub.`;
  return {
    title: `${repo.name} | Projetos de ${site.name}`,
    description,
    path,
    type: "article",
    jsonLd: [
      {
        "@type": "SoftwareSourceCode",
        name: repo.name,
        description,
        codeRepository: repo.html_url,
        programmingLanguage: repo.language ?? undefined,
        dateModified: repo.pushed_at,
        author: { "@id": person["@id"] },
      },
      breadcrumbs([
        { name: "Início", path: "/" },
        { name: "Projetos", path: "/projetos" },
        { name: repo.name },
      ]),
    ],
  };
}

export function seoForLinks(): SeoData {
  return {
    title: `Links | ${site.name}`,
    description: "WhatsApp, LinkedIn, GitHub, Instagram e e-mail de Sávio Pessôa.",
    path: "/links",
  };
}

export const seoForPrivatePage = (title: string): SeoData => ({
  title: `${title} | ${site.name}`,
  description: "Área restrita ao dono do site.",
  noindex: true,
});

export const seoForNotFound = (): SeoData => ({
  title: `Página não encontrada | ${site.name}`,
  description: "O endereço não existe ou mudou de lugar.",
  noindex: true,
});

function metaEntries(seo: SeoData) {
  const image = absolute(seo.image ?? DEFAULT_IMAGE);
  const entries: [string, string, string][] = [
    ["name", "description", seo.description],
    ["property", "og:type", seo.type ?? "website"],
    ["property", "og:site_name", site.name],
    ["property", "og:locale", "pt_BR"],
    ["property", "og:title", seo.title],
    ["property", "og:description", seo.description],
    ["property", "og:image", image],
    ["name", "twitter:card", "summary_large_image"],
    ["name", "twitter:title", seo.title],
    ["name", "twitter:description", seo.description],
    ["name", "twitter:image", image],
  ];
  if (seo.path) entries.push(["property", "og:url", absolute(seo.path)]);
  entries.push(["name", "robots", seo.noindex ? "noindex" : "index, follow"]);
  return entries;
}

function jsonLdText(seo: SeoData) {
  if (!seo.jsonLd?.length) return null;
  const graph = { "@context": "https://schema.org", "@graph": seo.jsonLd };
  // Impede que um `</script>` dentro de um texto feche a tag antes da hora
  return JSON.stringify(graph).replace(/</g, "\\u003c");
}

const escapeHtml = (text: string) =>
  text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");

/** Tags do `<head>` para o HTML gerado no build. */
export function renderSeoTags(seo: SeoData) {
  const lines = [`<title>${escapeHtml(seo.title)}</title>`];
  for (const [attribute, key, value] of metaEntries(seo)) {
    lines.push(`<meta ${attribute}="${key}" content="${escapeHtml(value)}" />`);
  }
  if (seo.path) lines.push(`<link rel="canonical" href="${absolute(seo.path)}" />`);
  const jsonLd = jsonLdText(seo);
  if (jsonLd) lines.push(`<script type="application/ld+json">${jsonLd}</script>`);
  return lines.join("\n    ");
}

/** Mantém o `<head>` certo ao navegar dentro do site. */
export function applySeo(seo: SeoData) {
  document.title = seo.title;

  for (const [attribute, key, value] of metaEntries(seo)) {
    let meta = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute(attribute, key);
      document.head.append(meta);
    }
    meta.content = value;
  }
  if (!seo.path) document.head.querySelector('meta[property="og:url"]')?.remove();

  let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (seo.path) {
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.append(canonical);
    }
    canonical.href = absolute(seo.path);
  } else {
    canonical?.remove();
  }

  document.head.querySelector('script[type="application/ld+json"]')?.remove();
  const jsonLd = jsonLdText(seo);
  if (jsonLd) {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = jsonLd;
    document.head.append(script);
  }
}
