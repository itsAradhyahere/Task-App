import { create } from "zustand";

export type Theme = "light" | "dark" | "system";

interface ThemeState {
  theme: Theme;
  resolvedTheme: "light" | "dark";
  setTheme: (theme: Theme) => void;
}

export const useThemeStore = create<ThemeState>((set) => {
  // Get system preference
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const savedTheme = localStorage.getItem("theme") as Theme | null;

  const initialTheme = savedTheme || "system";
  const resolvedTheme =
    initialTheme === "dark" || (initialTheme === "system" && prefersDark)
      ? "dark"
      : "light";

  // Apply initial theme by default
  document.documentElement.classList.toggle("dark", resolvedTheme === "dark");

  return {
    theme: initialTheme,
    resolvedTheme,
    setTheme: (theme) =>
      set(() => {
        localStorage.setItem("theme", theme);
        const newResolvedTheme =
          theme === "dark" || (theme === "system" && prefersDark)
            ? "dark"
            : "light";
        document.documentElement.classList.toggle(
          "dark",
          newResolvedTheme === "dark"
        );
        return { theme, resolvedTheme: newResolvedTheme };
      }),
  };
});
