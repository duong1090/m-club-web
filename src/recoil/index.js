import { atom } from "recoil";

export const organizationState = atom({
  key: "organizationState",
  default: null,
});

export const isLoggedInState = atom({
  key: "isLoggedInState",
  default: null,
});
