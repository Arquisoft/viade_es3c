import React, { Fragment } from "react";
import { PrivateLayout, PublicLayout, NotLoggedInLayout } from "@layouts";
import { HashRouter as Router, Switch, Redirect } from "react-router-dom";

import {
  Login,
  Register,
  PageNotFound,
  Welcome,
  RegistrationSuccess,
  Profile,
  FormModelConverter,
  FormModelRenderer
} from "./containers";
import NewRoute from "./containers/NewRoute";
import MyRoutes from "./containers/MyRoutes";
import MyFriends from "./containers/MyFriends";
import Footer from "./components/Footer";

const privateRoutes = [
  {
    id: "welcome",
    path: "/welcome",
    component: Welcome
  },
  {
    id: "route",
    path: "/route",
    component: NewRoute
  },
  {
    id: "myRoutes",
    path: "/myRoutes",
    component: MyRoutes
  },

  {
    id: "myFriends",
    path: "/myFriends",
    component: MyFriends
  },

  {
    id: "profile",
    path: "/profile",
    component: Profile
  },
  {
    id: "formmodelconverter",
    path: "/formmodel/converter",
    component: FormModelConverter
  },
  {
    id: "formmodelrenderer",
    path: "/formmodel/renderer",
    component: FormModelRenderer
  }
];

const Routes = () => (
  <Router>
    <Fragment>
      <Switch>
        <NotLoggedInLayout component={Login} path="/login" exact />
        <NotLoggedInLayout component={Register} path="/register" exact />
        <NotLoggedInLayout
          path="/register/success"
          component={RegistrationSuccess}
          exact
        />
        <PublicLayout path="/404" component={PageNotFound} exact />
        <Redirect from="/" to="/welcome" exact />
        <PrivateLayout path="/" routes={privateRoutes} />
        <Redirect to="/404" />
      </Switch>
      <Footer />
    </Fragment>
  </Router>
);

export default Routes;
