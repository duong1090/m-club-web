import React, { useEffect } from "react";
import { message } from "antd";
import axiosRequest from "../../../utils/request";
import { BAD_REQUEST_STATUS, MESSAGE_DURATION } from "./constants";
import "./styles.scss";

const DefaultProvider = (props) => {
  useEffect(() => {
    setDefaultComponent();
    setDefaultRequest();
  }, []);

  //function ---------------------------------------------------------------------------------------------
  const setDefaultComponent = () => {
    message.config({
      duration: MESSAGE_DURATION,
    });
  };

  const setDefaultRequest = () => {
    axiosRequest.interceptors.request.use((config) => {
      console.log("headerRequest::::", config);

      console.log(
        `---------------${config.method ? config.method : ""}--------------- ${
          config.url
        }`
      );
      if (config.method == "post") console.log("params ------- ", config.data);
      return config;
    });

    axiosRequest.interceptors.response.use(
      (response) => {
        if (response.config) {
          const status = response.data.error_code;

          if (status == BAD_REQUEST_STATUS) {
            console.log(
              `---------------${
                response.config.method ? response.config.method : ""
              }--------------- ${response.config.url} --------------- FAILED`
            );
            const messageError = response.data.message;
            console.log("responseData error", messageError, response);
            message.error(messageError);
            return null;
          } else {
            console.log(
              `---------------${
                response.config.method ? response.config.method : ""
              }--------------- ${response.config.url} --------------- SUCCEED`
            );
            console.log("responseData", response.data, response);
            return response.data ? response.data : null;
          }
        } else return response;
      },
      (error) => {
        console.log("request::error", error);
      }
    );
  };

  //render -----------------------------------------------------------------------------------------------
  return <React.Fragment>{props.children}</React.Fragment>;
};

export default DefaultProvider;
