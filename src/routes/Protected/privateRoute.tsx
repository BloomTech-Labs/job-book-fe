import React from "react";
import { Route, Redirect } from "react-router-dom";

interface Props {
  component: any;
}

const PrivateRoute: React.FC<Props> = props => {
  const { component: Component, ...rest } = props;

  return (
    <>
      <Route
        {...rest}
        render={renderProps => {
          if (localStorage.getItem("token")) {
            return <Component {...renderProps} />;
          } else {
            return <Redirect to="/" />;
          }
        }}
      />
    </>
  );
};

export default PrivateRoute;
