import React, { useEffect } from "react";
import * as Styled from "./style";
import { useRouter } from "next/router";
import { useLazyQuery } from "@apollo/client";
import { notification } from "antd";

import Form from "../../src/components/form/index";

import { LOGIN_USER } from "../../src/models/query";
import useLoginStore from "../../src/store/useLogin";
import useUserStore from "../../src/store/useUser";

const Login = ({}) => {
  const router = useRouter();
  const { onLogin } = useLoginStore();
  const { setUser } = useUserStore();
  const [loginUser, { data, loading, error }] = useLazyQuery(LOGIN_USER);

  useEffect(() => {
    if (data !== undefined) {
      if (data.loginUser.status.status === 200) {
        onLogin(data.loginUser.status.accessToken);
        setUser(data.loginUser.data);
        router.push("/dashboard");
      } else {
        notification.warning({
          message: "Warning",
          description: data.loginUser.status.message,
        });
      }
    }
  }, [data]);

  return (
    <Styled.Container>
      <Form
        onSubmit={(input) => loginUser({ variables: { input } })}
        onRegister={() => router.push("/register")}
        loadingButton={loading}
      />
    </Styled.Container>
  );
};

export default Login;
