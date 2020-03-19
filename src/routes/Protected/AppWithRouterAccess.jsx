import React from "react";
import { Route, useHistory } from "react-router-dom";
import { Security, SecureRoute, LoginCallback } from "okta-react-bug-fix";
import { Container } from 'semantic-ui-react';
import config from '../../utils/config';
import Home from '../Home';
import RegisterForm from "../Authentication/register";
import LoginForm from "../Authentication/LoginForm";
import Dashboard from "./dashboard";
import Navigation from "../navigation";

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
      <Navigation />
      <Container text style={{marginTop: '50px'}}>
      <Route exact path='/' component={Home} />
        <Route path="/implicit/callback" component={LoginCallback} />
        <Route exact path="/register" component={RegisterForm} />
        <Route exact path="/login" component={LoginForm} />
        <SecureRoute path="/dashboard" component={Dashboard} />
      </Container>
    </Security>
  );
};
export default AppWithRouterAccess;

