import { Outlet } from "react-router";
import { Header } from "../../components/global/header";
import { Sidebar } from "../../components/global/sidebar";

export default function Layout() {
  return (
    <div className="flex h-dvh overflow-hidden">
      <Sidebar />
      <main className="flex flex-col w-full overflow-y-auto overflow-x-hidden">
        <Header />
        <div className="lg:pl-8 lg:pr-8 pl-6 pr-32 pt-8 pb-16 overflow-x-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
