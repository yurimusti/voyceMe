import { configurePersist } from "zustand-persist";

const { persist, purge } = configurePersist({
  storage: typeof window !== "undefined" && localStorage,
  rootKey: "root", // optional, default value is `root`
});
export default persist;
export { purge };
