import React from "react";
import { CLUB, FILE_MANAGER } from "../../constants/routes";

const Home = (props) => {
  const { gotoRoute, location } = props;

  return (
    <div>
      <p>This is Home</p>
      <a onClick={() => gotoRoute(CLUB, { testProps: true })}>Go to Club</a>
      <a onClick={() => gotoRoute(FILE_MANAGER, { testProps: true })}>
        Go to File Manager
      </a>
    </div>
  );
};

export default Home;
