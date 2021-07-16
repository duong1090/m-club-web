global.env = process.env.NODE_ENV;

if (global.env == "production") {
  console.log = () => {};
}

const Config =
  global.env == "production"
    ? {
        API_URL: "http://mclub.ga:8888/api/",
      }
    : {
        API_URL: "http://mclub.ga:8888/api/",
      };

export default Config;
