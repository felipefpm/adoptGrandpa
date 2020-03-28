import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import NewCase from "./pages/NewCase";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/cadastro" component={Register} />
        <Route path="/perfil" component={Profile} />
        <Route path="/casos/new" component={NewCase} />
      </Switch>
    </BrowserRouter>
  );
}
