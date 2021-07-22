import React, { useEffect, useRef, useState } from "react";
import { Button, Form, Input, message } from "antd";
import "./styles.scss";
import { doLogin, preValidateLogin } from "../../actions/user";
import { useRecoilState, useSetRecoilState } from "recoil";
import { certificateState } from "./recoil";
import SelectClub from "./components/selectClub";
import InputOTP from "./components/inputOTP";
import { setUpReCaptcha } from "../../configs/firebase.config";
import { signInWithPhoneNumber } from "../../actions/authenticate";
import Lottie from "react-lottie";
import studentGif from "../../assets/lottie/55964-college-student-jumping.json";
import logo from "../../assets/image/Mclub-bgrLogo.png";
import { isLoggedInState, organizationState } from "../../recoil";

const SignIn = (props) => {
  //state
  const [loading, setLoading] = useState(false);
  const [blurring, setBlurring] = useState(false);

  //recoil
  const [certificate, setCertificate] = useRecoilState(certificateState);
  const setIsLoggedIn = useSetRecoilState(isLoggedInState);
  const setOrganization = useSetRecoilState(organizationState);

  //variables
  const selectClubRef = useRef(null);
  const inputOTPRef = useRef(null);

  //hooks -------------------------------------------------------------------------------------------------------------------------
  useEffect(() => {
    setUpReCaptcha();
  }, []);

  useEffect(() => {
    if (certificate.step == "verify-otp") onSignInWithPhoneNumber();
    else if (certificate.step == "login") onLogin();
  }, [certificate]);

  //function ----------------------------------------------------------------------------------------------------------------------

  const onFinish = (values) => {
    console.log("onFinish:::", values);

    setCertificate({ phone: values.phone });

    setLoading(true);
    preValidateLogin({ phone: values.phone })
      .then((clubs) => {
        if (clubs.length) openSelectClubs(clubs);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  const openSelectClubs = (clubs) => {
    selectClubRef.current && selectClubRef.current.show(clubs);
    setBlurring(true);
  };

  const openInputOTP = () => {
    inputOTPRef.current && inputOTPRef.current.show();
    setBlurring(true);
  };

  const onFinishFailed = (errors) => {};

  const onSignInWithPhoneNumber = () => {
    if (certificate.club_id) {
      openInputOTP();
      signInWithPhoneNumber({ phone: certificate.phone })
        .then((res) => {})
        .catch((err) => {
          onError(err);
        });
    }
  };

  const onLogin = () => {
    let payload = {};
    if (certificate.phone) payload.phone_number = certificate.phone;
    if (certificate.club_id) payload.club_id = certificate.club_id;
    if (certificate.token) payload.firebase_token = certificate.token;
    doLogin(payload)
      .then((organization) => {
        if (organization) {
          console.log("onLogin:::", organization);
          setOrganization(organization);
          global.organization = organization;
          setIsLoggedIn(true);
          setCertificate({ ...certificate, step: null });
        }
      })
      .catch((err) => onError(err));
  };

  const onError = (err) => {
    console.log(err);

    const mes = err.message || err;

    message.error(mes);
  };

  //render ------------------------------------------------------------------------------------------------------------------------
  const renderLottie = () => {
    const options = {
      autoplay: true,
      animationData: studentGif,
    };

    return (
      <div className="lottie-wrapper">
        <Lottie options={options} width="100%" height="100%" />
      </div>
    );
  };

  const renderForm = () => {
    return (
      <div className="form-wrapper">
        <div className="form-card">
          <img src={logo} className="logo-img" />
          <h4>MClub File Manager</h4>
          <Form
            onFinish={(values) => onFinish(values)}
            onFinishFailed={(errors) => onFinishFailed(errors)}
          >
            <Form.Item
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Please input your phone to sign in",
                },
              ]}
            >
              <Input
                className="phone-input"
                bordered={false}
                placeholder="Phone"
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="sign-in-btn"
              >
                Sign in
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  };

  const renderModal = () => {
    return (
      <React.Fragment>
        <SelectClub
          ref={selectClubRef}
          turnOffBlur={() => setBlurring(false)}
        />
        <InputOTP ref={inputOTPRef} turnOffBlur={() => setBlurring(false)} />
        <div id="recaptcha-container" />
      </React.Fragment>
    );
  };

  return (
    <div>
      <div className={`sign-in-wrapper__${blurring ? "blurring" : "static"}`}>
        {renderLottie()}
        {renderForm()}
      </div>
      {renderModal()}
    </div>
  );
};

export default SignIn;
