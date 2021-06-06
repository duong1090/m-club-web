global.env = process.env.NODE_ENV;

if (global.env == "production") {
  console.log = () => {};
}

const Config =
  global.env == "production"
    ? {
        API_URL: "",
      }
    : {
        API_URL: "",
      };

export default Config;
