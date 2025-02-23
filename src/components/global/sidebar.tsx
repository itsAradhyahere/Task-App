import { Link, NavLink } from "react-router";
import { useThemeStore } from "../../store/theme-store";
import { sidebarLinks } from "../../config/links";
import clsx from "clsx";

export function Sidebar() {
  const theme = useThemeStore((state) => state.theme);
  const isDark = theme === "dark";

  return (
    <nav className="flex flex-col border-r dark:border-zinc-800 border-zinc-200 min-w-[16rem] w-[16rem] h-full">
      <Link to="/" className="self-center my-6">
        <img
          src={`/${isDark ? "logo-white" : "logo"}.png`}
          alt="techinnover"
          width={170}
        />
      </Link>
      <ul className="flex flex-col">
        {sidebarLinks.map((link) => (
          <li key={link.slug}>
            <NavLink
              to={`/dashboard${link.slug ? "/" : ""}${link.slug}`}
              className={({ isActive }) =>
                clsx(
                  "flex items-center gap-4 py-3 px-4 border-r-2 hover:dark:text-zinc-400 hover:text-primary-500 transition text-sm font-semibold",
                  isActive
                    ? "border-r-2 border-primary-400 dark:hover:text-white dark:text-white text-primary-600 dark:bg-zinc-800 bg-primary-50"
                    : "border-transparent"
                )
              }
              end
            >
              {<link.icon className="size-5" />} {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
