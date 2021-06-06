import React from "react";
import { FILE_MANAGER } from "../../constants/routes";

const Club = (props) => {
  const { gotoRoute, location } = props;

  console.log("Club::::", props, location);

  return (
    <div>
      <p>This is Club</p>
      <a onClick={() => gotoRoute(FILE_MANAGER, { testProps: true })}>
        Go to File Manager
      </a>
    </div>
  );
};

export default Club;
