import { Button, Dropdown, MenuProps } from "antd";
import { BiMoon, BiSun, BiDesktop, BiExpandVertical } from "react-icons/bi";
import { Theme, useThemeStore } from "../../store/theme-store";
import { SizeType } from "antd/es/config-provider/SizeContext";

type ThemeToggleProps = {
  hideLabel?: boolean;
  size?: SizeType;
};

const items: MenuProps["items"] = [
  {
    key: "light",
    label: "Light",
    icon: <BiSun className="size-4" />,
  },
  {
    key: "dark",
    label: "Dark",
    icon: <BiMoon className="size-4" />,
  },
  {
    key: "system",
    label: "System",
    icon: <BiDesktop className="size-4" />,
  },
];

export default function ThemeToggle({ hideLabel, size }: ThemeToggleProps) {
  const { theme, setTheme } = useThemeStore();

  const handleToggleTheme: MenuProps["onClick"] = ({ key }) => {
    const theme = key as Theme;
    setTheme(theme);
  };

  return (
    <Dropdown
      placement="bottomRight"
      menu={{
        items,
        onClick: handleToggleTheme,
        selectable: true,
        defaultSelectedKeys: ["system"],
      }}
      trigger={["click"]}
      className="font-semibold capitalize"
    >
      <Button
        icon={
          theme === "dark" ? (
            <BiMoon />
          ) : theme === "light" ? (
            <BiSun />
          ) : (
            <BiDesktop />
          )
        }
        size={size}
        className="shrink-0"
      >
        {!hideLabel && (
          <div className="flex items-center gap-1.5">
            theme <BiExpandVertical className="size-3" />
          </div>
        )}
      </Button>
    </Dropdown>
  );
}
