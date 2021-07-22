import React, { useState, useEffect } from "react";
import { getAvatarSource } from "../../../actions/user";
import "./styles.scss";

const RATIO_NAME = 0.5;
const DIFF_SIZE = 2;

const Avatar = (props) => {
  //props
  const { className, size, data } = props;
  const [name, setName] = useState("A");
  const [avatar, setAvatar] = useState(null);

  //effect
  useEffect(() => {
    if (data) {
      getAvatar();
      if (data.name) setName(data.name[0].toUpperCase());
    }
  }, [data]);

  useEffect(() => {
    getAvatar();
  }, []);
  //#region function - event
  const getAvatar = () => {
    const url = getAvatarSource(data);
    if (url) setAvatar(url);
  };

  const getColorByName = (firstLetter) => {
    const colors = ["#30a6d1", "#e32256", "#f36e3a", "#8357c1", "#ef9748"];
    if (/[a-e]/iu.test(firstLetter)) return colors[0];
    if (/[f-i]/iu.test(firstLetter)) return colors[1];
    if (/[j-n]/iu.test(firstLetter)) return colors[2];
    if (/[o-t]/iu.test(firstLetter)) return colors[3];
    if (/[u-z]/iu.test(firstLetter)) return colors[4];
    return colors[0];
  };

  //render
  return (
    <div
      className={`avatar-wrapper ${className ? className : ""}`}
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: getColorByName(name),
      }}
    >
      <p style={{ fontSize: size * RATIO_NAME }}>{name}</p>

      {avatar ? (
        <img
          src={avatar}
          style={{
            width: size - DIFF_SIZE,
            height: size - DIFF_SIZE,
            borderRadius: (size - DIFF_SIZE) / 2,
          }}
        />
      ) : null}
    </div>
  );
};

export default Avatar;
