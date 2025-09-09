import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "~/App";
import reportWebVitals from "./reportWebVitals";
import GlobalStyles from "./components/GlobalStyles";
import ModalProvider from "./components/Provider/ModalProvider";
import VideoProvider from "./components/Provider/VideoProvider";
import AuthProvider from "./components/Provider/AuthProvider";
import NotifyProvider from "./components/Provider/NotifyProvider";
//import { StoreProvider } from './Store'

//Fake comments
function emitComment(id) {
  setInterval(() => {
    window.dispatchEvent(
      new CustomEvent(`lesson-${id}`, {
        detail: `comment của lesson ${id}`,
      })
    );
  }, 2000);
}
emitComment(1);
emitComment(2);
emitComment(3);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  //<StoreProvider>
  
  <BrowserRouter>
    <GlobalStyles>
      <AuthProvider>
        <VideoProvider>
          <NotifyProvider>
            <ModalProvider>
              <App />
            </ModalProvider>
          </NotifyProvider>
        </VideoProvider>
      </AuthProvider>
    </GlobalStyles>
  </BrowserRouter>
  
  //</StoreProvider>
  //</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
