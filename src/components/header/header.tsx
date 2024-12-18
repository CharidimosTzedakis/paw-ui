import { Layout, Menu, Switch } from "antd";
import { BulbOutlined, MoonOutlined } from "@ant-design/icons";

const { Header } = Layout;

const items = [
  { key: "1", label: "Cats" },
  { key: "2", label: "Breeds" },
  { key: "3", label: "Favourites" },
];

export default function AppHeader({
  theme,
  toggleTheme,
}: {
  theme: string;
  toggleTheme: (checked: boolean) => void;
}) {
  return (
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
        checkedChildren={<MoonOutlined />}
        unCheckedChildren={<BulbOutlined />}
      />
    </Header>
  );
}
