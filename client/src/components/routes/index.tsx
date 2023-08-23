import { createBrowserRouter, redirect, Route } from "react-router-dom";
import Initial from "../../pages/initial/index";
import LoginPage from "../../pages/login/index";
import UsersPage from "../../pages/users/index";
// import { fakeAuthProvider } from "./auth";
import type { LoaderFunctionArgs } from "react-router-dom";

function protectedLoader({ request }: LoaderFunctionArgs) {
  console.log(request);
  // If the user is not logged in and tries to access `/protected`, we redirect
  // them to `/login` with a `from` parameter that allows login to redirect back
  // to this page upon successful authentication
  // if (!fakeAuthProvider.isAuthenticated) {
  //   let params = new URLSearchParams();
  //   params.set("from", new URL(request.url).pathname);
  //   return redirect("/login");
  // }
  return null;
}

const router = createBrowserRouter([
  {
    path: "/",
    Component: Initial,
  },
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/users",
    Component: UsersPage,
    loader: protectedLoader,
  },
  // {
  //   path: "/logout",
  //   async action() {
  //     await fakeAuthProvider.signout();
  //     return redirect("/");
  //   },
  // },
]);

export default router;
