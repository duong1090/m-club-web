import React from "react";
import Loadable from "react-loadable";
import * as routes from "../constants/routes";

const loadableRoutes = {};

const loadable = (path) => {
  return Loadable({
    loader: () => import(path),
    delay: false,
    loading: () => null,
  });
};

loadableRoutes[routes.HOME] = {
  defaultProps: {},
  component: React.lazy(() => import("../components/home")),
};

loadableRoutes[routes.CLUB] = {
  defaultProps: {},
  component: React.lazy(() => import("../components/club")),
};

loadableRoutes[routes.FILE_MANAGER] = {
  defaultProps: {},
  component: React.lazy(() => import("../components/fileManager")),
};

loadableRoutes[routes.SIGN_IN] = {
  defaultProps: {},
  component: React.lazy(() => import("../components/signIn")),
};

export default loadableRoutes;
