import { Button } from "antd";
import ThemeToggle from "../components/shared/theme";
import { Link } from "react-router";

export default function Home() {
  return (
    <main className="flex flex-col h-dvh relative">
      <div className="max-w-8xl mx-auto lg:p-8 p-6 flex flex-col items-center justify-center text-center flex-1 mb-12">
        <img
          src="/favicon.png"
          alt="Techinnover logo"
          width={80}
          height={80}
          className="block mb-5"
        />
        <h1 className="font-semibold sm:text-4xl text-2xl mb-3">
          Task Management Tool
        </h1>
        <p className="max-w-lg opacity-80 mb-6">
          Innovative task management for teams of all sizes. Streamline your
          workflow, boost productivity, and achieve your goals.
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <Button size="large" type="primary">
            <Link to="/dashboard">Visit Dashboard</Link>
          </Button>
        </div>
      </div>
      <div className="absolute top-14 right-14">
        <ThemeToggle />
      </div>
    </main>
  );
}
