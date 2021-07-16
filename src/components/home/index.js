import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { CLUB, FILE_MANAGER, SIGN_IN } from "../../constants/routes";
import { organizationState } from "../../recoil";

const Home = (props) => {
  const { gotoRoute, location } = props;

  const organization = useRecoilValue(organizationState);

  useEffect(() => {
    console.log("Home:::organization", organization);
  }, [organization]);

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
