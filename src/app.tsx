import { Layout, Menu } from "antd";
import CatView from "./views/catView";
import "antd/dist/reset.css"; //antd css reset
import classes from "./app.module.scss";

const { Header, Content, Footer } = Layout;

const items = new Array(3).fill(null).map((_, index) => ({
  key: index + 1,
  label: `nav ${index + 1}`,
}));

function App() {
  return (
    <Layout className={classes.appLayout}>
      <Header style={{ display: "flex", alignItems: "center" }}>
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          items={items}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>
      <Content>
        <CatView />
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Paw UI ©{new Date().getFullYear()}
      </Footer>
    </Layout>
  );
}

export default App;
