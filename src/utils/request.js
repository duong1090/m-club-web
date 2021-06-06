import axios from "axios";
import Config from "../configs/server.config";
import { getApiToken, getBundleId } from "./common";
import Base64 from "base-64";

const buildDeviceInfo = () => {
  if (!global.buildDeviceInfo) {
    const package_name = getBundleId();
    const objJsonStr = JSON.stringify({
      userAgent: navigator.userAgent,
      package_name,
    });
    const objJsonB64 = Base64.encode(objJsonStr);
    global.buildDeviceInfo = objJsonB64;
  }
  return global.buildDeviceInfo;
};

const checkStatus = (status) => {
  return status == 200;
};

const axiosRequest = axios.create({
  baseURL: Config,
  headers: {
    Device: buildDeviceInfo(),
    Authorization: `Bearer ${getApiToken()}`,
    LANG: lang,
  },
  validateStatus: checkStatus,
  timeout: 3000000,
});

axiosRequest.interceptors.request.use((config) => {
  console.log(`---------------${config.method}--------------- ${config.url}`);
  if (config.method == "POST") console.log("params ------- ", config.data);
  return config;
});

axiosRequest.interceptors.response.use(
  (response) => {
    if (response.status == 200)
      console.log(
        `---------------${config.method} -------------- SUCCEED --------------- ${config.url}`
      );
    else
      console.log(
        `---------------${config.method} -------------- FAILED --------------- ${config.url}`
      );
    console.log(response.data);
    return response.data;
  },
  (error) => {
    Promise.reject(error);
    console.error(error);
  }
);

export default axiosRequest;