import React from "react";
import { BrowserRouter } from "react-router-dom";

import logo from "./assets/img/logo.svg";
import "./assets/styles/App.css";
import AppRoutes from "./components/routes";

function App() {
  return (
    <BrowserRouter>
      <AppRoutes /> {/* Use o componente AppRoutes */}
    </BrowserRouter>
  );
}

export default App;
