import React, { useState } from "react";
import {
  Form,
  Checkbox,
  Button,
  Grid,
  Header,
  Divider
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import Styled from "styled-components";
import Register from "./register";

const Container = Styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    width: 100%;
    height:calc(100vh - 40px);


`;

interface MyUser {
  username: String;
  password: String;
}

function Login() {
  const [user, setUser] = useState<MyUser>({
    username: "",
    password: ""
  });

  const handleChanges = (e: any): void => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: any): void => {
    e.preventDefault();
    console.log(user);
  };

  return (
    <Container>
      <Form
        onSubmit={handleSubmit}
        style={{
          width: "300px",
          padding: "60px",
          boxShadow: "4px 4px 10px #333333",
          borderRadius: "5px"
        }}
      >
        <Header as="h1" content="JoBook" />

        <Form.Field>
          <label>Username</label>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={handleChanges}
          />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChanges}
          />
        </Form.Field>
        <Form.Field
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between"
          }}
        >
          <Button size="tiny" type="submit" primary>
            Login
          </Button>

          <Divider horizontal>OR</Divider>

          <Button
            style={{ background: "transparent", color: "teal" }}
            as={Link}
            to="/register"
            size="tiny"
            secondary
          >
            Register
          </Button>
        </Form.Field>
      </Form>
    </Container>
  );
}

export default Login;
