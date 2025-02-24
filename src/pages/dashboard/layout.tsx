import { Outlet } from "react-router";
import { Header } from "../../components/global/header";
import { Sidebar } from "../../components/global/sidebar";

export default function Layout() {
  return (
    <div className="flex h-dvh overflow-hidden relative">
      <Sidebar />
      <main className="flex flex-col w-full overflow-y-auto overflow-x-hidden">
        <Header />
        <div className="pt-8 pb-16 lg:px-8 px-6 overflow-x-auto scroll-smooth h-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
