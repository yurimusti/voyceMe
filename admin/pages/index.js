import React, { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Lottie from "react-lottie";
import styles from "../src/styles/Home.module.css";

import useLoginStore from "../src/store/useLogin";
import useUserStore from "../src/store/useUser";

import * as loading from "../src/assets/loading/loading.json";

import { GET_USER } from "../src/models/query";
import { useLazyQuery } from "@apollo/client";

const App = () => {
  const router = useRouter();
  const { accessToken } = useLoginStore();
  const { setUser } = useUserStore();
  const [getUser, { data, loading: loadingGetUser, error }] = useLazyQuery(
    GET_USER
  );

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loading,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    if (accessToken === "") {
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } else {
      getUser({
        variables: {
          input: {
            token: accessToken.toString(),
          },
        },
      });
    }
  }, [accessToken]);

  useEffect(() => {
    if (data !== undefined) {
      if (data.getUser.status.status === 200) {
        setUser({ ...data.getUser.data });
        router.push("/dashboard");
      } else {
        router.push("/login");
      }
    }
  }, [data]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Admin VoicyMe</title>
        <meta name="description" content="Implements: Yuri Mustifaga" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className={styles.body}>
        <Lottie
          options={defaultOptions}
          height={200}
          width={200}
          isStopped={false}
          isPaused={false}
        />
      </div>
    </div>
  );
};

export default App;
