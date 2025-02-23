import { StrictMode } from "react";
import App from "../App.tsx";
import { ConfigProvider, ThemeConfig, theme } from "antd";
import "@ant-design/v5-patch-for-react-19";
import { useThemeStore } from "../store/theme-store.ts";
import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const { darkAlgorithm, defaultAlgorithm } = theme;
const queryClient = new QueryClient();

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
      colorBgContainer: isDark ? "#27272a" : "#fff",
      colorText: isDark ? "#fff" : "#111",
    },
    components: {
      Input: {
        activeBorderColor: "#5f56fe",
        activeShadow: "none",
      },
      Button: {
        defaultActiveBorderColor: "#5f56fe",
        defaultHoverBorderColor: "#5f56fe",
        defaultActiveColor: "none",
        primaryShadow: "none",
        dangerShadow: "none",
      },
      Badge: {
        colorError: isDark ? "#333" : "#ddd",
        colorTextLightSolid: isDark ? "#fff" : "#333",
      },
      Tooltip: {
        colorBgSpotlight: isDark ? "#27272a" : "#fff",
        colorTextLightSolid: isDark ? "#fff" : "#111",
      },
      Select: {
        activeBorderColor: "#5f56fe",
        activeOutlineColor: "transparent",
        controlItemBgActive: isDark ? "#5f56fe" : "#eee",
        // colorText: "crimson",
      },
      DatePicker: {
        activeBorderColor: "#5f56fe",
        controlOutline: "transparent",
        controlItemBgActive: "#5f56fe",
      },
    },
    algorithm: isDark ? darkAlgorithm : defaultAlgorithm,
  };

  return (
    <StrictMode>
      <ConfigProvider theme={themeConfig}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
        <Toaster position="bottom-left" theme={resolvedTheme} />
      </ConfigProvider>
    </StrictMode>
  );
}
