import Config from "../configs/server.config";
import { API_TOKEN } from "../constants/storage";
import axiosRequest, { getParamsFromObj } from "../utils/request";

export const preValidateLogin = (payload) => {
  const { phone } = payload;

  return new Promise((resolve, reject) => {
    axiosRequest
      .get("auth/get-club-by-phone".concat(getParamsFromObj({ phone })))
      .then((res) => {
        if (res && res.data) {
          resolve(res.data);
        } else reject(false);
      })
      .catch((err) => reject(err));
  });
};

export const doLogin = async (payload) => {
  return new Promise((resolve, reject) => {
    axiosRequest
      .post("auth/login", payload)
      .then((res) => {
        if (res && res.data) {
          loginSuccess(res.data)
            .then((organization) => {
              resolve(organization);
            })
            .catch((err) => reject(err));
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const loginSuccess = (token) => {
  localStorage.setItem(API_TOKEN, token);
  setAuthenticateRequest(token);
  return new Promise((resolve, reject) => {
    //loading organization
    getOrganization()
      .then((org) => {
        if (org) resolve(org);
      })
      .catch((err) => reject(err));
  });
};

const setAuthenticateRequest = (token) => {
  if (token) axiosRequest.defaults.headers.Authorization = `Bearer ${token}`;
};

export const getOrganization = () => {
  return new Promise((resolve, reject) => {
    axiosRequest
      .get("auth/organization")
      .then((res) => {
        if (res && res.data) {
          console.log("getOrganization:::", res.data);
          resolve(res.data);
          // if (res.data.lang) setItem(LANG, res.data.lang);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const getAvatarSource = (data = {}) => {
  if (data && (data.id || data.user_id)) {
    const id = data.id || data.user_id;
    return Config.API_IMAGE(`images/avatar/${id}.jpg`);
  }
  return null;
};

export const logOut = () => {
  return new Promise((resolve, reject) => {
    try {
      localStorage.removeItem(API_TOKEN);
      resolve(true);
    } catch (e) {
      reject(e);
    }
  });
};
