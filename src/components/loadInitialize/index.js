import React, { useEffect } from "react";
import Lottie from "react-lottie";
import { useRecoilState } from "recoil";
import { getOrganization } from "../../actions/user";
import logo from "../../assets/image/Mclub-bgrLogo.png";
import loadingGif from "../../assets/lottie/splash.json";
import { API_TOKEN } from "../../constants/storage";
import { isLoggedInState, organizationState } from "../../recoil";
import axiosRequest from "../../utils/request";
import "./styles.scss";

const DELAY_TIMEOUT = 1500;

const LoadingInitialize = (props) => {
  //recoil
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);
  const [organization, setOrganization] = useRecoilState(organizationState);

  //variables
  const options = {
    autoplay: true,
    animationData: loadingGif,
  };

  //hooks ------------------------------------------------------------------------------------------------
  useEffect(() => {
    checkToken();
  });

  useEffect(() => {
    if (!organization && isLoggedIn)
      getOrganization().then((org) => {
        if (org) {
          setOrganization(org);
          global.organization = org;
        }
      });
  }, []);

  //functions ---------------------------------------------------------------------------------------------

  const checkToken = () => {
    const token = localStorage.getItem(API_TOKEN);

    setAuthenticateRequest(token);

    setTimeout(() => {
      console.log("LoadingInitialize:::token", token);
      if (token) setIsLoggedIn(true);
      else setIsLoggedIn(false);
    }, DELAY_TIMEOUT);
  };

  const setAuthenticateRequest = (token) => {
    if (token) axiosRequest.defaults.headers.Authorization = `Bearer ${token}`;
  };

  //render -----------------------------------------------------------------------------------------------
  return (
    <div className="splash-wrapper">
      <img src={logo} className="logo-img" />
      <Lottie options={options} width="20%" height="20%" />
    </div>
  );
};

export default LoadingInitialize;
