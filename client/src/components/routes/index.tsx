import React from "react";
import {
  Form,
  Link,
  Navigate,
  Outlet,
  RouterProvider,
  createBrowserRouter,
  redirect,
  useActionData,
  useFetcher,
  useLocation,
  useNavigation,
  useRouteLoaderData,
  useNavigate,
} from "react-router-dom";
import PrivateRoute from "../privateRoute/index"; // Certifique-se de importar o caminho correto

import Initial from "../../pages/initial/index";
import Users from "../../pages/users/index";
import Cadastro from "../../pages/cadastro/index";
import Login from "../../pages/login/index";
import Cookies from "js-cookie";

const token = Cookies.get("jwtToken");

const Initialaa = () => {
  if (token !== undefined) {
    return <Initial />;
  }
  return <Login />;
};

const LoginPage = () => {
  return <Login />;
};

const UsersPage = () => {
  if (token !== undefined) {
    return <Users />;
  }

  <Navigate to="/login" />;
  return <Login />;
};

const CadastroPage = () => {
  if (token !== undefined) {
    return <Cadastro />;
  }
  <Navigate to="/login" />;
  return <Login />;
};
// async function loginLoader() {
//   if (fakeAuthProvider.isAuthenticated) {
//     return redirect("/");
//   }
//   return null;
// }

const AppRoutes = createBrowserRouter([
  {
    id: "root",
    path: "/",
    Component: Initialaa,
    children: [
      {
        index: true,
        Component: Initialaa,
      },
    ],
  },
  {
    id: "Login",
    path: "/login",
    Component: LoginPage,
  },
  {
    id: "Users",
    path: "/users",
    Component: UsersPage,
  },
  {
    id: "Cadastro",
    path: "cadastro",
    Component: CadastroPage,
  },
]);

export default AppRoutes;
