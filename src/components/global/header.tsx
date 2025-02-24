import { Badge, Button, Dropdown, MenuProps } from "antd";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";
import ThemeToggle from "../shared/theme";
import { BiChevronDown, BiFilterAlt } from "react-icons/bi";
import { useAppStore } from "../../store/app-store";
import { PriorityType } from "../../type";

const filter_options: MenuProps["items"] = [
  { key: "", label: "All (Default)" },
  {
    key: "low",
    label: "Low",
    extra: <Badge color="red" />,
  },
  {
    key: "medium",
    label: "Medium",
    extra: <Badge color="blue" />,
  },
  {
    key: "high",
    label: "High",
    extra: <Badge color="green" />,
  },
];

export function Header() {
  const today = new Date().toDateString();
  const setPriority = useAppStore((state) => state.setPriority);

  function handlePriorityFilter(key: string) {
    const value = key as PriorityType;
    setPriority(value);
  }

  return (
    <header className="flex items-center justify-between lg:flex-row flex-col gap-4 w-full lg:px-8 px-6 py-6 sticky top-0 dark:bg-zinc-900 bg-white z-40">
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
        <Dropdown
          menu={{
            items: filter_options,
            selectable: true,
            onClick: (info) => handlePriorityFilter(info.key),
          }}
          trigger={["click"]}
        >
          <Button>
            <BiFilterAlt className="size-3" />
            Filter Priority
            <BiChevronDown className="size-5" />
          </Button>
        </Dropdown>
        <ThemeToggle hideLabel />
      </div>
    </header>
  );
}
