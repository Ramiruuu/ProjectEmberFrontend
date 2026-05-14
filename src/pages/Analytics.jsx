import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import api from '../api/axios';
import LoadingSpinner from '../components/LoadingSpinner';
import './Dashboard.css';

const Analytics = () => {
    const navigate = useNavigate();
    const [activeNav, setActiveNav] = useState('analytics');
    const [timeRange, setTimeRange] = useState('week');
    const [user, setUser] = useState(null);
    const [workouts, setWorkouts] = useState([]);
    const [loading, setLoading] = useState(true);

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

    const totalWorkouts = workouts.length;
    const totalTime = workouts.reduce((sum, w) => sum + w.duration_minutes, 0);
    const totalCalories = workouts.reduce((sum, w) => sum + parseFloat(w.calories_burned), 0);
    const totalDistance = workouts.filter(w => w.type === 'run').reduce((sum, w) => sum + (w.details?.distance_km || 0), 0);

    const stats = [
        { label: 'Total Workouts', value: totalWorkouts.toString(), sub: 'all time' },
        { label: 'Total Time', value: `${(totalTime / 60).toFixed(1)} hrs`, sub: 'active minutes' },
        { label: 'Total Calories', value: totalCalories.toFixed(0), sub: 'calories burned' },
        { label: 'Total Distance', value: `${totalDistance.toFixed(0)} km`, sub: 'distance covered' },
    ];

    // Generate last 7 days
    const last7Days = Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (6 - i));
        return date.toISOString().split('T')[0];
    });

    // Calculate daily calories burned
    const dailyCalories = last7Days.map(date => {
        const dayWorkouts = workouts.filter(w => w.workout_date === date);
        const totalCalories = dayWorkouts.reduce((sum, w) => sum + parseFloat(w.calories_burned), 0);
        return {
            day: new Date(date).toLocaleDateString('en', { weekday: 'short' }),
            calories: totalCalories
        };
    });

    const handleNavigation = (nav) => {
        setActiveNav(nav);
        if (nav === 'logout') {
            localStorage.removeItem('token');
            navigate('/login');
        } else {
            navigate(`/${nav}`);
        }
    };

    const maxCalories = Math.max(...dailyCalories.map(d => d.calories)) || 500;

    return (
        <div className="dashboard-app">
            <aside className="sidebar">
                <div className="sidebar-logo">
                    <div className="logo-mark">E</div>
                    <div><div className="logo-text">Ember</div><div className="logo-sub">Fitness Tracker</div></div>
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

            <main className="main">
                <div className="header">
                    <div className="header-left">
                        <h1>Analytics</h1>
                        <p>Track your progress and performance</p>
                    </div>
                    <div className="time-range-selector">
                        <button className={`range-btn ${timeRange === 'week' ? 'active' : ''}`} onClick={() => setTimeRange('week')}>Week</button>
                        <button className={`range-btn ${timeRange === 'month' ? 'active' : ''}`} onClick={() => setTimeRange('month')}>Month</button>
                        <button className={`range-btn ${timeRange === 'year' ? 'active' : ''}`} onClick={() => setTimeRange('year')}>Year</button>
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

                <div className="chart-card">
                    <div className="card-title">Daily Calories Burned (Last 7 Days)</div>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={dailyCalories}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="day" />
                            <YAxis />
                            <Tooltip formatter={(value) => [`${value} cal`, 'Calories Burned']} />
                            <Bar dataKey="calories" fill="#667eea" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="mid-row">
                    <div className="compare-card">
                        <div className="card-title">Best Performance</div>
                        <div className="best-stats">
                            <div className="best-item">
                                <span className="best-label">Most Active Day</span>
                                <span className="best-value">Saturday</span>
                                <span className="best-sub">12.5 km + 5.3 sets</span>
                            </div>
                            <div className="best-item">
                                <span class="best-label">Highest Calories</span>
                                <span className="best-value">520 cal</span>
                                <span className="best-sub">Long Run (10km)</span>
                            </div>
                            <div className="best-item">
                                <span class="best-label">Best Streak</span>
                                <span className="best-value">5 days</span>
                                <span className="best-sub">Jan 10 - Jan 15</span>
                            </div>
                        </div>
                    </div>

                    <div className="insight-card">
                        <div className="card-title">AI Insight</div>
                        <div className="insight-box">
                            <div className="insight-label">Weekly Summary</div>
                            <div className="insight-text">You've been consistent with your running routine! Running is 33% more efficient than gym workouts. Try adding one more gym session to balance your muscle groups.</div>
                        </div>
                        <div className="insight-box" style={{ marginTop: '16px' }}>
                            <div className="insight-label">Recommendation</div>
                            <div className="insight-text">Based on your progress, aim for 4 workouts this week. You're on track to beat your monthly goal!</div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Analytics;