import React from "react";
import { BrowserRouter as Router, RouterProvider } from "react-router-dom";

import logo from "./assets/img/logo.svg";
import "./assets/styles/App.css";
import AppRoutes from "./components/routes";

function App() {
  return (
    <RouterProvider
      router={AppRoutes}
      fallbackElement={<p>Initial Load...</p>}
    />

    // <Router>
    //   <AppRoutes /> {/* Use o componente AppRoutes */}
    // </Router>
  );
}

export default App;
