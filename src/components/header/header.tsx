import { Layout, Menu, Switch } from "antd";
import { Link, useLocation } from "wouter";
import { BulbOutlined, MoonOutlined } from "@ant-design/icons";

const { Header } = Layout;

const items = [
  {
    key: "1",
    label: (
      <Link href="/cats" tabIndex={0}>
        Cats
      </Link>
    ),
    path: "/cats",
  },
  {
    key: "2",
    label: (
      <Link href="/breeds" tabIndex={0}>
        Breeds
      </Link>
    ),
    path: "/breeds",
  },
  {
    key: "3",
    label: (
      <Link href="/favourites" tabIndex={0}>
        Favourites
      </Link>
    ),
    path: "/favourites",
  },
];

export default function AppHeader({
  theme,
  toggleTheme,
}: {
  theme: string;
  toggleTheme: (checked: boolean) => void;
}) {
  const [location] = useLocation();

  const selectedKey =
    items.find((item) => location.includes(item.path))?.key || "";

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
        selectedKeys={[selectedKey]}
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
        tabIndex={0}
      />
    </Header>
  );
}
