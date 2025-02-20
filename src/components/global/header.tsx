import { Button, Input } from "antd";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";
import ThemeToggle from "../shared/theme";
import { BiSearch } from "react-icons/bi";

export function Header() {
  const today = new Date().toDateString();

  return (
    <header className="flex items-center justify-between gap-4 border-b dark:border-zinc-800 border-zinc-100 w-full lg:px-8 px-6 py-8">
      <div className="flex items-center gap-4">
        <time dateTime={today} className="font-semibold text-xl">
          {today}
        </time>
        <div className="flex items-center gap-2">
          <Button icon={<HiArrowLeft />} shape="circle" />
          <Button icon={<HiArrowRight />} shape="circle" />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Input
          placeholder="Search"
          size="large"
          prefix={<BiSearch className="opacity-50" />}
        />
        <ThemeToggle hideLabel size="large" />
      </div>
    </header>
  );
}
