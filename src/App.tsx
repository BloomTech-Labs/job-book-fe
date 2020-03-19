import React from "react";
import "./App.css";
import { Route } from "react-router-dom";
import { Button } from "semantic-ui-react";
import PrivateRoute from "./routes/Protected/privateRoute";
import Footer from "./routes/footer";
import Navigation from "./routes/navigation";
import Register from "./routes/Signup/register";
import Login from "./routes/Signup/login";
import Dashboard from "./routes/Protected/dashboard";

function App() {
  return (
    <div className="App">
      <Navigation />
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/dashboard" component={Dashboard} />

      {/* <PrivateRoute exact path="/dashboard" component={}/> */}
      <Footer />
    </div>
  );
}

export default App;
