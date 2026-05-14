import { Routes, Route, useLocation } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';

function App() {
  const location = useLocation();
  
  // Check if current page is landing/login/register (no navbar, light theme)
  const isPublicPage = ['/', '/login', '/register'].includes(location.pathname);
  const hideNavbarOnPages = isPublicPage;

  // Add auth-app class ONLY for authenticated pages
  const appClassName = !isPublicPage ? "auth-app" : "";

  return (
    <div className={appClassName}>
      <div className="app-shell">
        {!hideNavbarOnPages && <Navbar />}
        <main className="page-content">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route path="/workouts" element={<ProtectedRoute><div className="placeholder-page">Workouts - Coming Soon</div></ProtectedRoute>} />
            <Route path="/add-workout" element={<ProtectedRoute><div className="placeholder-page">Add Workout - Coming Soon</div></ProtectedRoute>} />
            <Route path="/analytics" element={<ProtectedRoute><div className="placeholder-page">Analytics - Coming Soon</div></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><div className="placeholder-page">Profile - Coming Soon</div></ProtectedRoute>} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;