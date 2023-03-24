import { SiteHeader } from "~/components/site-header";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <>
      <SiteHeader />
      <main className="flex h-full w-full flex-1">{children}</main>
    </>
  );
}
