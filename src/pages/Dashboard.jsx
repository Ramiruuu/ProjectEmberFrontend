import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import LoadingSpinner from '../components/LoadingSpinner';
import './Dashboard.css';

const Dashboard = () => {
    const navigate = useNavigate();
    const [activeNav, setActiveNav] = useState('dashboard');
    const [user, setUser] = useState(null);
    const [workouts, setWorkouts] = useState([]);
    const [comparison, setComparison] = useState({ running: 0, gym: 0 });
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [userRes, workoutsRes, compRes] = await Promise.all([
                api.get('/user'),
                api.get('/workouts'),
                api.get('/comparison')
            ]);
            setUser(userRes.data);
            setWorkouts(workoutsRes.data);
            setComparison(compRes.data);
        } catch (error) {
            console.error('Error fetching data:', error);
            if (error.response?.status === 401) {
                localStorage.removeItem('token');
                navigate('/login');
            }
        } finally {
            setLoading(false);
        }
    };

    const totalCalories = workouts.reduce((sum, w) => sum + parseFloat(w.calories_burned), 0);
    const runningEfficiency = comparison.running;
    const gymEfficiency = comparison.gym;
    const pct = gymEfficiency > 0 ? Math.round(((runningEfficiency - gymEfficiency) / gymEfficiency) * 100) : 0;

    const stats = [
        { label: 'Total Calories', value: totalCalories.toFixed(0), sub: 'cal this week' },
        { label: 'Running Efficiency', value: runningEfficiency.toFixed(1), sub: 'cal/min avg' },
        { label: 'Gym Efficiency', value: gymEfficiency.toFixed(1), sub: 'cal/min avg' },
        { label: 'Total Distance', value: workouts.filter(w => w.type === 'run').reduce((sum, w) => sum + (w.details?.distance_km || 0), 0).toFixed(0), sub: 'km this month' },
    ];

    const calPerMin = [
        { label: 'Running', value: runningEfficiency, max: Math.max(runningEfficiency, gymEfficiency) + 2 },
        { label: 'Gym', value: gymEfficiency, max: Math.max(runningEfficiency, gymEfficiency) + 2 },
    ];

    const recentWorkouts = workouts.slice(0, 3).map(w => ({
        name: w.activity_name,
        duration: `${w.duration_minutes} min`,
        calories: `${w.calories_burned} cal`
    }));

    const handleNavigation = (nav) => {
        setActiveNav(nav);
        if (nav === 'logout') {
            localStorage.removeItem('token');
            navigate('/login');
        } else {
            navigate(`/${nav}`);
        }
    };

    if (loading) {
        return <LoadingSpinner />;
    }

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
                    <div className="user-avatar">{user.name.split(' ').map(n => n[0]).join('')}</div>
                    <div className="user-info">
                        <div className="user-name">{user.name}</div>
                        <div className="user-email">{user.email}</div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="main">
                <div className="header">
                    <div className="header-left">
                        <h1>Welcome back, {user.name.split(' ')[0]}</h1>
                        <p>Here's your fitness summary for today.</p>
                        <div className="member-badge">Pro Member</div>
                    </div>
                    <div className="search-bar">
                        <input type="text" placeholder="Search workouts..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                </div>

                <div className="stats-grid">
                    {stats.map((stat, index) => (
                        <div key={index} className="stat-card">
                            <div className="stat-label">{stat.label}</div>
                            <div className="stat-value">{stat.value}</div>
                            <div className="stat-sub">{stat.sub}</div>
                        </div>
                    ))}
                </div>

                <div className="mid-row">
                    <div className="compare-card">
                        <div className="card-title">Calories Per Minute Comparison</div>
                        {calPerMin.map((item) => (
                            <div className="bar-row" key={item.label}>
                                <div className="bar-meta">
                                    <span className="bar-name">{item.label}</span>
                                    <span className="bar-value">{item.value} cal/min</span>
                                </div>
                                <div className="bar-track">
                                    <div className="bar-fill" style={{ width: `${(item.value / item.max) * 100}%` }} />
                                </div>
                            </div>
                        ))}
                        <div className="insight-box">
                            <div className="insight-label">Insight</div>
                            <div className="insight-text">
                                {pct > 0 ? `Running is ${pct}% more efficient than gym workouts.` :
                                pct < 0 ? `Gym workouts are ${Math.abs(pct)}% more efficient than running.` :
                                `Running and gym workouts have similar efficiency.`}
                            </div>
                        </div>
                    </div>

                    <div className="schedule-card">
                        <div className="card-title">Recent Workouts</div>
                        {recentWorkouts.map((item, index) => (
                            <div key={index} className="schedule-item">
                                <div className="schedule-dot" />
                                <div>
                                    <div className="schedule-name">{item.name}</div>
                                    <div className="schedule-time">{item.duration} • {item.calories}</div>
                                </div>
                                <div className="schedule-arrow">→</div>
                            </div>
                        ))}
                        {recentWorkouts.length === 0 && (
                            <div className="no-workouts">No workouts yet. Add your first workout!</div>
                        )}
                    </div>
                </div>

                <div className="table-card">
                    <div className="table-header">
                        <div className="card-title">Recent Activities</div>
                        <button className="btn-outline" style={{ padding: '8px 16px', fontSize: 12 }}>View All</button>
                    </div>
                    <table className="activities-table">
                        <thead>
                            <tr><th>Activity</th><th>Duration</th><th>Calories</th><th>Actions</th></tr>
                        </thead>
                        <tbody>
                            {recentWorkouts.map((row, index) => (
                                <tr key={index}>
                                    <td data-label="Activity"><div className="act-name">{row.name}</div></td>
                                    <td data-label="Duration"><span className="dur-badge">{row.duration}</span></td>
                                    <td data-label="Calories"><span className="cal-badge">{row.calories}</span></td>
                                    <td data-label="Actions"><button className="action-btn">Edit</button><button className="action-btn delete">Delete</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="actions-row">
                    <button className="btn-primary" onClick={() => navigate('/add-workout?type=run')}>Add Run</button>
                    <button className="btn-primary" onClick={() => navigate('/add-workout?type=gym')}>Add Gym Workout</button>
                    <button className="btn-outline">Export Report</button>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;