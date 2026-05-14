import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import '../styles/login.css';

const FlameIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
  </svg>
);

const EyeIcon = ({ open }) => (
  open ? (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
    </svg>
  ) : (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  )
);

const ArrowRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);

// Modern icons for gender selection
const MaleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="10" cy="14" r="6"/>
    <line x1="14" y1="10" x2="20" y2="4"/>
    <polyline points="16 4 20 4 20 8"/>
  </svg>
);

const FemaleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="6"/>
    <line x1="12" y1="18" x2="12" y2="22"/>
    <line x1="9" y1="22" x2="15" y2="22"/>
  </svg>
);

const OtherIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="4"/>
    <path d="M5.5 20c.8-3 3.5-5 6.5-5s5.7 2 6.5 5"/>
    <circle cx="17" cy="17" r="3"/>
  </svg>
);

// Success icon for password strength
const CheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    weight_kg: '',
    age: '',
    gender: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [focusedField, setFocusedField] = useState(null);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Password strength checker
    if (name === 'password') {
      let strength = 0;
      if (value.length >= 6) strength++;
      if (value.match(/[a-z]/) && value.match(/[A-Z]/)) strength++;
      if (value.match(/[0-9]/)) strength++;
      if (value.match(/[^a-zA-Z0-9]/)) strength++;
      setPasswordStrength(strength);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const response = await api.post('/register', formData);
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (err) {
      console.error('Registration error:', err);
      setError('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getGenderIcon = (value) => {
    if (value === 'male') return <MaleIcon />;
    if (value === 'female') return <FemaleIcon />;
    if (value === 'other') return <OtherIcon />;
    return null;
  };

  return (
    <div className="login-root">

      {/* ── LEFT: Registration Form Section ── */}
      <main className="login-form-section">
        <div className="form-card register-card">

          <div className="form-header">
            <h2 className="form-title">Create an account</h2>
            <p className="form-subtitle">Join Ember to start tracking your fitness journey</p>
          </div>

          {/* Error */}
          {error && (
            <div className="error-banner" role="alert">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="login-form" noValidate>

            {/* Full Name */}
            <div className="field-group">
              <label htmlFor="name" className="field-label">Full name</label>
              <div className={`field-wrap ${focusedField === 'name' ? 'field-focused' : ''}`}>
                <svg className="field-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                </svg>
                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Juan Dela Cruz"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  required
                  autoComplete="name"
                  className="field-input"
                />
              </div>
            </div>

            {/* Email */}
            <div className="field-group">
              <label htmlFor="email" className="field-label">Email address</label>
              <div className={`field-wrap ${focusedField === 'email' ? 'field-focused' : ''}`}>
                <svg className="field-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                </svg>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  required
                  autoComplete="email"
                  className="field-input"
                />
              </div>
            </div>

            {/* Password with strength meter */}
            <div className="field-group">
              <label htmlFor="password" className="field-label">Password</label>
              <div className={`field-wrap ${focusedField === 'password' ? 'field-focused' : ''}`}>
                <svg className="field-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  required
                  autoComplete="new-password"
                  className="field-input field-input--password"
                />
                <button
                  type="button"
                  className="eye-btn"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  <EyeIcon open={showPassword} />
                </button>
              </div>
              
              {/* Password strength meter */}
              {formData.password && (
                <div className="password-strength">
                  <div className="strength-bars">
                    {[1, 2, 3, 4].map((level) => (
                      <div 
                        key={level}
                        className={`strength-bar ${passwordStrength >= level ? `strength-level-${level}` : ''}`}
                      />
                    ))}
                  </div>
                  <span className="strength-text">
                    {passwordStrength === 0 && 'Weak password'}
                    {passwordStrength === 1 && 'Fair password'}
                    {passwordStrength === 2 && 'Good password'}
                    {passwordStrength === 3 && 'Strong password'}
                    {passwordStrength === 4 && 'Very strong password'}
                  </span>
                </div>
              )}
            </div>

            {/* Weight and Age Row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div className="field-group">
                <label htmlFor="weight_kg" className="field-label">Weight (kg)</label>
                <div className={`field-wrap ${focusedField === 'weight' ? 'field-focused' : ''}`}>
                  <svg className="field-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4"/>
                  </svg>
                  <input
                    id="weight_kg"
                    type="number"
                    name="weight_kg"
                    placeholder="70"
                    value={formData.weight_kg}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('weight')}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="field-input"
                  />
                </div>
              </div>

              <div className="field-group">
                <label htmlFor="age" className="field-label">Age</label>
                <div className={`field-wrap ${focusedField === 'age' ? 'field-focused' : ''}`}>
                  <svg className="field-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                  </svg>
                  <input
                    id="age"
                    type="number"
                    name="age"
                    placeholder="25"
                    value={formData.age}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('age')}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="field-input"
                  />
                </div>
              </div>
            </div>

            {/* Gender with modern icons */}
            <div className="field-group">
              <label htmlFor="gender" className="field-label">Gender</label>
              <div className={`gender-select-wrapper ${focusedField === 'gender' ? 'field-focused' : ''}`}>
                <div className="gender-icons">
                  <button
                    type="button"
                    className={`gender-option ${formData.gender === 'male' ? 'gender-selected' : ''}`}
                    onClick={() => setFormData({ ...formData, gender: 'male' })}
                  >
                    <MaleIcon />
                    <span>Male</span>
                  </button>
                  <button
                    type="button"
                    className={`gender-option ${formData.gender === 'female' ? 'gender-selected' : ''}`}
                    onClick={() => setFormData({ ...formData, gender: 'female' })}
                  >
                    <FemaleIcon />
                    <span>Female</span>
                  </button>
                  <button
                    type="button"
                    className={`gender-option ${formData.gender === 'other' ? 'gender-selected' : ''}`}
                    onClick={() => setFormData({ ...formData, gender: 'other' })}
                  >
                    <OtherIcon />
                    <span>Other</span>
                  </button>
                </div>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('gender')}
                  onBlur={() => setFocusedField(null)}
                  required
                  className="gender-select-hidden"
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className={`submit-btn submit-register ${isLoading ? 'submit-btn--loading' : ''}`}
            >
              {isLoading ? (
                <>
                  <span className="spinner" aria-hidden="true" />
                  Creating account...
                </>
              ) : (
                <>
                  Create account
                  <ArrowRightIcon />
                </>
              )}
            </button>
          </form>

          <p className="register-cta">
            Already have an account?{' '}
            <Link to="/login" className="register-link">Sign in →</Link>
          </p>
        </div>
      </main>

      {/* ── RIGHT: Dark branding panel ── */}
      <aside className="login-panel">
        <div className="panel-glow panel-glow--top" aria-hidden="true" />
        <div className="panel-glow panel-glow--bottom" aria-hidden="true" />
        <div className="panel-grid" aria-hidden="true" />

        <div className="panel-inner">
          <div className="panel-logo">
            <div className="logo-mark">
              <FlameIcon />
            </div>
            <span className="logo-name">Ember</span>
            <span className="logo-badge">v2.0</span>
          </div>

          <div className="panel-headline">
            <h1 className="headline-text">
              Start your<br />
              <span className="headline-accent">fitness journey.</span>
            </h1>
            <p className="headline-sub">
              Track running and gym workouts. Compare your results. Know what works for your body.
            </p>
          </div>

          <div className="panel-stats">
            <div className="stat-pill">
              <span className="stat-num">10k+</span>
              <span className="stat-label">Active Users</span>
            </div>
            <div className="stat-divider" aria-hidden="true" />
            <div className="stat-pill">
              <span className="stat-num">4.8★</span>
              <span className="stat-label">Rating</span>
            </div>
            <div className="stat-divider" aria-hidden="true" />
            <div className="stat-pill">
              <span className="stat-num">₱0</span>
              <span className="stat-label">To start</span>
            </div>
          </div>

          <div className="panel-testimonial">
            <div className="testimonial-stars">
              {[...Array(5)].map((_, i) => (
                <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#FAC775">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
              ))}
            </div>
            <p className="testimonial-quote">
              "Ember helped me understand which workouts actually work for my body. No more guessing!"
            </p>
            <div className="testimonial-author">
              <div className="author-avatar" aria-hidden="true">JD</div>
              <div>
                <p className="author-name">Juan Dela Cruz</p>
                <p className="author-role">Lost 15 lbs in 4 months</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Register;