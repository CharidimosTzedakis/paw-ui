import { useState, useEffect } from "react";
import { Layout, ConfigProvider } from "antd";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppHeader from "@components/header";
import AppRoutes from "./routing/appRoutes";
import { lightTheme, darkTheme } from "./theme";
import "antd/dist/reset.css"; //antd css reset
import "./app.module.scss";

const { Content, Footer } = Layout;
const queryClient = new QueryClient();

function App() {
  const [theme, setTheme] = useState(
    localStorage.getItem("app-theme") || "dark",
  );

  const toggleTheme = (checked: boolean) => {
    const selectedTheme = checked ? "dark" : "light";
    setTheme(selectedTheme);
    document.body.setAttribute("data-theme", selectedTheme);
    localStorage.setItem("app-theme", selectedTheme);
  };

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider
        theme={theme === "light" ? { ...lightTheme } : { ...darkTheme }}
      >
        <Layout style={{ minHeight: "100vh", overflow: "auto" }}>
          <AppHeader theme={theme} toggleTheme={toggleTheme} />
          <Content>
            <AppRoutes />
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Paw UI ©{new Date().getFullYear()}
          </Footer>
        </Layout>
      </ConfigProvider>
    </QueryClientProvider>
  );
}

export default App;
