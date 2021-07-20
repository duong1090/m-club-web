import React, { forwardRef, useImperativeHandle, useState } from "react";
import Modal from "antd/lib/modal/Modal";
import { Upload, message, Button } from "antd";
import { InboxOutlined, UploadOutlined } from "@ant-design/icons";
import "../../style.scss";
const { Dragger } = Upload;

const UploadModal = (props, ref) => {
  const [visible, setVisible] = useState(false);
  const [files, setFiles] = useState([]);

  //hooks ------------------------------------------------------------------------------------------------
  useImperativeHandle(ref, () => ({
    show,
    hide,
  }));

  //function ---------------------------------------------------------------------------------------------
  const show = () => {
    setVisible(true);
  };

  const hide = () => {
    setVisible(false);
    setFiles([]);
  };

  const onSubmit = () => {
    hide();
    props.onSubmit(files);
  };

  const onChange = (info) => {
    const { file } = info;
    const newFiles = info.fileList.map((i) => i.originFileObj);
    setFiles(newFiles);
    console.log("onChange:::", newFiles, info);
  };

  const beforeUpload = () => {
    return false;
  };

  //render -----------------------------------------------------------------------------------------------
  const renderContent = () => {
    return (
      <div className="upload-modal">
        <Dragger
          onChange={onChange}
          multiple
          beforeUpload={beforeUpload}
          fileList={files}
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibit from
            uploading company data or other band files
          </p>
        </Dragger>
      </div>
    );
  };

  return (
    <Modal
      visible={visible}
      centered
      width="50%"
      onCancel={hide}
      footer={
        <div className="d-flex justify-content-center align-items-center">
          <Button type="primary" onClick={onSubmit}>
            Done
          </Button>
        </div>
      }
    >
      {renderContent()}
    </Modal>
  );
};

export default forwardRef(UploadModal);
