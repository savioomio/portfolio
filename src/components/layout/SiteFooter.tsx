import { Link } from "react-router-dom";
import { site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="relative z-[2] mt-auto flex flex-wrap items-center gap-x-5 gap-y-1 bg-[#1D1809] px-[var(--gl)] py-[22px] text-sm text-white">
      <p className="mr-auto">{site.name}, 2026.</p>
      <Link to="/projetos">Projetos</Link>
      <Link to="/links">Links</Link>
      <a href={site.github}>GitHub</a>
      <a href={site.linkedin}>LinkedIn</a>
      <Link to="/login">Área do dono</Link>
    </footer>
  );
}
