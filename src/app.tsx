import { useState } from "react";
import { Layout, Menu, ConfigProvider, Switch } from "antd";
import CatView from "./views/catView";
import "antd/dist/reset.css"; //antd css reset
import "./app.module.scss";
import { lightTheme, darkTheme } from "./theme";

const { Header, Content, Footer } = Layout;

const items = [
  { key: "1", label: "Cats" },
  { key: "2", label: "Breeds" },
  { key: "3", label: "Favourites" },
];

function App() {
  const [theme, setTheme] = useState("light");

  const toggleTheme = (checked: boolean) => {
    const selectedTheme = checked ? "dark" : "light";
    setTheme(selectedTheme);
    document.body.setAttribute("data-theme", selectedTheme);
  };

  return (
    <ConfigProvider
      theme={theme === "light" ? { ...lightTheme } : { ...darkTheme }}
    >
      <Layout style={{ minHeight: "100vh" }}>
        <Header
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["1"]}
            items={items}
            style={{
              flex: 1,
              minWidth: 0,
              fontSize: "1.2rem",
              fontWeight: 600,
            }}
          />
          <Switch
            checked={theme === "dark"}
            onChange={toggleTheme}
            checkedChildren="Night"
            unCheckedChildren="Day"
          />
        </Header>
        <Content>
          <CatView />
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Paw UI ©{new Date().getFullYear()}
        </Footer>
      </Layout>
    </ConfigProvider>
  );
}

export default App;
