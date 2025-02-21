import { Outlet } from "react-router";
import { Header } from "../../components/global/header";
import { Sidebar } from "../../components/global/sidebar";

export default function Layout() {
  return (
    <div className="flex h-dvh">
      <Sidebar />
      <main className="w-full">
        <Header />
        <div className="lg:px-8 px-6 py-4">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
