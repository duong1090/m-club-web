import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { CLUB, FILE_MANAGER, SIGN_IN } from "../../constants/routes";
import { organizationState } from "../../recoil";

const Home = (props) => {
  const { gotoRoute, location } = props;

  const organization = useRecoilValue(organizationState);

  useEffect(() => {
    gotoRoute(FILE_MANAGER);
  }, []);

  return <div></div>;
};

export default Home;
