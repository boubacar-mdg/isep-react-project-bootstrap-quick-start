import { ReactNode, useEffect } from "react";
import { appName } from "../../config/global.config";
import { getToken } from "../services/TokenService";
import { useNavigate } from "react-router-dom";

// Chaque composant de route de l'application est enveloppé par ce composant "WrapperComponent"
// Pour vérifier l'authentication si nécessaire et pour définir le titre de la page
function WrapperComponent({
  component,
  title,
  auth,
}: {
  title: string;
  component: ReactNode;
  auth?: boolean;
  routeKey?: string;
}) {
  const navigate = useNavigate();

  useEffect(() => {
    // Si la route requiert une authentication
    if (auth != undefined && auth == true) {
      const token = getToken();
      if (token == null) navigate("/auth/login");
    }

    // Titre de la page sur l'onglet du navigateur
    document.title = `${appName}: ${title}`;

  }, [title]);

  return component;
}

export default WrapperComponent;
