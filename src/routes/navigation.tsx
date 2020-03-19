import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, MenuItemProps } from "semantic-ui-react";
import Styled from "styled-components";
import { useOktaAuth } from "okta-react-bug-fix";

function Navigation() {
  const [activeItem, setActiveItem] = useState<string>();
  const { authState, authService } = useOktaAuth();
  const issuer = "https://dev-505664.okta.com/oauth2/default";
  const redirectUri = window.location.origin;

  const handleItemClick = (name: string) => {
    setActiveItem(name);
  };

  const logout = async () => {
    // Read idToken before local session is cleared
    const idToken = authState.idToken;

    await authService.logout("/");
    // Clear remote session
    window.location.href = `${issuer}/v1/logout?id_token_hint=${idToken}&post_logout_redirect_uri=${redirectUri}`;
  };

  if (authState.isPending) {
    return <div>Loading...</div>;
  }

  return (
    <Menu style={{ top: "0", position: "fixed", zIndex: "3", width: "100%" }}>
      <Menu.Item
        as={Link}
        to="/"
        name="jobook"
        active={activeItem === "JoBook"}
        onClick={() => {
          handleItemClick("jobook");
        }}
      >
        JoBook
      </Menu.Item>
      <Menu.Item
        as={Link}
        to="/dashboard"
        name="dashboard"
        active={activeItem === "dashboard"}
        onClick={() => {
          handleItemClick("dashboard");
        }}
        position="right"
      >
        Dashboard
      </Menu.Item>
      {authState.isAuthenticated ? (
        <Menu.Item
          as={Link}
          to="/"
          name="sign-out"
          active={activeItem === "sign-out"}
          onClick={() => {
            handleItemClick("sign-out");
            logout();
          }}
        >
          Sign-Out
        </Menu.Item>
      ) : (
        <Menu.Item
          as={Link}
          to="/login"
          name="sign-in"
          active={activeItem === "sign-in"}
          onClick={() => {
            handleItemClick("sign-in");
          }}
        >
          Sign-In
        </Menu.Item>
      )}
    </Menu>
  );
}
export default Navigation;
