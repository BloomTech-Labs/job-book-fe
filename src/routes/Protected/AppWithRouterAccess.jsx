import React from "react";
import { Route, useHistory } from "react-router-dom";
import { Security, SecureRoute, LoginCallback } from "okta-react-bug-fix";
import config from '../../utils/config';
import Home from '../Home';
import LoginForm from "../Authentication/LoginForm";
import Dashboard from "./dashboard";
import Navigation from "../navigation";
import AboutUs from "../about-us"


const AppWithRouterAccess = () => {
  const history = useHistory();
  const onAuthRequired = () => {
    history.push("/login");
  };


  return (
    <Security
      {...config.oidc}
      onAuthRequired={onAuthRequired}
    >
      <div id="content" style={{overflowX:"scroll"}}>
        <Navigation />
        <Route exact path='/' component={Home} />
        <Route exact path="/implicit/callback" component={LoginCallback} />
        <Route exact path="/login" component={LoginForm} />
        <Route exact path="/about" component={AboutUs} />
        <SecureRoute exact path="/dashboard" component={Dashboard} />
      </div>
    </Security>
  );
};
export default AppWithRouterAccess;
