import { StrictMode } from "react";
import App from "../App.tsx";
import { ConfigProvider, ThemeConfig, theme } from "antd";
import "@ant-design/v5-patch-for-react-19";
import { useThemeStore } from "../store/theme-store.ts";

const { darkAlgorithm, defaultAlgorithm } = theme;

export function Root() {
  const { resolvedTheme } = useThemeStore();
  const isDark = resolvedTheme === "dark";

  const themeConfig: ThemeConfig | undefined = {
    token: {
      fontFamily: "Inter, system-ui, Avenir, Helvetica, Arial, sans-serif",
      colorPrimary: "#4f35f3",
      colorPrimaryHover: "#5f56fe",
      colorLink: "#4f35f3",
      colorBorder: isDark ? "#333" : "#ddd",

      // Button
      colorBgContainer: isDark ? "#27272a" : "#fff",
      colorText: isDark ? "#fff" : "#111",
    },
    // Input
    components: {
      Input: {
        activeBorderColor: "#5f56fe",
        // hoverBorderColor: "#5f56fe",
        activeShadow: "none",
      },
      Button: {
        defaultActiveBorderColor: "#5f56fe",
        defaultHoverBorderColor: "#5f56fe",
        defaultActiveColor: "none",
      },
    },
    algorithm: isDark ? darkAlgorithm : defaultAlgorithm,
  };

  return (
    <StrictMode>
      <ConfigProvider theme={themeConfig}>
        <App />
      </ConfigProvider>
    </StrictMode>
  );
}
