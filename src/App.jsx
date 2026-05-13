import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <Navbar />
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
        {/* Temporary routes for navigation links */}
        <Route path="/workouts" element={<ProtectedRoute><div>Workouts - Coming Soon</div></ProtectedRoute>} />
        <Route path="/add-workout" element={<ProtectedRoute><div>Add Workout - Coming Soon</div></ProtectedRoute>} />
        <Route path="/analytics" element={<ProtectedRoute><div>Analytics - Coming Soon</div></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><div>Profile - Coming Soon</div></ProtectedRoute>} />
        <Route path="/" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
