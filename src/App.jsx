import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./views/Home";
import Contacto from "./views/Contacto";
import Docentes from "./views/Docentes";
import LoginPage from "./views/LoginPage";
import UsuariosList from "./views/UsuariosList";
import { UsuariosProvider } from "./context/UsuariosContext";
import { AuthProvider } from "./context/AuthContext";
import EstudiantesDashboard from "./views/EstudiantesDashboard";
import AdminDashboard from "./views/AdminDashboard";
import AdminDocentes from "./views/AdminDocentes";
import AdminEstudiantes from "./views/AdminEstudiantes";
import WhatsAppButton from "./components/WhatsAppButton";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

function AppContent() {
  const location = useLocation()
  const hideNavbar = location.pathname === '/docentes' || location.pathname === '/estudiantes' || location.pathname.startsWith('/admin')

  return (
    <>
      {!hideNavbar && <Navbar />}
      {hideNavbar && <Footer simple />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/docentes" element={<ProtectedRoute roles={['docente']}><Docentes /></ProtectedRoute>} />
        <Route path="/estudiantes" element={<ProtectedRoute roles={['estudiante']}><EstudiantesDashboard /></ProtectedRoute>} />
        <Route path="/admin/usuarios" element={<ProtectedRoute roles={['administrador']}><UsuariosList /></ProtectedRoute>} />
        <Route path="/admin/docentes" element={<ProtectedRoute roles={['administrador']}><AdminDocentes /></ProtectedRoute>} />
        <Route path="/admin/estudiantes" element={<ProtectedRoute roles={['administrador']}><AdminEstudiantes /></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute roles={['administrador']}><AdminDashboard /></ProtectedRoute>} />
      </Routes>
      {!hideNavbar && <Footer />}
      <WhatsAppButton />
    </>
  )
}

const App = () => {
  return (
    <AuthProvider>
    <UsuariosProvider>
      <AppContent />
    </UsuariosProvider>
    </AuthProvider>
  );
};

export default App;