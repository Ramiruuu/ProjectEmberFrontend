import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import './Dashboard.css';

const Workouts = () => {
    const navigate = useNavigate();
    const [activeNav, setActiveNav] = useState('workouts');
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('all');
    const [user, setUser] = useState(null);
    const [workouts, setWorkouts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingWorkout, setEditingWorkout] = useState(null);
    const [editForm, setEditForm] = useState({ duration_minutes: '', workout_date: '' });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [userRes, workoutsRes] = await Promise.all([
                api.get('/user'),
                api.get('/workouts')
            ]);
            setUser(userRes.data);
            setWorkouts(workoutsRes.data);
        } catch (error) {
            console.error('Error fetching data:', error);
            if (error.response?.status === 401) {
                navigate('/login');
            }
        } finally {
            setLoading(false);
        }
    };

    const filteredWorkouts = filter === 'all' ? workouts : workouts.filter(w => w.type === filter);

    const handleNavigation = (nav) => {
        setActiveNav(nav);
        if (nav === 'logout') {
            localStorage.removeItem('token');
            navigate('/login');
        } else {
            navigate(`/${nav}`);
        }
    };

    const handleEdit = (workout) => {
        setEditingWorkout(workout);
        setEditForm({
            duration_minutes: workout.duration_minutes,
            workout_date: workout.workout_date,
        });
    };

    const handleUpdate = async () => {
        try {
            await api.put(`/workouts/${editingWorkout.id}`, editForm);
            setEditingWorkout(null);
            fetchData(); // Refresh data
        } catch (error) {
            console.error('Error updating workout:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this workout?')) {
            try {
                await api.delete(`/workouts/${id}`);
                fetchData(); // Refresh data
            } catch (error) {
                console.error('Error deleting workout:', error);
            }
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
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2h-5v-8H7v8H5a2 2 0 0 1-2-2z" />
                        </svg>
                        <span>Dashboard</span>
                    </div>
                    <div className={`nav-item ${activeNav === 'workouts' ? 'active' : ''}`} onClick={() => handleNavigation('workouts')}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <circle cx="12" cy="12" r="3" />
                            <path d="M19.4 15a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H5.78a1.65 1.65 0 0 0-1.51 1 1.65 1.65 0 0 0 .33 1.82l.03.03A10 10 0 0 0 12 17.66a10 10 0 0 0 6.37-2.63z" />
                        </svg>
                        <span>Workouts</span>
                    </div>
                    <div className={`nav-item ${activeNav === 'add-workout' ? 'active' : ''}`} onClick={() => handleNavigation('add-workout')}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                        <span>Add Workout</span>
                    </div>
                    <div className={`nav-item ${activeNav === 'analytics' ? 'active' : ''}`} onClick={() => handleNavigation('analytics')}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <line x1="18" y1="20" x2="18" y2="10" />
                            <line x1="12" y1="20" x2="12" y2="4" />
                            <line x1="6" y1="20" x2="6" y2="14" />
                        </svg>
                        <span>Analytics</span>
                    </div>
                    <div className={`nav-item ${activeNav === 'profile' ? 'active' : ''}`} onClick={() => handleNavigation('profile')}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                        </svg>
                        <span>Profile</span>
                    </div>
                    <div className="nav-item" onClick={() => handleNavigation('logout')}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                            <polyline points="16 17 21 12 16 7" />
                            <line x1="21" y1="12" x2="9" y2="12" />
                        </svg>
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
                        <h1>My Workouts</h1>
                        <p>Track and manage all your fitness activities</p>
                    </div>
                    <div className="search-bar">
                        <input type="text" placeholder="Search workouts..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                </div>

                {/* Filter Tabs */}
                <div className="filter-tabs">
                    <button className={`filter-tab ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>All Workouts</button>
                    <button className={`filter-tab ${filter === 'run' ? 'active' : ''}`} onClick={() => setFilter('run')}>Running</button>
                    <button className={`filter-tab ${filter === 'gym' ? 'active' : ''}`} onClick={() => setFilter('gym')}>Gym</button>
                </div>

                {/* Workouts List */}
                <div className="workouts-list">
                    {loading ? (
                        <div>Loading workouts...</div>
                    ) : filteredWorkouts.length === 0 ? (
                        <div>No workouts found. Add your first workout!</div>
                    ) : (
                        filteredWorkouts.map((workout) => (
                            <div key={workout.id} className="workout-card">
                                <div className="workout-header">
                                    <div>
                                        <h3 className="workout-name">{workout.activity_name}</h3>
                                        <span className="workout-date">{new Date(workout.workout_date).toLocaleDateString()}</span>
                                    </div>
                                    <div className={`workout-type-badge ${workout.type}`}>
                                        {workout.type === 'run' ? 'Running' : 'Gym'}
                                    </div>
                                </div>
                                <div className="workout-stats">
                                    <div className="workout-stat">
                                        <span className="stat-icon">⏱️</span>
                                        <span>{workout.duration_minutes} min</span>
                                    </div>
                                    <div className="workout-stat">
                                        <span className="stat-icon">🔥</span>
                                        <span>{workout.calories_burned} cal</span>
                                    </div>
                                    {workout.type === 'run' && workout.details?.distance_km && (
                                        <div className="workout-stat">
                                            <span className="stat-icon">📏</span>
                                            <span>{workout.details.distance_km} km</span>
                                        </div>
                                    )}
                                    {workout.details?.location && (
                                        <div className="workout-stat">
                                            <span className="stat-icon">📍</span>
                                            <span>{workout.details.location}</span>
                                        </div>
                                    )}
                                </div>
                                <div className="workout-actions">
                                    <button className="action-btn edit" onClick={() => handleEdit(workout)}>Edit</button>
                                    <button className="action-btn delete" onClick={() => handleDelete(workout.id)}>Delete</button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Edit Modal */}
                {editingWorkout && (
                    <div className="modal-overlay" onClick={() => setEditingWorkout(null)}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <h3>Edit Workout</h3>
                            <div className="form-group">
                                <label>Duration (minutes)</label>
                                <input
                                    type="number"
                                    value={editForm.duration_minutes}
                                    onChange={(e) => setEditForm({ ...editForm, duration_minutes: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label>Workout Date</label>
                                <input
                                    type="date"
                                    value={editForm.workout_date}
                                    onChange={(e) => setEditForm({ ...editForm, workout_date: e.target.value })}
                                />
                            </div>
                            <div className="modal-actions">
                                <button className="btn-outline" onClick={() => setEditingWorkout(null)}>Cancel</button>
                                <button className="btn-primary" onClick={handleUpdate}>Update</button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Workouts;