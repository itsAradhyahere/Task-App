import { Header } from "./header";
import { Sidebar } from "./sidebar";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex h-dvh">
      <Sidebar />
      <main className="w-full">
        <Header />
        {children}
      </main>
    </div>
  );
}
