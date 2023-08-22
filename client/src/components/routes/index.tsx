import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Initial from "../../pages/initial/index";
import Users from "../../pages/users/index";
import Cadastro from "../../pages/cadastro/index";
import Login from "../../pages/login/index";
import Cookies from "js-cookie";
import PageNotFound from "../../pages/pageNotFound";
import axios from "axios";

const AppRoutes = () => {
  const [token, setToken] = useState(undefined);
  const apiUrl = process.env.REACT_APP_API_NODE_URL;

  useEffect(() => {
    const getJwtToken = async () => {
      const response = await axios.get(`${apiUrl}/login`);

      if (response.data.status === "OK") {
        const token = response.data.token;
        Cookies.set("jwtToken", token);
        setToken(token);
      }
    };

    getJwtToken();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={token !== undefined ? <Initial /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<Login />} />
        <Route
          path="/users"
          element={token !== undefined ? <Users /> : <Navigate to="/login" />}
        />
        <Route
          path="/cadastro"
          element={
            token !== undefined ? <Cadastro /> : <Navigate to="/login" />
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
