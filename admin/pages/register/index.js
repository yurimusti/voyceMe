import React, { useEffect } from "react";
import * as Styled from "./style";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { notification } from "antd";

import FormRegister from "../../src/components/formRegister";

import { CREATE_USER } from "../../src/models/mutation";

const Login = ({}) => {
  const router = useRouter();

  const [register, { data, loading, error }] = useMutation(CREATE_USER);

  useEffect(() => {
    if (data !== undefined) {
      if (data.createUser.status.status === 200) {
        router.push("/login");
        notification.success({
          description: "Account created.",
          message: "Success",
        });
      }
    }
  }, [data]);

  return (
    <Styled.Container>
      <FormRegister
        onLogin={() => router.push("/login")}
        onRegisterForm={(input) => {
          register({ variables: { input } });
        }}
        loadingButton={false}
      />
    </Styled.Container>
  );
};

export default Login;
