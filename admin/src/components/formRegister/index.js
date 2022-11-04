import React, { useState } from "react";
import * as Styled from "./style";

import { Input, Button, notification } from "antd";

const Form = ({
  onRegisterForm = () => {},
  onLogin = () => {},
  loadingButton = false,
}) => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const _handleRegisterForm = () => {
    if (name === "" || surname === "" || email === "" || password === "") {
      notification.warning({
        message: "Warning",
        description: "Verify fields.",
      });
    } else {
      if (password === rePassword) {
        onRegisterForm({ name, surname, email, password });
      } else {
        notification.warning({
          message: "Warning",
          description: "Verify your password.",
        });
      }
    }
  };

  const _handleLoginForm = () => {
    onLogin();
  };

  return (
    <Styled.Container>
      <Styled.Title>Register Form</Styled.Title>
      <Styled.Box>
        <Input
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Styled.Box>
      <Styled.Box>
        <Input
          placeholder="Your surname"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
        />
      </Styled.Box>
      <Styled.Box>
        <Input
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Styled.Box>
      <Styled.Box>
        <Input
          placeholder="Your password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Styled.Box>
      <Styled.Box>
        <Input
          placeholder="Re-password"
          type="password"
          value={rePassword}
          onChange={(e) => setRePassword(e.target.value)}
        />
      </Styled.Box>
      <Styled.Box>
        <Button onClick={() => _handleRegisterForm()} loading={loadingButton}>
          Register
        </Button>
      </Styled.Box>
      <Styled.Box>
        <Button
          type="link"
          onClick={() => _handleLoginForm()}
          loading={loadingButton}
        >
          Login here
        </Button>
      </Styled.Box>
    </Styled.Container>
  );
};

export default Form;
