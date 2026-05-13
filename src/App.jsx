import { Routes, Route, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';

function App() {
  const location = useLocation();
  const hideNavbarOnDashboard = location.pathname.startsWith('/dashboard');

  return (
    <div className="app-shell">
      {!hideNavbarOnDashboard && <Navbar />}
      <main className="page-content">
        <Routes>
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
          <Route path="/" element={<Login />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
