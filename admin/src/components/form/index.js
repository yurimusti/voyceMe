import React, { useState } from "react";
import * as Styled from "./style";

import { Input, Button, notification } from "antd";

const Form = ({
  onSubmit = () => {},
  onRegister = () => {},
  loadingButton = false,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const _handleSubmitForm = () => {
    if (email === "" || password === "") {
      notification.warning({
        message: "Warning",
        description: "Verify fields",
      });
    } else {
      onSubmit({ email, password });
    }
  };

  const _handleRegisterForm = () => {
    onRegister();
  };

  return (
    <Styled.Container>
      <Styled.Title>Login Form</Styled.Title>
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
        <Button onClick={() => _handleSubmitForm()} loading={loadingButton}>
          Submit
        </Button>
      </Styled.Box>
      <Styled.Box>
        <Button type="link" onClick={() => _handleRegisterForm()}>
          Register here
        </Button>
      </Styled.Box>
    </Styled.Container>
  );
};

export default Form;
