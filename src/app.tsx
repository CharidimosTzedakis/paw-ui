import { useState } from "react";
import { Layout, ConfigProvider } from "antd";
import { Redirect, Route, Switch } from "wouter";
import AppHeader from "@components/header";
import CatView from "@views/catView";
import BreedView from "@views/breedView";
import FavouritesView from "@views/favouritesView";
import CatDetailsModal from "@components/catDetailsModal";
import { lightTheme, darkTheme } from "./theme";
import "antd/dist/reset.css"; //antd css reset
import "./app.module.scss";

const { Content, Footer } = Layout;

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
        <AppHeader theme={theme} toggleTheme={toggleTheme} />
        <Content>
          <Switch>
            <Route path="/cats" nest>
              <CatView />
              <Route path="/cats/:id">
                {(params) => <CatDetailsModal id={params.id} />}
              </Route>
            </Route>
            <Route path="/breeds" component={BreedView} />
            <Route path="/favourites" component={FavouritesView} />
            <Route>
              <Redirect to="/cats" />
            </Route>
          </Switch>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Paw UI ©{new Date().getFullYear()}
        </Footer>
      </Layout>
    </ConfigProvider>
  );
}

export default App;
