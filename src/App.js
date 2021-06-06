import logo from "./logo.svg";
import "./App.css";
import "antd/dist/antd.css";
import Router from "./router";
import { BrowserRouter } from "react-router-dom";
import { Suspense } from "react";

function App() {
  return (
    <Suspense fallback={<div>Loading.....</div>}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
