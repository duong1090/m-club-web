import React, { useEffect } from "react";
import Router from "../router";
import { BrowserRouter } from "react-router-dom";
import { Suspense } from "react";
import SignIn from "../components/signIn";
import LoadingInitialize from "../components/loadInitialize";
import { useRecoilValue } from "recoil";
import { isLoggedInState } from "../recoil";

const MainProvider = (props) => {
  const isLoggedIn = useRecoilValue(isLoggedInState);

  useEffect(() => {
    console.log("MainProvider:::isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);

  //render -----------------------------------------------------------------------------
  return (
    <React.Fragment>
      {isLoggedIn == true ? (
        <Suspense fallback={<LoadingInitialize />}>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </Suspense>
      ) : null}
      {isLoggedIn == false ? <SignIn /> : null}
      {isLoggedIn != null ? null : <LoadingInitialize />}
    </React.Fragment>
  );
};

export default MainProvider;
