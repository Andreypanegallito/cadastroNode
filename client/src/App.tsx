import React from "react";
import { RouterProvider } from "react-router-dom";

import "./assets/styles/App.css";
import router from "./components/routes";

function App() {
  return (
    <RouterProvider router={router} fallbackElement={<p>Initial Load...</p>} />
  );
}

export default App;
