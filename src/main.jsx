import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { StyleProvider } from "@ant-design/cssinjs";
import { ConfigProvider } from "antd";
ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ConfigProvider
      theme={{
        components: {
          Select: {
            optionSelectedBg: "#3787ff",
            optionSelectedColor: "white",
            borderRadiusSM: 999,
          },
          Pagination: {
            itemActiveBg: "#E5E8E5",
            colorPrimaryBorder: "transparent",
            colorBorder: "black",
          },
        },
        token: {},
      }}
    >
      <StyleProvider hashPriority="high">
        <BrowserRouter>
          <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Bounce}
          />
          <App />
          <ToastContainer />
        </BrowserRouter>
      </StyleProvider>
    </ConfigProvider>
  </StrictMode>
);
