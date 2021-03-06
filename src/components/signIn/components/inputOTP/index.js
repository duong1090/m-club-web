import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { CloseOutlined } from "@ant-design/icons";
import { Button, Divider, Input, message } from "antd";
import {
  confirmOTP,
  getIdToken,
  signInWithPhoneNumber,
} from "../../../../actions/authenticate";
import { useRecoilState } from "recoil";
import { certificateState } from "../../recoil";

const DEFAULT_COUNTDOWN = 15;
const DELAY_INTERVAL = 1000;

const InputOTP = (props, ref) => {
  const { turnOffBlur } = props;

  //state
  const [visible, setVisible] = useState(false);
  const [otp, setOTP] = useState(null);
  const [countdown, setCountdown] = useState(DEFAULT_COUNTDOWN);
  const [loadingOTP, setLoadingOTP] = useState(false);
  const [loadingVerify, setLoadingVerify] = useState(false);

  //recoil
  const [certificate, setCertificate] = useRecoilState(certificateState);

  //variables
  const countDownInterval = useRef(null);

  //hooks ---------------------------------------------------------------------------------
  useImperativeHandle(ref, () => ({
    show,
    hide,
  }));

  //function ------------------------------------------------------------------------------
  const show = () => {
    setVisible(true);
    doCountDown();
  };

  const hide = () => {
    setVisible(false);
    turnOffBlur();
    if (countDownInterval.current) clearInterval(countDownInterval.current);
  };

  const verifyCode = () => {
    console.log("verifyCode::::", certificate);
    setLoadingVerify(true);
    confirmOTP(otp)
      .then((res) => {
        if (res) {
          console.log("confirmOTP::::", res);

          getIdToken()
            .then((token) => {
              setCertificate({ ...certificate, token, step: "login" });
              setLoadingVerify(false);
            })
            .catch((err) => {
              setLoadingVerify(false);
              onError(err);
            });
        }
      })
      .catch((err) => {
        setLoadingVerify(false);
        onError(err);
      });
  };

  const resendOTP = () => {
    const { phone } = certificate;
    console.log("resendOTP:::", certificate, phone);

    if (phone) {
      loadingOTP(true);
      signInWithPhoneNumber({ phone })
        .then((res) => {
          setLoadingOTP(false);
        })
        .catch((err) => {
          setLoadingOTP(false);
          onError(err);
        });
    }
  };

  const onError = (err) => {
    console.log(err);

    const mes = err.message || err;

    message.error(mes);
  };

  const doCountDown = () => {
    if (countDownInterval.current) clearInterval(countDownInterval.current);
    countDownInterval.current = setInterval(() => {
      setCountdown((curr) => {
        if (curr <= 1) clearInterval(countDownInterval.current);
        return curr - 1;
      });
    }, DELAY_INTERVAL);
  };

  //render --------------------------------------------------------------------------------
  const renderHeader = () => {
    return (
      <div className="header">
        <h4 className="text-center">Input OTP</h4>
        <a onClick={() => hide()}>
          <CloseOutlined />
        </a>
      </div>
    );
  };
  const renderBody = () => {
    return (
      <div className="body mt-4 align-items-center">
        <Input
          placeholder="OTP"
          className="otp-input"
          onChange={(e) => setOTP(e.target.value)}
        />
        <Button
          type="primary"
          className="verify-btn"
          loading={loadingVerify}
          onClick={() => verifyCode()}
        >
          Verify
        </Button>
        <Divider dashed orientation="center" style={{ color: "#ddd" }}>
          Or
        </Divider>
        <Button
          disabled={countdown > 0}
          type="dashed"
          className="resend-btn"
          loading={loadingOTP}
          onClick={() => resendOTP()}
        >
          <span>Resend</span>
          {countdown > 0 ? (
            <span className="countdown">{countdown}</span>
          ) : null}
        </Button>
      </div>
    );
  };

  return (
    <div className={`modal__${visible ? "faded-in" : "hide"}`}>
      <div className="modal__content">
        {renderHeader()}
        {renderBody()}
      </div>
    </div>
  );
};

export default forwardRef(InputOTP);
