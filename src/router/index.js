import React from "react";
import { BrowserRouter, Switch, Route, useHistory } from "react-router-dom";
import loadableRoutes from "./routes";

const Router = (props) => {
  const browserHistory = useHistory();

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
