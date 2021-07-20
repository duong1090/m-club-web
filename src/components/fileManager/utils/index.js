import {
  COMPRESSED_TYPE,
  EXCEL_TYPE,
  FOLDER_TYPE,
  IMAGE_TYPE,
  OTHER_TYPE,
  POWERPOINT_TYPE,
  TEXT_TYPE,
  VIDEO_TYPE,
  WORD_TYPE,
} from "../constants";

export const isImageFile = (url) => {
  if (url.match(/.(jpg|jpeg|png|gif)$/i)) return true;
  else return false;
};

export const isVideoFile = (url) => {
  if (url.match(/.(m4v|avi|mpg|mp4)$/i)) return true;
  else return false;
};

export const isTextFile = (url) => {
  if (url.match(/.(txt)$/i)) return true;
  else return false;
};

export const isWordFile = (url) => {
  if (url.match(/.(docx|doc|docm|dot|dotx)$/i)) return true;
  else return false;
};

export const isExcelFile = (url) => {
  if (url.match(/.(xlsx|xlsm|xlsb|xltx)$/i)) return true;
  else return false;
};

export const isPowerPointFile = (url) => {
  if (url.match(/.(pptx|pptm|ppt|pdf)$/i)) return true;
  else return false;
};

export const isCompressFile = (url) => {
  if (url.match(/.(zip|rar|7zip)$/i)) return true;
  else return false;
};

export const isOtherFile = (url) => {
  if (url.match(/\./)) return true;
  else return false;
};

export const getFileType = (url) => {
  if (isCompressFile(url)) return COMPRESSED_TYPE;
  else if (isTextFile(url)) return TEXT_TYPE;
  else if (isImageFile(url)) return IMAGE_TYPE;
  else if (isVideoFile(url)) return VIDEO_TYPE;
  else if (isExcelFile(url)) return EXCEL_TYPE;
  else if (isPowerPointFile(url)) return POWERPOINT_TYPE;
  else if (isWordFile(url)) return WORD_TYPE;
  else if (isOtherFile(url)) return OTHER_TYPE;
  else return FOLDER_TYPE;
};
