import createStore from "zustand";
import persist from "../utils/persist";

interface UserStore {
  _id: String;
  name: String;
  surname: String;
  email: String;
  setUser: Function;
  clear: Function;
}

const useUserStore = createStore<UserStore>(
  persist(
    {
      key: "user",
      allowlist: ["_id", "name", "surname", "email"],
    },
    (set) => ({
      _id: "",
      name: "",
      surname: "",
      email: "",
      setUser: ({ _id, name, surname, email }) => {
        set({
          _id,
          name,
          surname,
          email,
        });
      },
      clear: () => {
        set({
          _id: "",
          name: "",
          surname: "",
          email: "",
        });
      },
    })
  )
);

export default useUserStore;
