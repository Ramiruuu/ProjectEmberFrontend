import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
    return (
        <div className="landing-page">
            {/* Navigation */}
            <nav className="landing-nav">
                <div className="nav-brand">EMBER</div>
                <div className="nav-links">
                    <a href="#features">Features</a>
                    <a href="#how-it-works">How It Works</a>
                    <a href="#pricing">Pricing</a>
                </div>
                <Link to="/register" className="nav-cta">Get Started</Link>
            </nav>

            {/* Hero Section */}
            <section className="hero">
                <h1 className="hero-title">Stop guessing which workout works.</h1>
                <p className="hero-subtext">
                    Ember merges your running and gym data in one place. Then it tells you exactly
                    which workout burned more calories per minute.
                </p>
                <div className="hero-buttons">
                    <Link to="/register" className="btn-primary">Get Started Free</Link>
                    <a href="#features" className="btn-secondary">Learn More</a>
                </div>
            </section>

            {/* Problem Section */}
            <section id="features" className="section">
                <div className="container">
                    <h2 className="section-title">The problem with fitness apps</h2>
                    <p className="section-subtitle">They keep your data separated. You can't compare what actually works.</p>

                    <div className="grid-3">
                        <div className="card">
                            <h3>Data is fragmented</h3>
                            <p>Running in one app, gym in another. No clear picture.</p>
                        </div>
                        <div className="card">
                            <h3>Calories are wrong</h3>
                            <p>Studies show fitness apps miss by up to 25%.</p>
                        </div>
                        <div className="card">
                            <h3>Users quit fast</h3>
                            <p>70% abandon fitness apps within 81 days.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section id="how-it-works" className="section bg-light">
                <div className="container">
                    <h2 className="section-title">How Ember works</h2>
                    <p className="section-subtitle">We put everything in one place and make the comparison obvious.</p>

                    <div className="comparison-box">
                        <div className="comparison-left">
                            <h3>Side-by-side comparison</h3>
                            <p>Running and gym workouts in one view. Instantly see which one burned more per minute.</p>
                            <div className="stats-mini">
                                <div className="stat-row">
                                    <span className="stat-label">Running</span>
                                    <span className="stat-value">11.2 cal/min</span>
                                </div>
                                <div className="stat-row">
                                    <span className="stat-label">Gym session</span>
                                    <span className="stat-value">8.4 cal/min</span>
                                </div>
                            </div>
                        </div>
                        <div className="comparison-right">
                            <div className="chart-placeholder">Comparison Chart</div>
                        </div>
                    </div>

                    <div className="steps">
                        <div className="step">
                            <div className="step-number">1</div>
                            <h4>Log your workout</h4>
                            <p>Running or gym. Takes 10 seconds.</p>
                        </div>
                        <div className="step">
                            <div className="step-number">2</div>
                            <h4>We calculate</h4>
                            <p>Calories burned per minute.</p>
                        </div>
                        <div className="step">
                            <div className="step-number">3</div>
                            <h4>Get insight</h4>
                            <p>Which workout is better for you.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="section">
                <div className="container">
                    <h2 className="section-title">Features built for clarity</h2>

                    <div className="grid-2">
                        <div className="feature">
                            <h3>Track everything</h3>
                            <p>Running distance and time. Gym exercises and sets. All tracked with precision.</p>
                        </div>
                        <div className="feature">
                            <h3>Smart comparisons</h3>
                            <p>Calories per minute. Weekly best. Monthly trends. See patterns in your data.</p>
                        </div>
                        <div className="feature">
                            <h3>Instant insights</h3>
                            <p>Ember analyzes your workouts and tells you what's working in plain English.</p>
                        </div>
                        <div className="feature">
                            <h3>Your privacy</h3>
                            <p>Your data stays private. We don't sell anything.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="section bg-light">
                <div className="container">
                    <h2 className="section-title">Why fitness matters now</h2>

                    <div className="stats">
                        <div className="stat">
                            <div className="stat-number">$70 Billion</div>
                            <p>Global fitness market by 2026</p>
                        </div>
                        <div className="stat">
                            <div className="stat-number">81 days</div>
                            <p>Average user retention period</p>
                        </div>
                        <div className="stat">
                            <div className="stat-number">25%</div>
                            <p>Typical calorie tracking error</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="section">
                <div className="container">
                    <h2 className="section-title">Real users, real results</h2>

                    <div className="testimonials">
                        <div className="testimonial">
                            <p>"I finally know which workout actually works. Ember told me running burns more per minute."</p>
                            <span>— Sarah, 28</span>
                        </div>
                        <div className="testimonial">
                            <p>"I used to log runs in one app and gym in another. Ember puts everything together. Game changer."</p>
                            <span>— Mike, 34</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="container">
                    <h2>Ready to know your truth?</h2>
                    <p>Join thousands who finally understand which workout works best for their body.</p>
                    <Link to="/register" className="btn-primary btn-large">Get Started — It's Free</Link>
                    <p className="cta-note">No credit card. No spam. Just real results.</p>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <div className="footer-content">
                    <div className="footer-col">
                        <h4>EMBER</h4>
                        <p>Merge your run. Burn your calories. Know your result.</p>
                    </div>
                    <div className="footer-col">
                        <h4>Product</h4>
                        <a href="#features">Features</a>
                        <a href="#how-it-works">How It Works</a>
                        <a href="#pricing">Pricing</a>
                    </div>
                    <div className="footer-col">
                        <h4>Legal</h4>
                        <a href="#">Privacy</a>
                        <a href="#">Terms</a>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>© 2026 Ember. Built for USTP WebSys Final Project.</p>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;