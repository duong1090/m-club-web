import React from "react";
import { CLUB } from "../../constants/routes";

const FileManager = (props) => {
  const { gotoRoute, location } = props;

  console.log("FileManager::::", props, location);

  return (
    <div>
      <p>This is File Manager</p>
      <a onClick={() => gotoRoute(CLUB, { testProps: true })}>Go to Club</a>
    </div>
  );
};

export default FileManager;
