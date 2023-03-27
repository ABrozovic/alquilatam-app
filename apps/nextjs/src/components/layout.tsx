import { SiteHeader } from "~/components/site-header";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <>
      <SiteHeader />
      <main className="flex h-full max-h-[calc(100vh-4.1rem)] w-full flex-1">
        {children}
      </main>
    </>
  );
}
