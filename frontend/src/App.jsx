import './styles/global.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PublicView from './pages/PublicView';
import Login from './pages/Login';
import AdminView from './pages/AdminView';
import ModeratorView from './pages/ModeratorView';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PublicView />} />
        <Route path="/login" element={<Login />} />
        
        <Route path="/admin" element={
            <ProtectedRoute roleId={1}>
                <AdminView />
            </ProtectedRoute>
        } />
        
        <Route path="/moderator" element={
            <ProtectedRoute roleId={2}>
                <ModeratorView />
            </ProtectedRoute>
        } />
        
        <Route path="/fan" element={
            <ProtectedRoute roleId={3}>
                <Dashboard />
            </ProtectedRoute>
        } />

        {/* Fallback de rutas no existentes al landing page */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;