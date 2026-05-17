import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import './App.css'
import ProtectedRoute from './components/ProtectedRoute';
import AdminPanel from './pages/AdminPanel';
import Carrera from './pages/Carrera';
import PlanEstudios from './pages/PlanEstudios';
import Profesores from './pages/Profesores';
import Laboratorios from './pages/Laboratorios';
import Avisos from './pages/Avisos';
import Contacto from './pages/Contacto';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/carrera" element={<Carrera />} />
              <Route path="/plan-estudios" element={<PlanEstudios />} />
              <Route path="/profesores" element={<Profesores />} />
              <Route path="/laboratorios" element={<Laboratorios />} />
              <Route path="/avisos" element={<Avisos />} />
              <Route path="/contacto" element={<Contacto />} />
              <Route path="/login" element={<Login />} />
              <Route path="/admin" 
              element={
                <ProtectedRoute>
                  <AdminPanel />
                </ProtectedRoute>
              }
              />
              {/* Aquí agregaremos más rutas después */}
              <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminPanel />
                </ProtectedRoute>
              }
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App