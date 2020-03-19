import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import Styled from "styled-components";

function Navigation() {
  const [activeItem, setActiveItem] = useState();

  const handleItemClick = (e, { name }) => {
    setActiveItem(name);
  };

  return (
    <Menu style={{ position: "fixed", zIndex: "3", width: "100%" }}>
      <Menu.Item
        as={Link}
        to="/"
        name="jobook"
        active={activeItem === "JoBook"}
        onClick={handleItemClick}
      >
        JoBook
      </Menu.Item>
      <Menu.Item
        as={Link}
        to="/dashboard"
        name="dashboard"
        active={activeItem === "dashboard"}
        onClick={handleItemClick}
        position="right"
      >
        Dashboard
      </Menu.Item>
      <Menu.Item
        as={Link}
        to="/login"
        name="sign-in"
        active={activeItem === "sign-in"}
        onClick={handleItemClick}
      >
        Sign-in
      </Menu.Item>
    </Menu>
  );
}
export default Navigation;
