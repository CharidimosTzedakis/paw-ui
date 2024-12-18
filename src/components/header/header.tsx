import { Layout, Menu, Switch } from "antd";
import { Link } from "wouter";
import { BulbOutlined, MoonOutlined } from "@ant-design/icons";

const { Header } = Layout;

const items = [
  { key: "1", label: <Link href="/cats">Cats</Link> },
  { key: "2", label: <Link href="/breeds">Breeds</Link> },
  { key: "3", label: <Link href="/favourites">Favourites</Link> },
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
