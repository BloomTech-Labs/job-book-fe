import React, { useState } from "react";
import axios from "axios";
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

const Container = Styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    width: 100%;
    height:calc(100vh - 40px);


`;

interface MyUser {
  password: string;
  firstName: string;
  lastName: string;
  email: string;
}

function Register(props) {
  const [user, setUser] = useState<MyUser>({
    firstName: "",
    lastName: "",
    password: "",
    email: ""
  });

  const handleChanges = (e: any): void => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: any): void => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/register", user)
      .then(res => {
        setUser({
          email: "",
          password: "",
          firstName: "",
          lastName: ""
        });
        props.history.push("/login");
      })
      .catch(err => {
        console.log("Error", err);
      });
  };

  return (
    <Container>
      <Form
        onSubmit={handleSubmit}
        style={{
          width: "300px",
          padding: "60px",
          boxShadow: "4px 4px 10px #333333",
          borderRadius: "5px",
          textAlign: "left"
        }}
      >
        <Header as="h1" content="JoBook" />
        <Form.Field required>
          <label>Email</label>
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleChanges}
          />
        </Form.Field>
        <Form.Field required>
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChanges}
          />
        </Form.Field>
        <Form.Field required>
          <label>First Name</label>
          <input
            type="text"
            placeholder="firstname"
            name="firstName"
            onChange={handleChanges}
          />
        </Form.Field>
        <Form.Field required>
          <label>Last Name</label>
          <input
            type="text"
            placeholder="lastname"
            name="lastName"
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
            Register
          </Button>

          <Divider horizontal>OR</Divider>

          <Button
            style={{ background: "transparent", color: "teal" }}
            as={Link}
            to="/login"
            size="tiny"
            secondary
          >
            Login
          </Button>
        </Form.Field>
      </Form>
    </Container>
  );
}

export default Register;
