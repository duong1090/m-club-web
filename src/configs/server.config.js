import moment from "moment";

global.env = process.env.NODE_ENV;

if (global.env == "production") {
  console.log = () => {};
}

// const server = "192.168.1.3:8888";
const server = "mclub.ga:8888";

const Config =
  global.env == "production"
    ? {
        API_URL: `http://${server}/api/`,
        API_FILE_URL: `http://${server}/`,
        API_IMAGE: (imgPath) => {
          const { club } = global.organization || {};
          const clubId = club && club.id ? club.id : null;
          return `http://${server}/clubs/${clubId}/${imgPath}?${moment().unix()}`;
        },
      }
    : {
        API_URL: `http://${server}/api/`,
        API_FILE_URL: `http://${server}/`,
        API_IMAGE: (imgPath) => {
          const { club } = global.organization || {};
          const clubId = club && club.id ? club.id : null;
          return `http://${server}/clubs/${clubId}/${imgPath}?${moment().unix()}`;
        },
      };

export default Config;
