import React from "react";
import "./App.css";
import { Route } from "react-router-dom";
import { Button } from "semantic-ui-react";
import PrivateRoute from "./routes/Protected/privateRoute";
import Footer from "./routes/footer";
import Navigation from "./routes/navigation";
import Register from "./routes/Authentication/register";
import Login from "./routes/Authentication/LoginForm";
import Dashboard from "./routes/Protected/dashboard";
import AppWithRouterAccess from "./routes/Protected/AppWithRouterAccess";

import "semantic-ui-less/semantic.less";

function App() {
  return (
    <div className="App">
      <AppWithRouterAccess />
      <Footer />
    </div>
  );
}

export default App;
