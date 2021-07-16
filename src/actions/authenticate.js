import { auth } from "../configs/firebase.config";

export const signInWithPhoneNumber = (payload) => {
  return new Promise((resolve, reject) => {
    const { phone } = payload;

    console.log("firebase ne", phone, global, global.recaptchaVerifier);

    auth
      .signInWithPhoneNumber(`+84${phone}`, global.recaptchaVerifier)
      .then((confirm) => {
        if (confirm) {
          global.confirmOTP = confirm;
          resolve(true);
        } else reject("Xác thực số điện thoại không thành công");
      })
      .catch((err) => {
        reject(err);
        console.error(err);
      });
  });
};

export const confirmOTP = (otp) => {
  return new Promise((resolve, reject) => {
    if (global.confirmOTP) {
      global.confirmOTP
        .confirm(otp)
        .then((res) => {
          if (res) resolve(res);
          else reject("Xác thực số điện thoại không thành công");
        })
        .catch((err) => {
          console.error(err);
          reject(err);
        });
    } else {
      reject("Xác thực số điện thoại không thành công");
    }
  });
};

export const getIdToken = () => {
  return new Promise((resolve, reject) => {
    auth.currentUser
      .getIdToken()
      .then((idToken) => {
        resolve(idToken);
      })
      .catch((err) => reject(err));
  });
};
