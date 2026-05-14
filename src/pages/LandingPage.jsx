import { useNavigate } from 'react-router-dom';
import './LandingPage.css';
import { useEffect, useRef } from 'react';

const LandingPage = () => {
    const navigate = useNavigate();
    const sectionsRef = useRef([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('section-visible');
                    }
                });
            },
            { threshold: 0.1 }
        );

        sectionsRef.current.forEach((section) => {
            if (section) observer.observe(section);
        });

        return () => observer.disconnect();
    }, []);

    const addToRefs = (el, index) => {
        if (el) sectionsRef.current[index] = el;
    };

    const handleGetStarted = () => {
        navigate('/register');
    };

    const handleLearnMore = () => {
        document.getElementById('features').scrollIntoView({ behavior: 'smooth' });
    };

    const handleSubscribe = (e) => {
        e.preventDefault();
        const email = e.target.querySelector('input').value;
        if (email) {
            alert(`Thanks for subscribing! We'll send updates to ${email}`);
            e.target.reset();
        } else {
            alert('Please enter a valid email address.');
        }
    };

    const handleContact = () => {
        alert('Send us an email at group1dev@emberfit.com or call +63 2 1234 5678');
    };

    const handleCareer = () => {
        alert('Careers page coming soon! Send your resume to careers@emberfit.com');
    };

    const handleBlog = () => {
        alert('Blog page coming soon! Check back for fitness tips and updates.');
    };

    const handleAbout = () => {
        alert('Ember Fitness was founded in 2025 to help people understand their workouts better.');
    };

    const handlePrivacy = () => {
        alert('We value your privacy. Read our full policy at emberfit.com/privacy');
    };

    const handleTerms = () => {
        alert('Terms of Service: By using Ember, you agree to our terms.');
    };

    const handleCookie = () => {
        alert('We use cookies to improve your experience.');
    };

    const handlePricingClick = (plan) => {
        if (plan === 'free') {
            navigate('/register');
        } else {
            alert(`${plan} plan selected. Payment page coming soon! Price: ${plan === 'pro' ? '₱399/month' : '₱3,499/year'}`);
        }
    };

    return (
        <div className="landing-page">
            {/* Navigation */}
            <nav className="landing-nav">
                <div className="nav-brand">
                    <div className="logo-placeholder">
                        <img src="/logo.png" alt="Ember Logo" className="logo-image" onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.parentElement.classList.add('logo-text-only');
                        }} />
                        <span className="logo-text">EMBER</span>
                    </div>
                </div>
                <div className="nav-links">
                    <a href="#features">Features</a>
                    <a href="#how-it-works">How It Works</a>
                    <a href="#pricing-section">Pricing</a>
                    <a href="#faq">FAQ</a>
                    <a href="#" onClick={handleContact}>Contact</a>
                </div>
                <button onClick={handleGetStarted} className="nav-cta">Get Started</button>
            </nav>

            {/* Hero Section */}
            <section className="hero scroll-section" ref={(el) => addToRefs(el, 0)}>
                <h1 className="hero-title">Stop guessing which workout works.</h1>
                <p className="hero-subtext">
                    Ember merges your running and gym data in one place. Then it tells you exactly
                    which workout burned more calories per minute.
                </p>
                <div className="hero-buttons">
                    <button onClick={handleGetStarted} className="btn-primary">Get Started Free</button>
                    <button onClick={handleLearnMore} className="btn-secondary">Learn More</button>
                </div>
            </section>

            {/* Problem Section */}
            <section id="features" className="section scroll-section" ref={(el) => addToRefs(el, 1)}>
                <div className="container">
                    <h2 className="section-title">The problem with fitness apps</h2>
                    <p className="section-subtitle">They keep your data separated. You can't compare what actually works.</p>

                    <div className="grid-3">
                        <div className="card">
                            <h3>Data is fragmented</h3>
                            <p>Running in one app, gym in another. No clear picture of your overall fitness journey.</p>
                        </div>
                        <div className="card">
                            <h3>Calories are wrong</h3>
                            <p>Studies show fitness apps miss by up to 25%. You cannot trust what they tell you.</p>
                        </div>
                        <div className="card">
                            <h3>Users quit fast</h3>
                            <p>70% abandon fitness apps within 81 days. Why? Because they don't see real results.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section id="how-it-works" className="section bg-light scroll-section" ref={(el) => addToRefs(el, 2)}>
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
                                <div className="stat-difference">
                                    Running burns 33% more calories per minute
                                </div>
                            </div>
                        </div>
                        <div className="comparison-right">
                            <div className="chart-placeholder">
                                <div className="simple-chart">
                                    <div className="simple-chart-bar running-bar"></div>
                                    <div className="simple-chart-bar gym-bar"></div>
                                    <div className="chart-labels">
                                        <span>Running</span>
                                        <span>Gym</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="steps">
                        <div className="step">
                            <div className="step-number">1</div>
                            <h4>Log your workout</h4>
                            <p>Add a run or gym session. Takes about 10 seconds.</p>
                        </div>
                        <div className="step">
                            <div className="step-number">2</div>
                            <h4>We calculate</h4>
                            <p>Our system calculates calories burned per minute.</p>
                        </div>
                        <div className="step">
                            <div className="step-number">3</div>
                            <h4>Get insight</h4>
                            <p>We tell you which workout works better for your body.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Section - With PHP Currency */}
            <section id="pricing-section" className="section scroll-section" ref={(el) => addToRefs(el, 3)}>
                <div className="container">
                    <h2 className="section-title">Simple, transparent pricing</h2>
                    <p className="section-subtitle">Choose the plan that works for you. All prices in Philippine Peso (₱).</p>

                    <div className="pricing-grid">
                        <div className="pricing-card">
                            <h3>Free</h3>
                            <div className="pricing-price">₱0</div>
                            <p className="pricing-period">forever</p>
                            <ul className="pricing-features">
                                <li>Log unlimited workouts</li>
                                <li>Track running and gym</li>
                                <li>Basic calorie comparison</li>
                                <li>Weekly progress reports</li>
                            </ul>
                            <button onClick={() => handlePricingClick('free')} className="pricing-btn">Get Started</button>
                        </div>
                        <div className="pricing-card featured">
                            <div className="featured-badge">Most Popular</div>
                            <h3>Pro</h3>
                            <div className="pricing-price">₱399</div>
                            <p className="pricing-period">per month</p>
                            <ul className="pricing-features">
                                <li>Everything in Free</li>
                                <li>Advanced analytics</li>
                                <li>Export your data</li>
                                <li>Priority support</li>
                                <li>Coming soon: Swimming & cycling</li>
                            </ul>
                            <button onClick={() => handlePricingClick('pro')} className="pricing-btn primary">Upgrade to Pro</button>
                        </div>
                        <div className="pricing-card">
                            <h3>Annual</h3>
                            <div className="pricing-price">₱3,499</div>
                            <p className="pricing-period">per year (save 27%)</p>
                            <ul className="pricing-features">
                                <li>Everything in Pro</li>
                                <li>2 months free</li>
                                <li>Personalized insights</li>
                                <li>Priority support</li>
                                <li>Early access to new features</li>
                            </ul>
                            <button onClick={() => handlePricingClick('annual')} className="pricing-btn">Go Annual</button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="section scroll-section" ref={(el) => addToRefs(el, 4)}>
                <div className="container">
                    <h2 className="section-title">Features built for clarity</h2>
                    <p className="section-subtitle">Everything you need to understand your fitness journey.</p>

                    <div className="grid-2">
                        <div className="feature">
                            <h3>Track everything</h3>
                            <p>Log running distance, time, and pace. Log gym exercises, sets, and reps. All in one place.</p>
                        </div>
                        <div className="feature">
                            <h3>Smart comparisons</h3>
                            <p>Compare calories per minute between different workouts. See weekly trends and monthly progress.</p>
                        </div>
                        <div className="feature">
                            <h3>Instant insights</h3>
                            <p>Ember analyzes your workouts and tells you what's working in plain English. No confusing charts.</p>
                        </div>
                        <div className="feature">
                            <h3>Your privacy matters</h3>
                            <p>Your workout data stays yours. We never sell or share your personal fitness information.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="section bg-light scroll-section" ref={(el) => addToRefs(el, 5)}>
                <div className="container">
                    <h2 className="section-title">Why fitness tracking matters</h2>
                    <p className="section-subtitle">The numbers tell an important story.</p>

                    <div className="stats">
                        <div className="stat">
                            <div className="stat-number">₱3.5 Trillion</div>
                            <p>Global fitness market value by 2026</p>
                            <span className="stat-note">Fitness is bigger than ever</span>
                        </div>
                        <div className="stat">
                            <div className="stat-number">81 days</div>
                            <p>Average user retention period</p>
                            <span className="stat-note">Most people quit after 3 months</span>
                        </div>
                        <div className="stat">
                            <div className="stat-number">25% Error</div>
                            <p>Typical calorie tracking error</p>
                            <span className="stat-note">Most apps are not accurate</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Ember Section */}
            <section className="section scroll-section" ref={(el) => addToRefs(el, 6)}>
                <div className="container">
                    <h2 className="section-title">Why choose Ember?</h2>
                    <p className="section-subtitle">See what makes us different from other fitness apps.</p>

                    <div className="grid-3">
                        <div className="card">
                            <h3>Accurate calculations</h3>
                            <p>We use science-backed formulas based on your weight, age, and workout intensity. More accurate than most apps.</p>
                        </div>
                        <div className="card">
                            <h3>Simple interface</h3>
                            <p>No complicated menus. No confusing settings. Just log your workout and get answers.</p>
                        </div>
                        <div className="card">
                            <h3>Completely free to start</h3>
                            <p>Log as many workouts as you want. No credit card required. Upgrade only when you need more.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* What You Can Track Section */}
            <section className="section bg-light scroll-section" ref={(el) => addToRefs(el, 7)}>
                <div className="container">
                    <h2 className="section-title">What you can track</h2>
                    <p className="section-subtitle">Ember supports multiple workout types.</p>

                    <div className="grid-2">
                        <div className="feature">
                            <h3>Running</h3>
                            <p>Track distance, duration, pace, and estimated calories burned. Perfect for outdoor runs or treadmill sessions.</p>
                        </div>
                        <div className="feature">
                            <h3>Gym workouts</h3>
                            <p>Log any exercise - weight lifting, bodyweight, cardio machines. Track sets, reps, and duration.</p>
                        </div>
                        <div className="feature">
                            <h3>Coming soon: Swimming</h3>
                            <p>Track laps, distance, and stroke types. Arriving in early 2026.</p>
                        </div>
                        <div className="feature">
                            <h3>Coming soon: Cycling</h3>
                            <p>Track distance, speed, and elevation. Arriving in spring 2026.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="section scroll-section" ref={(el) => addToRefs(el, 8)}>
                <div className="container">
                    <h2 className="section-title">Real users, real results</h2>
                    <p className="section-subtitle">What people are saying about Ember.</p>

                    <div className="testimonials">
                        <div className="testimonial">
                            <p>"I finally know which workout actually works. Ember told me running burns more per minute. Now I run more and see real results."</p>
                            <span>— Sarah, 28</span>
                            <p className="testimonial-role">Has lost 12 lbs in 3 months</p>
                        </div>
                        <div className="testimonial">
                            <p>"I used to log runs in one app and gym in another. Ember puts everything together. Game changer for my fitness journey."</p>
                            <span>— Mike, 34</span>
                            <p className="testimonial-role">Increased workout consistency by 40%</p>
                        </div>
                        <div className="testimonial">
                            <p>"The insights are so clear. I love knowing what's most efficient for my body without doing any math myself."</p>
                            <span>— Alex, 31</span>
                            <p className="testimonial-role">Active user for 6 months</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section id="faq" className="section bg-light scroll-section" ref={(el) => addToRefs(el, 9)}>
                <div className="container">
                    <h2 className="section-title">Frequently asked questions</h2>
                    <p className="section-subtitle">Everything you need to know about Ember.</p>

                    <div className="faq-grid">
                        <div className="faq">
                            <h3>How much does Ember cost?</h3>
                            <p>Ember is completely free to start. You can log unlimited workouts without paying. Premium features start at ₱399 per month.</p>
                        </div>
                        <div className="faq">
                            <h3>Is my data private?</h3>
                            <p>Yes. Your workout data belongs to you. We never sell your information or share it with third parties.</p>
                        </div>
                        <div className="faq">
                            <h3>Can I use Ember on multiple devices?</h3>
                            <p>Yes. Ember syncs across all your devices. Log from your phone, tablet, or computer.</p>
                        </div>
                        <div className="faq">
                            <h3>How do you calculate calories?</h3>
                            <p>We use MET (Metabolic Equivalent) values based on scientific research. Your weight, age, and workout intensity affect the calculation.</p>
                        </div>
                        <div className="faq">
                            <h3>Do I need to connect a smartwatch?</h3>
                            <p>No. You can log workouts manually. Smartwatch integration is coming in a future update.</p>
                        </div>
                        <div className="faq">
                            <h3>Can I export my data?</h3>
                            <p>Yes. You can download your workout history as a CSV file anytime from your profile settings.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="section scroll-section" ref={(el) => addToRefs(el, 10)}>
                <div className="container">
                    <div className="newsletter-box">
                        <h3>Get fitness tips straight to your inbox</h3>
                        <p>Subscribe to our newsletter for weekly workout advice, nutrition tips, and product updates.</p>
                        <form className="newsletter-form" onSubmit={handleSubscribe}>
                            <input type="email" placeholder="Enter your email address" className="newsletter-input" required />
                            <button type="submit" className="newsletter-btn">Subscribe</button>
                        </form>
                        <p className="newsletter-note">No spam. Unsubscribe anytime.</p>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section scroll-section" ref={(el) => addToRefs(el, 11)}>
                <div className="container">
                    <h2>Ready to know your truth?</h2>
                    <p>Join thousands who finally understand which workout works best for their body.</p>
                    <button onClick={handleGetStarted} className="btn-primary btn-large">Get Started — It's Free</button>
                    <p className="cta-note">No credit card. No spam. Just real results.</p>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer" id="contact">
                <div className="footer-content">
                    <div className="footer-col">
                        <h4>EMBER</h4>
                        <p>Merge your runs. Track your gym. Know your results.</p>
                        <p className="footer-email">hello@emberfit.com</p>
                        <p className="footer-phone">+63 2 1234 5678</p>
                    </div>
                    <div className="footer-col">
                        <h4>Product</h4>
                        <a href="#features">Features</a>
                        <a href="#how-it-works">How It Works</a>
                        <a href="#pricing-section">Pricing</a>
                        <a href="#faq">FAQ</a>
                    </div>
                    <div className="footer-col">
                        <h4>Company</h4>
                        <button onClick={handleAbout} className="footer-btn">About Us</button>
                        <button onClick={handleBlog} className="footer-btn">Blog</button>
                        <button onClick={handleCareer} className="footer-btn">Careers</button>
                        <button onClick={handleContact} className="footer-btn">Contact</button>
                    </div>
                    <div className="footer-col">
                        <h4>Legal</h4>
                        <button onClick={handlePrivacy} className="footer-btn">Privacy Policy</button>
                        <button onClick={handleTerms} className="footer-btn">Terms of Service</button>
                        <button onClick={handleCookie} className="footer-btn">Cookie Policy</button>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>© 2026 Ember Fitness. Built for USTP WebSys Final Project. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;