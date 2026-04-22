import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./views/Home";
import Contacto from "./views/Contacto";
import Docentes from "./views/Docentes";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/docentes" element={<Docentes />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
