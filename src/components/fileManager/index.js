import "./style.scss";
import React, { useState, useEffect, useRef } from "react";
import axiosRequest from "../../utils/request";

import { Tree, Progress, Divider } from "antd";
import Config from "../../configs/server.config";
import { useRecoilValue } from "recoil";
import { organizationState } from "../../recoil";
import { getFileType } from "./utils";
import { UploadOutlined } from "@ant-design/icons";
import UploadModal from "./components/upload";
import { IMAGE_TYPE } from "./constants";
import InfoBox from "../ui/infoBox";

const { DirectoryTree } = Tree;
const FileManager = (props) => {
  // props
  const { gotoRoute, location } = props;

  // state
  const [curPercent, setPercent] = useState(0);
  const [treeData, setTreeData] = useState([]);
  const [visibleProgress, setVisibleProgress] = useState(false);
  const [displayFiles, setDisplayFiles] = useState(false);

  //recoil
  const organization = useRecoilValue(organizationState);

  //variables
  const uploadModalRef = useRef(null);

  // didmount
  useEffect(() => {
    getTreData();
  }, []);
  // didupdate
  useEffect(() => {
    if (curPercent === 100) {
      setVisibleProgress(false);
      getTreData();
      setPercent(0);
    }
  }, [curPercent]);

  // function ----------------------------------------------------------------------------------------------------------------------------------------------------------------
  const getTreData = () => {
    axiosRequest
      .get(`file/tree-folder`)
      .then((result) => {
        console.log("axiosReuquestget:::::::::::::", result);
        if (result && result.data) {
          return setTreeData(result.data);
        }
        return [];
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const findDeep = async (list, key) => {
    for (let index = 0; index < list.length; index++) {
      const item = list[index];
      let res = null;
      if (item.key === key) {
        res = item;
      } else if (item.children && item.children.length) {
        res = await findDeep(item.children, key);
      }
      if (res) {
        return res;
      }
    }
  };

  const onSelect = async (keys) => {
    console.log("onSelect:::", keys);

    let selectedFiles = [];
    for (let index = 0; index < keys.length; index++) {
      const key = keys[index];
      let file = await findDeep(treeData, key);
      console.log("findDeep", file);
      if (file) {
        if (file.children) {
          selectedFiles = file.children;
          break;
        }
        selectedFiles.push(file);
      }
    }

    setDisplayFiles(selectedFiles);
  };

  const onDownload = (item) => {
    const clubId =
      organization && organization.club && organization.club.id
        ? organization.club.id
        : "null";

    const URL = Config.API_FILE_URL.concat(`clubs/${clubId}`);
    var filePath = URL + item.key;
    window.open(filePath);
  };

  const openUploadModal = () => {
    uploadModalRef.current && uploadModalRef.current.show();
  };

  const uploadFile = (files) => {
    console.log("uploadFile:::", files);

    setVisibleProgress(true);
    let data = new FormData();
    if (files) {
      Object.keys(files).map((index) => {
        let file = files[index];
        data.append(`files`, file);
      });
    }
    const option = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        let percent = Math.floor((loaded * 100) / total);
        console.log("percentttttt ", percent);
        setPercent(percent);
      },
    };
    axiosRequest
      .post(`file/upload`, data, option)
      .then((result) => {})
      .catch((err) => {
        console.log(err);
      });
  };

  //render ------------------------------------------------------------------------------------------------------------------------------------------------------------------

  const renderUploadBtn = () => {
    return (
      <div className="btn upload-btn bg-info" onClick={openUploadModal}>
        <UploadOutlined />
      </div>
    );
  };

  const renderSideBar = () => {
    return (
      <div className="side-bar">
        <div className="d-flex align-items-end">
          <img
            src={require("../../assets/image/Mclub-bgrLogo.png").default}
            style={{ width: 50, height: 50, marginRight: 20 }}
          />
          <h5>File Manager</h5>
        </div>
        <Divider />
        <DirectoryTree
          style={{
            fontSize: 16,
          }}
          multiple
          defaultExpandAll
          onSelect={onSelect}
          treeData={treeData}
        />
      </div>
    );
  };

  const renderDisplayFiles = (item) => {
    const type = getFileType(item.key);
    const image = require(`../../assets/image/${type}.png`).default;
    console.log("renderDisplayFiles", item, type, image);

    return (
      <div className="col-3 mb-3">
        <a className="card file-card shadow" onClick={() => onSelect([item.key])}>
          {type == IMAGE_TYPE ? (
            <img className="img-direct" src={Config.API_IMAGE(item.key)} />
          ) : (
            <div className="img-wrapper">
              <img src={image} />
            </div>
          )}
          <div className="content-wrapper">
            <h6>{item.title}</h6>
            {!item.children ? (
              <div
                className="btn btn-primary download-btn"
                onClick={() => onDownload(item)}
              >
                {type == IMAGE_TYPE ? "View" : "Download"}
              </div>
            ) : null}
          </div>
        </a>
      </div>
    );
  };

  const renderInfoBox = () => {
    return (
      <div className="d-flex justify-content-end mb-2">
        <InfoBox />
      </div>
    );
  };

  const renderContent = () => {
    return (
      <div className="content">
        {renderInfoBox()}
        {visibleProgress ? (
          <Progress percent={curPercent} size="small" status="active" />
        ) : (
          <div style={{ height: 23, width: "100%" }} />
        )}
        <div className=" row file-previewer">
          {displayFiles && displayFiles.length
            ? displayFiles.map((item, index) => {
                return renderDisplayFiles(item);
              })
            : null}
        </div>
      </div>
    );
  };

  const renderModal = () => {
    return (
      <React.Fragment>
        <UploadModal ref={uploadModalRef} onSubmit={uploadFile} />
      </React.Fragment>
    );
  };

  return (
    <div className="file-manager">
      {renderSideBar()}
      {renderContent()}
      {renderUploadBtn()}
      {renderModal()}
    </div>
  );
};

export default FileManager;
