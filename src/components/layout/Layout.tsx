import { Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { buttonVariants } from "@/components/ui/buttonVariants";
import { Spinner } from "@/components/ui/Spinner";
import { StatusMessage } from "@/components/ui/StatusMessage";
import { ErrorBoundary } from "./ErrorBoundary";
import { ScrollManager } from "./ScrollManager";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

function PageFallback() {
  return (
    <div className="flex min-h-svh items-center justify-center">
      <Spinner className="text-2xl text-gold-ink" label="Carregando a página" />
    </div>
  );
}

function PageError() {
  return (
    <main className="mx-auto min-h-svh w-full max-w-wrap px-[var(--gl)] pt-32">
      <StatusMessage
        title="Algo deu errado nesta página"
        // Link de verdade: depois de um deploy, só recarregar traz os arquivos novos
        action={
          <a href="/" className={buttonVariants()}>
            Voltar para o início
          </a>
        }
      >
        Tente recarregar. Se continuar, me avise pelo LinkedIn.
      </StatusMessage>
    </main>
  );
}

export function Layout() {
  const { pathname } = useLocation();

  return (
    // Coluna com altura mínima da tela: o rodapé fica no fim mesmo em página curta
    <div className="flex min-h-svh flex-col">
      <ScrollManager />
      <SiteHeader />
      <ErrorBoundary key={pathname} fallback={<PageError />}>
        <Suspense fallback={<PageFallback />}>
          <Outlet />
        </Suspense>
      </ErrorBoundary>
      <SiteFooter />
    </div>
  );
}
