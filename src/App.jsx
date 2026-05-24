import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./views/Home";
import Contacto from "./views/Contacto";
import Docentes from "./views/Docentes";
import LoginPage from "./views/LoginPage";
import UsuariosList from "./views/UsuariosList";
import { UsuariosProvider } from "./context/UsuariosContext";
import EstudiantesDashboard from "./views/EstudiantesDashboard";
import AdminDashboard from "./views/AdminDashboard";
import WhatsAppButton from "./components/WhatsAppButton";

const App = () => {
  return (
    <UsuariosProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/docentes" element={<Docentes />} />
        <Route path="/estudiantes" element={<EstudiantesDashboard />} />
        <Route path="/usuarios" element={<UsuariosList />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
      <Footer />
      <WhatsAppButton />
    </UsuariosProvider>
  );
};

export default App;