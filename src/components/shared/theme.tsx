import { Button, Dropdown, MenuProps } from "antd";
import { BiMoon, BiSun, BiDesktop, BiExpandVertical } from "react-icons/bi";
import { Theme, useThemeStore } from "../../store/theme-store";
import { SizeType } from "antd/es/config-provider/SizeContext";
import { JSX } from "react";

type ThemeToggleProps = {
  hideLabel?: boolean;
  size?: SizeType;
};

const themeIcons: Record<Theme, JSX.Element> = {
  light: <BiSun fill="currentColor" />,
  dark: <BiMoon fill="currentColor" />,
  system: <BiDesktop fill="currentColor" />,
};

const items: MenuProps["items"] = Object.entries(themeIcons).map(
  ([key, icon]) => ({
    key,
    label: key.charAt(0).toUpperCase() + key.slice(1),
    icon,
  })
);

export default function ThemeToggle({ hideLabel, size }: ThemeToggleProps) {
  const { theme, setTheme } = useThemeStore();

  const handleToggleTheme: MenuProps["onClick"] = ({ key }) => {
    const theme = key as Theme;
    setTheme(theme);
  };

  const icon = themeIcons[theme] || themeIcons.system; // Default to system

  return (
    <Dropdown
      placement="bottomRight"
      menu={{
        items,
        onClick: handleToggleTheme,
        selectable: true,
        defaultSelectedKeys: [theme],
      }}
      trigger={["click"]}
      className="font-semibold capitalize"
    >
      <Button
        icon={
          <div className="dark:text-primary-500 text-primary-600 size-4">
            {icon}
          </div>
        }
        size={size}
        className="shrink-0"
      >
        {!hideLabel && (
          <div className="flex items-center gap-1.5">
            {theme} <BiExpandVertical className="size-3" />
          </div>
        )}
      </Button>
    </Dropdown>
  );
}
