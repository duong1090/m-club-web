import React, { useContext, useEffect } from "react";
import { BrowserRouter, Switch, Route, useHistory } from "react-router-dom";
import GlobalContext from "../context";
import loadableRoutes from "./routes";

const Router = (props) => {
  //context
  const globalContext = useContext(GlobalContext);

  //hooks ------------------------------------------------------------------------------------------
  const browserHistory = useHistory();

  useEffect(() => {
    globalContext &&
      globalContext.set &&
      globalContext.set({ ...globalContext.current, gotoRoute, goBack });
  }, []);

  //functions --------------------------------------------------------------------------------------
  const gotoRoute = (path, passProps = {}, type = "replace") => {
    console.log("gotoRoute::::", browserHistory);

    switch (type) {
      case "push":
        browserHistory.push(path, passProps);
      case "replace":
        browserHistory.replace(path, passProps);
    }
  };

  const goBack = () => {
    browserHistory.goBack();
  };

  //render ----------------------------------------------------------------------------------------
  return (
    <Switch>
      {Object.keys(loadableRoutes).map((path) => {
        const { component, defaultProps } = loadableRoutes[path];

        console.log("loiquanque:::", loadableRoutes[path], browserHistory);

        return (
          <Route
            exact
            path={path}
            key={path}
            render={(newProps) =>
              React.createElement(component, {
                ...defaultProps,
                ...newProps,
                ...newProps.location.state,
                path,
                gotoRoute,
                goBack,
              })
            }
          />
        );
      })}
    </Switch>
  );
};

export default Router;
