import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../../../stores";
import { LoginPayload } from "../../../../interfaces/user";

const Login = () => {
  const [loginPayload, setLoginPayload] = useState({} as LoginPayload);
  const navigate = useNavigate();

  const { login, error, loginLoading, setError, user } = useUserStore(
    (state) => ({
      login: state.login,
      error: state.error,
      loginLoading: state.loginLoading,
      setError: state.setError,
      message: state.message,
      user: state.user,
    })
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setLoginPayload((payload) => ({
      ...payload,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (user) navigate("/dashboard");
  }, [user]);

  const handleLogin = async () => {
    if (!loginPayload.username || !loginPayload.password) {
      setError("Merci de remplir les champs vides");
      return;
    }

    const response = await login(loginPayload);
    if (response === true) {
      navigate(`/dashboard`);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleLogin();
      }}
    >
      <div>
        <label htmlFor="username">Nom d'utilisateur</label>
        <input
          type="text"
          id="username"
          value={loginPayload.username}
          onChange={handleInputChange}
          placeholder="Saisir votre nom d'utilisateur..."
        />
      </div>
      <div>
        <label htmlFor="password">Mot de pass</label>
        <input
          type="password"
          id="password"
          value={loginPayload.password}
          onChange={handleInputChange}
          placeholder="Saisir votre Mot de passe..."
        />
      </div>
      <button type="submit" disabled={loginLoading}>
        {loginLoading ? "Connexion en cours..." : "Connexion"}
      </button>

      {error && <div>{error}</div>}
    </form>
  );
};

export default Login;
