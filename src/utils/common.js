import { API_TOKEN } from "../constants/storage";

export const getApiToken = () => {
  const apiToken = localStorage.getItem(API_TOKEN);
  return apiToken ? apiToken : null;
};

export const setApiToken = (token) => {
  localStorage.setItem(API_TOKEN, token);
};

export const getBundleId = () => {
  return "com.mclub";
};
