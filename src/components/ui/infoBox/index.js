import { Dropdown, Menu, message, Popconfirm } from "antd";
import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { logOut } from "../../../actions/user";
import { isLoggedInState, organizationState } from "../../../recoil";
import Avatar from "../avatar";
import "./styles.scss";

const InfoBox = (props) => {
  //recoil
  const organization = useRecoilValue(organizationState);
  const setIsLoggedIn = useSetRecoilState(isLoggedInState);

  //function -----------------------------------------------------------------------------------------------------------------------------------
  const doLogOut = () => {
    console.log("doLogOut::::");

    logOut()
      .then((res) => {
        if (res) setIsLoggedIn(false);
      })
      .catch((err) => {
        message.error(err);
      });
  };

  //render -------------------------------------------------------------------------------------------------------------------------------------
  const renderMenu = () => {
    console.log("renderMenu:::", organization);

    return (
      <Menu className="menu">
        <Popconfirm
          title="Are you sure to sign out?"
          onConfirm={doLogOut}
          onCancel={() => {}}
          okText="Yes"
          cancelText="No"
        >
          <Menu.Item key="log-out" className="menu-item" onClick={doLogOut}>
            Sign Out
          </Menu.Item>
        </Popconfirm>
      </Menu>
    );
  };

  return (
    <Dropdown overlay={renderMenu()} arrow overlayClassName="overlay">
      <div className="info-wrapper">
        <Avatar
          data={
            organization && organization.member ? organization.member : null
          }
          size={40}
        />
        <div className="content-wrapper">
          <p id="member-name">
            {organization && organization.member
              ? organization.member.name
              : ""}
          </p>
          <p id="club-name">
            {organization && organization.club ? organization.club.name : ""}
          </p>
        </div>
      </div>
    </Dropdown>
  );
};

export default InfoBox;
