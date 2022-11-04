import React from "react";
import * as Styled from "./style";
import { Button } from "antd";
import useUserStore from "../../src/store/useUser";
import useLoginStore from "../../src/store/useLogin";
import { useRouter } from "next/router";

const Dashboard = ({}) => {
  const router = useRouter();
  const { name, surname, clear: clearUser } = useUserStore();
  const { clear: clearLogin } = useLoginStore();

  const _handleLogout = () => {
    router.push("/");
    clearUser();
    clearLogin();
  };

  return (
    <Styled.Container>
      <Styled.Box>
        <Styled.Title>
          Welcome, <b>{`${name} ${surname}`}</b>
        </Styled.Title>
      </Styled.Box>
      <Styled.Box>
        <Button
          style={{ marginTop: 32 }}
          type="link"
          onClick={() => _handleLogout()}
        >
          Logout
        </Button>
      </Styled.Box>
    </Styled.Container>
  );
};

export default Dashboard;
