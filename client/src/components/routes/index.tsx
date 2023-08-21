import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Initial from "../../pages/initial/index";
import Users from "../../pages/users/index";
import Cadastro from "../../pages/cadastro/index";
import Login from "../../pages/login/index";
import Cookies from "js-cookie";
import PageNotFound from "../../pages/pageNotFound";

const token = Cookies.get("jwtToken");

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={
          token !== undefined ? <Initial /> : <Navigate to="/login" />
        } />
        <Route path='/login' element={<Login />} />
        <Route path='/users' element={
          token !== undefined ? <Users /> : <Navigate to="/login" />
        } />
        <Route path='/cadastro' element={
          token !== undefined ? <Cadastro /> : <Navigate to="/login" />
        } />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
