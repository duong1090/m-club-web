import { CLUB } from "../../constants/routes";
import React, { useState } from "react";
import axiosReuquest from '../../utils/request';

const FileManager = (props) => {
  const { gotoRoute, location } = props;

  const [curPercent, setPercent] = useState(0);

  const uploadFile = ({ target: { files } }) => {
    console.log('uploadFile ', files, typeof (files));
    let data = new FormData();
    if (files) {
      Object.keys(files).map((index) => {
        let file = files[index];
        data.append(`files`, file);
      })
    }
    // data.append('file', files[0]);

    const option = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        let percent = Math.floor((loaded * 100) / total);
        console.log('percentttttt ', percent);
        setPercent(curPercent);
      }
    }
    axiosReuquest.post(`http://localhost:8888/api/label/upload`, data, option)
      .then((result) => {

      })
      .catch((err) => {
        console.log(err);

      });
  }

  console.log("FileManager::::", props, location);

  return (
    <div>
      <p>This is File Manager</p>
      <input
        style={{
          cursor: "pointer",
          backgroundColor: '#077',
          padding: '10px',
          borderRadius: '3px'
        }}
        onChange={uploadFile}
        type='file'
        name='Upload files'
        multiple
      />
      <a onClick={() => gotoRoute(CLUB, { testProps: true })}>Go to Club</a>
      <h1>{curPercent}%</h1>
    </div>
  );
};

export default FileManager;
