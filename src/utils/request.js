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

export const getParamsFromObj = (params) => {
  if (!params) {
    return "";
  }
  let esc = encodeURIComponent;
  let query = Object.keys(params)
    .map((key) => {
      if (Array.isArray(params[key])) {
        return params[key].reduce((str, item, index) => {
          if (index > 0) str += "&";
          str += `${key}%5B${index}%5D=${item}`;

          return str;
        }, "");
      } else {
        return `${esc(key)}=${esc(params[key])}`;
      }
    })
    .join("&");
  if (query) return `?${query}`;
  return "";
};

const checkStatus = (status) => {
  return status == 200 || status == 400;
};

const axiosRequest = axios.create({
  baseURL: Config.API_URL,
  headers: {
    Device: buildDeviceInfo(),
    LANG: "en",
  },
  validateStatus: checkStatus,
  timeout: 3000000,
});

export default axiosRequest;
