import { Link } from "react-router-dom";
import Header from "../../../shared/components/Header";
import Footer from "../../../shared/components/Footer";

const Home = () => {
  return (
    <>
      <Header />
      <div>Home</div>
      <Link to="/login">Rediriger vers la page de connexion</Link>
      <Footer />
    </>
  );
};

export default Home;
