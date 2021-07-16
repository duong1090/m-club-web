import { List, Modal } from "antd";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { CloseOutlined } from "@ant-design/icons";
import { useRecoilState } from "recoil";
import { certificateState } from "../../recoil";

const SelectClub = (props, ref) => {
  //props
  const { turnOffBlur } = props;
  //state
  const [visible, setVisible] = useState(false);
  const [clubs, setClubs] = useState([]);

  //recoil
  const [certificate, setCertificate] = useRecoilState(certificateState);

  //hooks -------------------------------------------------------------------------------------------------------------------------------------
  useImperativeHandle(ref, () => ({ show, hide }));

  //function ----------------------------------------------------------------------------------------------------------------------------------
  const show = (clubs) => {
    setClubs(clubs);
    setVisible(true);
  };

  const hide = () => {
    setVisible(false);
    turnOffBlur();
  };

  const onSelectClub = (club) => {
    setCertificate({ ...certificate, club_id: club.id, step: "verify-otp" });
    setVisible(false);
  };

  //render ------------------------------------------------------------------------------------------------------------------------------------
  const renderClub = (club) => {
    return (
      <List.Item
        actions={[
          <a
            className="text-primary text-decoration-none"
            onClick={() => onSelectClub(club)}
          >
            Select
          </a>,
        ]}
      >
        <List.Item.Meta title={<p>{club.name}</p>} description={club.code} />
      </List.Item>
    );
  };

  const renderBody = () => {
    return (
      <div className="body">
        <List dataSource={clubs} renderItem={(item) => renderClub(item)} />
      </div>
    );
  };

  const renderHeader = () => {
    return (
      <div className="header">
        <h4 className="text-center">Select your club</h4>
        <a onClick={() => hide()}>
          <CloseOutlined />
        </a>
      </div>
    );
  };

  return (
    <div className={`modal__${visible ? "faded-in" : "hide"}`}>
      <div className="modal__content">
        {renderHeader()}
        {renderBody()}
      </div>
    </div>
  );
};

export default forwardRef(SelectClub);
