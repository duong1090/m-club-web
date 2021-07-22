import React, { useEffect } from "react";
import Router from "../router";
import { BrowserRouter } from "react-router-dom";
import { Suspense } from "react";
import SignIn from "../components/signIn";
import LoadingInitialize from "../components/loadInitialize";
import { useRecoilValue } from "recoil";
import { isLoggedInState } from "../recoil";
import GlobalProvider from "./components/global";
import DefaultProvider from "./components/default";

const MainProvider = (props) => {
  const isLoggedIn = useRecoilValue(isLoggedInState);

  useEffect(() => {
    console.log("MainProvider:::isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);

  //render -----------------------------------------------------------------------------
  return (
    <React.Fragment>
      <DefaultProvider>
        <GlobalProvider>
          {isLoggedIn == true ? (
            <Suspense fallback={<LoadingInitialize />}>
              <BrowserRouter>
                <Router />
              </BrowserRouter>
            </Suspense>
          ) : null}
          {isLoggedIn == false ? <SignIn /> : null}
          {isLoggedIn != null ? null : <LoadingInitialize />}
        </GlobalProvider>
      </DefaultProvider>
    </React.Fragment>
  );
};

export default MainProvider;
