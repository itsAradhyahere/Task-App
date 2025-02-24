import ThemeToggle from "../components/shared/theme";
import { Link } from "react-router";
import { Logo } from "../assets/icons/logo";

export default function Home() {
  return (
    <main className="flex flex-col h-dvh relative">
      <div className="max-w-8xl mx-auto lg:p-8 p-6 flex flex-col items-center justify-center text-center flex-1 mb-12">
        <Logo className="w-16 h-16 mb-5" />
        <h1 className="font-semibold sm:text-4xl text-2xl mb-3">
          Tasky Management Tool
        </h1>
        <p className="max-w-lg opacity-80 mb-6">
          Innovative task management for teams of all sizes. Streamline your
          workflow, boost productivity, and achieve your goals.
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <Link
            to="/dashboard"
            className="bg-primary-600 text-white py-2.5 px-4 rounded-lg hover:bg-primary-500 duration-200"
          >
            Visit Dashboard
          </Link>
        </div>
      </div>
      <div className="absolute top-14 right-14">
        <ThemeToggle />
      </div>
    </main>
  );
}
