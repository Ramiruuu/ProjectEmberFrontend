import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <div className="app-container">
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
    </div>
  );
}

export default App;