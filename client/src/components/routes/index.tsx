import { createBrowserRouter, redirect } from "react-router-dom";
import Initial from "../../pages/initial/index";
import LoginPage from "../../pages/login/index";
import UsersPage from "../../pages/users/index";
import CadastroPage from "../../pages/cadastro/index";
import ActivateUserPage from "../../pages/activateUser/index";
import Cookies from "js-cookie";
import PageNotFound from "../../pages/pageNotFound";

function protectedLoader() {
  const token = Cookies.get("jwtToken");

  if (token === undefined) {
    return redirect("/login");
  }

  return null;
}

const router = createBrowserRouter([
  {
    path: "/",
    Component: Initial,
    loader: protectedLoader,
  },
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/activateUser",
    Component: ActivateUserPage,
  },
  {
    path: "/users",
    Component: UsersPage,
    loader: protectedLoader,
  },
  {
    path: "/cadastro",
    Component: CadastroPage,
    loader: protectedLoader,
  },
  {
    path: "*",
    Component: PageNotFound,
    loader: protectedLoader,
  },
]);

export default router;
