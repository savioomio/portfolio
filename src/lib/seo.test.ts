import { describe, expect, it } from "vitest";
import { projects } from "@/content/projects";
import { renderSeoTags, seoForHome, seoForNotFound, seoForProject } from "./seo";

describe("renderSeoTags", () => {
  it("escreve título, canônica e dados estruturados da Home", () => {
    const tags = renderSeoTags(seoForHome());

    expect(tags).toContain(
      "<title>Sávio Pessôa Afonso | Especialista E-commerce VTEX e Wake</title>",
    );
    expect(tags).toContain('rel="canonical" href="https://savioomiodev.com.br/"');
    expect(tags).toContain('"@type":"ProfilePage"');
  });

  it("dá título, descrição e caminho únicos para cada projeto", () => {
    const titles = new Set(projects.map((project) => seoForProject(project).title));
    const descriptions = new Set(projects.map((project) => project.description));

    expect(titles.size).toBe(projects.length);
    expect(descriptions.size).toBe(projects.length);
  });

  it("não indexa a página de erro nem aponta canônica", () => {
    const tags = renderSeoTags(seoForNotFound());

    expect(tags).toContain('name="robots" content="noindex"');
    expect(tags).not.toContain("canonical");
  });

  it("escapa aspas e tags que vierem de fora", () => {
    const tags = renderSeoTags({
      title: 'A "loja" <script>',
      description: "</script>",
      jsonLd: [{ "@type": "Thing", name: "</script>" }],
    });

    expect(tags).toContain("A &quot;loja&quot; &lt;script>");
    expect(tags.match(/<\/script>/g)).toHaveLength(1);
  });
});
