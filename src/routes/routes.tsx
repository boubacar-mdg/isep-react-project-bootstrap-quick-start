import { Route } from "../interfaces";
import Login from "../modules/auth/login/components/Login";
import Home from "../modules/home/components/Home";

/**
 * Routes pour l'application
 */
const routes: Route[] = [
  {
    name: "Accueil",
    key: "home",
    route: "/",
    icon: null,
    component: <Home />,
    authGuard: false,
  },
  {
    name: "Connexion",
    key: "login",
    route: "/login",
    icon: null,
    component: <Login />,
    authGuard: false,
  },
];

export default routes;
