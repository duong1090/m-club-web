import './style.scss'
import { CLUB } from "../../constants/routes";
import React, { useState, useEffect } from "react";
import axiosReuquest from '../../utils/request';

import { Tree, Progress, Tooltip } from 'antd';
const { DirectoryTree } = Tree;


const FileManager = (props) => {
  // props
  const { gotoRoute, location } = props;

  // state
  const [curPercent, setPercent] = useState(0);
  const [treeData, setTreeData] = useState([]);
  const [visibleProgress, setVisibleProgress] = useState(false);
  const [displayFiles, setDisplayFiles] = useState(false);

  // didmount
  useEffect(() => {
    setTreeData(getTreData);
  }, [])
  // didupdate
  useEffect(() => {
    if (curPercent === 100) {
      setVisibleProgress(false);
    }
  }, [curPercent])

  // function
  const getTreData = () => {
    axiosReuquest.get(`http://103.151.241.11:8888/api/file/tree-folder`)
      .then((result) => {
        console.log('axiosReuquestget:::::::::::::', result);
        if (result && result.data) {
          return setTreeData(result.data);
        }
        return []
      })
      .catch((err) => {
        console.log(err);
      });
  }
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
  const onSelect = async (keys, info) => {
    console.log('Select', keys, info);
    let selectedFiles = [];
    for (let index = 0; index < keys.length; index++) {
      const key = keys[index];
      let file = await findDeep(treeData, key);
      console.log('findDeep', file);
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

  const onExpand = () => {
    // console.log('Trigger Expand');
  };

  const uploadFile = ({ target: { files } }) => {
    setVisibleProgress(true);
    console.log('uploadFile ', files, typeof (files));
    let data = new FormData();
    if (files) {
      Object.keys(files).map((index) => {
        let file = files[index];
        data.append(`files`, file);
      })
    }
    const option = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        let percent = Math.floor((loaded * 100) / total);
        console.log('percentttttt ', percent);
        setPercent(percent);
      }
    }
    axiosReuquest.post(`http://103.151.241.11:8888/api/file/upload`, data, option)
      .then((result) => {

      })
      .catch((err) => {
        console.log(err);
      });
  }
  const onDownload = (item) => {
    const URL = 'http://103.151.241.11:8888/clubs/default'
    var filePath = URL + item.key;
  }
  const renderDisplayFiles = (item) => {
    console.log('renderDisplayFiles', item);
    return <div className="col-3">
      <div className="card-file">
        <Tooltip
          className="file-name"
          title={item.title}>
          <p>{item.title}</p>
        </Tooltip>
        {
          !item.children ? (
            <div className="btn btn-primary" onClick={() => onDownload(item)}>Download</div>
          ) : null
        }
      </div>
    </div>
  }
  // console.log("FileManager::::", props, location);
  return (
    <div className="file-manager">
      <div className="header">
        <p className="title">This is File Manager</p>
        <div className="input-side">
          <input
            className="btn button-upload "
            onChange={uploadFile}
            type='file'
            name='Upload files'
            multiple
          />
          {visibleProgress ? (
            <Progress percent={curPercent} size="small" status="active" />
          ) : null}
        </div>
      </div>
      <div className="content">
        <div className="tree-side">
          <DirectoryTree
            multiple
            defaultExpandAll
            onSelect={onSelect}
            onExpand={onExpand}
            treeData={treeData}
          />
        </div>
        <div className="row content-side">

          {displayFiles && displayFiles.length ?
            displayFiles.map((item, index) => {
              return renderDisplayFiles(item);
            }) : null}
        </div>
      </div>
      <div className="footer">
        <a className="btn btn-danger" onClick={() => gotoRoute(CLUB, { testProps: true })}>Back to home</a>
      </div>
    </div>
  );
};

export default FileManager;
