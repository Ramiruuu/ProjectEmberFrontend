import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import './Dashboard.css';

const Profile = () => {
    const navigate = useNavigate();
    const [activeNav, setActiveNav] = useState('profile');
    const [isEditing, setIsEditing] = useState(false);
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState({
        name: '',
        email: '',
        weight_kg: '',
        age: '',
        gender: '',
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        try {
            const res = await api.get('/user');
            setUser(res.data);
            setProfile({
                name: res.data.name,
                email: res.data.email,
                weight_kg: res.data.weight_kg,
                age: res.data.age,
                gender: res.data.gender,
            });
        } catch (error) {
            console.error('Error fetching user:', error);
            navigate('/login');
        } finally {
            setLoading(false);
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
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const res = await api.put('/user', profile);
            setUser(res.data);
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating profile:', error);
        } finally {
            setSaving(false);
        }
    };

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
                        <h1>My Profile</h1>
                        <p>Manage your personal information and fitness settings</p>
                    </div>
                    <button className={isEditing ? "btn-outline" : "btn-primary"} onClick={() => isEditing ? handleSave() : setIsEditing(true)} disabled={saving}>
                        {saving ? 'Saving...' : isEditing ? 'Save Changes' : 'Edit Profile'}
                    </button>
                </div>

                <div className="profile-card">
                    <div className="profile-avatar">
                        <div className="large-avatar">{user ? user.name.split(' ').map(n => n[0]).join('') : ''}</div>
                        {isEditing && <button className="avatar-edit-btn">Change Photo</button>}
                    </div>

                    <div className="profile-form">
                        <div className="form-row">
                            <div className="form-group">
                                <label>Full Name</label>
                                <input type="text" name="name" value={profile.name} onChange={handleChange} disabled={!isEditing} />
                            </div>
                            <div className="form-group">
                                <label>Email Address</label>
                                <input type="email" name="email" value={profile.email} onChange={handleChange} disabled />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Weight (kg)</label>
                                <input type="number" name="weight_kg" value={profile.weight_kg} onChange={handleChange} disabled={!isEditing} />
                            </div>
                            <div className="form-group">
                                <label>Age</label>
                                <input type="number" name="age" value={profile.age} onChange={handleChange} disabled={!isEditing} />
                            </div>
                            <div className="form-group">
                                <label>Gender</label>
                                <select name="gender" value={profile.gender} onChange={handleChange} disabled={!isEditing}>
                                    <option value="female">Female</option>
                                    <option value="male">Male</option>
                                </select>
                            </div>
                        </div>

                        {!isEditing && (
                            <div className="profile-stats">
                                <h3>Account Statistics</h3>
                                <div className="stats-mini-grid">
                                    <div><span>Member since</span><strong>January 2025</strong></div>
                                    <div><span>Total workouts</span><strong>24</strong></div>
                                    <div><span>Current streak</span><strong>5 days</strong></div>
                                    <div><span>Longest streak</span><strong>12 days</strong></div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Profile;