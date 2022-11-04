import createStore from "zustand";
import persist from "../utils/persist";

interface LoginStore {
  accessToken: string;
  onLogin: Function;
}

const useLoginStore = createStore<LoginStore>(
  persist(
    {
      key: "login",
      allowlist: ["accessToken"],
    },
    (set) => ({
      accessToken: "",
      onLogin: (accessToken) => {
        set({
          accessToken,
        });
      },
      clear: () => {
        set({
          accessToken: "",
        });
      },
    })
  )
);

export default useLoginStore;
