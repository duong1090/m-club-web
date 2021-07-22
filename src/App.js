import logo from "./logo.svg";
import "./App.scss";
import "antd/dist/antd.css";
import { RecoilRoot } from "recoil";
import MainProvider from "./provider";

function App() {
  return (
    <RecoilRoot>
      <MainProvider />
    </RecoilRoot>
  );
}

export default App;
