import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from "./App";
import NotFound from "./pages/not-found";
import AboutUs from "./pages/about-us";
import WorksPage from "./pages/works";
import CatalogPage from "./pages/catalog";
import MediaPage from "./pages/media";
import CatalogItem from "./pages/catalog-item";
import Contact from "./pages/contact";

import Wrapper from "./components/Wrapper";

function Routing() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Wrapper(App)} />
        <Route exact path="/about-us" component={Wrapper(AboutUs)} />
        <Route exact path="/works" component={Wrapper(WorksPage)} />
        <Route exact path="/contact" component={Wrapper(Contact)} />
        <Route exact path="/media" component={Wrapper(MediaPage)} />
        <Route exact path="/works/catalog" component={Wrapper(CatalogPage)} />
        <Route exact path="/works/creations" component={Wrapper(CatalogPage)} />
        <Route
          exact
          path="/works/exhibitions"
          component={Wrapper(CatalogPage)}
        />
        <Route
          path="/works/catalog/:catalog"
          component={Wrapper(CatalogItem)}
        />
        <Route
          path="/works/creations/:creations"
          component={Wrapper(CatalogItem)}
        />
        <Route
          path="/works/exhibitions/:exhibitions"
          component={Wrapper(CatalogItem)}
        />
        <Route component={NotFound} path="*" status={404} />
      </Switch>
    </BrowserRouter>
  );
}
export default Routing;
