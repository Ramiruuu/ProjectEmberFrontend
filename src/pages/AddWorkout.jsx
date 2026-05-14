import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import api from '../api/axios';
import './Dashboard.css';

const AddWorkout = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [activeNav, setActiveNav] = useState('add-workout');
    const [workoutType, setWorkoutType] = useState(searchParams.get('type') || 'running');
    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState({
        distance_km: '',
        duration_minutes: '',
        workout_date: new Date().toISOString().split('T')[0],
        location: '',
        exercise_name: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        try {
            const res = await api.get('/user');
            setUser(res.data);
        } catch (error) {
            console.error('Error fetching user:', error);
            navigate('/login');
        }
    };

    const handleNavigation = (nav) => {
        setActiveNav(nav);
        if (nav === 'logout') {
            localStorage.removeItem('token');
            navigate('/login');
        } else {
            navigate(`/${nav}`);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            if (workoutType === 'running') {
                await api.post('/workouts/run', {
                    distance_km: parseFloat(formData.distance_km),
                    duration_minutes: parseInt(formData.duration_minutes),
                    workout_date: formData.workout_date,
                    location: formData.location,
                });
            } else {
                await api.post('/workouts/gym', {
                    exercise_name: formData.exercise_name,
                    duration_minutes: parseInt(formData.duration_minutes),
                    workout_date: formData.workout_date,
                    location: formData.location,
                });
            }
            navigate('/dashboard');
        } catch (err) {
            console.error('Error saving workout:', err);
            setError(err.response?.data?.message || 'Failed to save workout');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="dashboard-app">
            {/* Sidebar */}
            <aside className="sidebar">
                <div className="sidebar-logo">
                    <div className="logo-mark">E</div>
                    <div>
                        <div className="logo-text">Ember</div>
                        <div className="logo-sub">Fitness Tracker</div>
                    </div>
                </div>

                <div className="nav-label">Main Menu</div>
                <nav className="nav-items">
                    <div className={`nav-item ${activeNav === 'dashboard' ? 'active' : ''}`} onClick={() => handleNavigation('dashboard')}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2h-5v-8H7v8H5a2 2 0 0 1-2-2z" /></svg>
                        <span>Dashboard</span>
                    </div>
                    <div className={`nav-item ${activeNav === 'workouts' ? 'active' : ''}`} onClick={() => handleNavigation('workouts')}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H5.78a1.65 1.65 0 0 0-1.51 1 1.65 1.65 0 0 0 .33 1.82l.03.03A10 10 0 0 0 12 17.66a10 10 0 0 0 6.37-2.63z" /></svg>
                        <span>Workouts</span>
                    </div>
                    <div className={`nav-item ${activeNav === 'add-workout' ? 'active' : ''}`} onClick={() => handleNavigation('add-workout')}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                        <span>Add Workout</span>
                    </div>
                    <div className={`nav-item ${activeNav === 'analytics' ? 'active' : ''}`} onClick={() => handleNavigation('analytics')}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>
                        <span>Analytics</span>
                    </div>
                    <div className={`nav-item ${activeNav === 'profile' ? 'active' : ''}`} onClick={() => handleNavigation('profile')}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                        <span>Profile</span>
                    </div>
                    <div className="nav-item" onClick={() => handleNavigation('logout')}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
                        <span>Logout</span>
                    </div>
                </nav>

                <div className="sidebar-spacer"></div>
                <div className="sidebar-user">
                    <div className="user-avatar">{user ? user.name.split(' ').map(n => n[0]).join('') : ''}</div>
                    <div className="user-info">
                        <div className="user-name">{user ? user.name : 'Loading...'}</div>
                        <div className="user-email">{user ? user.email : ''}</div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="main">
                <div className="header">
                    <div className="header-left">
                        <h1>Add New Workout</h1>
                        <p>Log your fitness activity</p>
                    </div>
                </div>

                <div className="form-card">
                    <div className="workout-type-selector">
                        <button className={`type-btn ${workoutType === 'running' ? 'active' : ''}`} onClick={() => setWorkoutType('running')}>Running</button>
                        <button className={`type-btn ${workoutType === 'gym' ? 'active' : ''}`} onClick={() => setWorkoutType('gym')}>Gym Workout</button>
                    </div>

                    <form onSubmit={handleSubmit} className="workout-form">
                        {workoutType === 'running' && (
                            <>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Distance (km)</label>
                                        <input type="number" step="0.1" name="distance_km" placeholder="5.0" value={formData.distance_km} onChange={handleChange} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Duration (minutes)</label>
                                        <input type="number" name="duration_minutes" placeholder="30" value={formData.duration_minutes} onChange={handleChange} required />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Workout Date</label>
                                        <input type="date" name="workout_date" value={formData.workout_date} onChange={handleChange} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Location (optional)</label>
                                        <input type="text" name="location" placeholder="Park, Gym, etc." value={formData.location} onChange={handleChange} />
                                    </div>
                                </div>
                            </>
                        )}

                        {workoutType === 'gym' && (
                            <>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Exercise Name</label>
                                        <input type="text" name="exercise_name" placeholder="Bench Press, Squats, etc." value={formData.exercise_name} onChange={handleChange} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Duration (minutes)</label>
                                        <input type="number" name="duration_minutes" placeholder="20" value={formData.duration_minutes} onChange={handleChange} required />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Workout Date</label>
                                        <input type="date" name="workout_date" value={formData.workout_date} onChange={handleChange} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Location (optional)</label>
                                        <input type="text" name="location" placeholder="Home Gym, Fitness Center, etc." value={formData.location} onChange={handleChange} />
                                    </div>
                                </div>
                            </>
                        )}

                        {error && <div className="error-message">{error}</div>}

                        <div className="form-actions">
                            <button type="submit" className="btn-primary" disabled={loading}>
                                {loading ? 'Saving...' : 'Save Workout'}
                            </button>
                            <button type="button" className="btn-outline" onClick={() => navigate('/dashboard')}>Cancel</button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default AddWorkout;