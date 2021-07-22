import React, { useState } from "react";
import GlobalContext from "../../../context";

const GlobalProvider = (props) => {
  const [context, setContext] = useState({
    current: {},
    set: (value) => setContext(value),
  });

  return (
    <GlobalContext.Provider value={context}>
      {props.children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
