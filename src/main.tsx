import React from "react";
import ReactDOM from "react-dom/client";
// import App from "./App";
import AppServerConnection from "./components/AppServerConnection";
import StartPage from "./pages/StartPage";
import PageManager from "./pages/PageManager";
// import "bootstrap/dist/css/bootstrap.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <PageManager />
    </React.StrictMode>
);
