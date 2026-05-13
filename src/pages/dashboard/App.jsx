import { useState } from 'react';
import Sidebar from './Sidebar.jsx';
import StatsCard from './StatsCard.jsx';

const T = {
  primary: '#FFB8E0',
  secondary: '#FFEDFA',
  bg: '#FFFFFF',
  surface: '#FFFFFF',
  text: '#333333',
  muted: '#7A7A7A',
  border: 'rgba(255, 184, 224, 0.45)',
  cardShadow: '0 24px 80px rgba(255, 184, 224, 0.18)',
};

const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body {
      min-height: 100vh;
      font-family: 'Inter', sans-serif;
      background: linear-gradient(180deg, #FFFFFF 0%, #FFFAFC 100%);
      color: ${T.text};
    }

    .ember-app { display: flex; min-height: 100vh; background: ${T.bg}; }
    .sidebar {
      width: 260px;
      min-height: 100vh;
      background: ${T.secondary};
      display: flex;
      flex-direction: column;
      padding: 32px 24px;
      border-right: 1px solid ${T.border};
      flex-shrink: 0;
    }
    .sidebar-logo { display: flex; align-items: center; gap: 12px; margin-bottom: 32px; }
    .logo-flame {
      width: 48px;
      height: 48px;
      background: ${T.primary};
      border-radius: 16px;
      display: grid;
      place-items: center;
      color: ${T.bg};
      font-weight: 800;
      font-size: 20px;
    }
    .logo-text { font-size: 18px; font-weight: 800; letter-spacing: -0.3px; color: ${T.text}; }
    .logo-sub  { font-size: 12px; color: ${T.muted}; margin-top: 2px; }
    .nav-label {
      font-size: 10px;
      font-weight: 700;
      color: ${T.muted};
      letter-spacing: 1px;
      text-transform: uppercase;
      margin: 18px 0 10px;
    }
    .nav-item {
      display: block;
      padding: 14px 18px;
      border-radius: 18px;
      cursor: pointer;
      color: ${T.text};
      font-size: 14px;
      font-weight: 600;
      margin-bottom: 8px;
      transition: background 0.25s ease, color 0.25s ease;
    }
    .nav-item:hover { background: rgba(255, 184, 224, 0.35); }
    .nav-item.active { background: ${T.primary}; color: ${T.bg}; }

    .sidebar-spacer { flex: 1; }
    .sidebar-user {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 18px;
      border-radius: 22px;
      background: ${T.bg};
      border: 1px solid ${T.border};
      box-shadow: 0 14px 40px rgba(255, 184, 224, 0.12);
    }
    .user-avatar {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: ${T.primary};
      display: grid;
      place-items: center;
      color: ${T.bg};
      font-weight: 800;
    }
    .user-name { font-size: 14px; font-weight: 700; color: ${T.text}; }
    .user-badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 5px 12px;
      border-radius: 999px;
      font-size: 11px;
      font-weight: 700;
      background: ${T.primary};
      color: ${T.bg};
    }

    .main { flex: 1; padding: 38px 36px; overflow-y: auto; }
    .header {
      display: flex;
      justify-content: space-between;
      gap: 24px;
      align-items: flex-start;
      margin-bottom: 28px;
    }
    .header-left h1 { font-size: 2.8rem; font-weight: 800; letter-spacing: -0.03em; line-height: 1.05; color: ${T.text}; }
    .header-left p { margin-top: 12px; font-size: 1rem; color: ${T.muted}; max-width: 540px; }
    .badge {
      display: inline-flex;
      align-items: center;
      padding: 12px 18px;
      border-radius: 999px;
      background: ${T.primary};
      color: ${T.bg};
      font-size: 0.85rem;
      font-weight: 700;
      margin-top: 16px;
    }

    .search-bar {
      width: min(100%, 340px);
      border-radius: 20px;
      border: 1px solid ${T.border};
      background: ${T.secondary};
      padding: 14px 18px;
    }
    .search-bar input {
      width: 100%;
      border: none;
      outline: none;
      background: transparent;
      color: ${T.text};
      font-size: 0.95rem;
    }
    .search-bar input::placeholder { color: ${T.muted}; }

    .stats-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 20px; margin-bottom: 30px; }
    .stat-card {
      background: ${T.secondary};
      border: 1px solid ${T.border};
      border-radius: 28px;
      padding: 26px 24px;
      box-shadow: ${T.cardShadow};
      transition: transform 0.25s ease, border-color 0.25s ease;
    }
    .stat-card:hover { transform: translateY(-4px); border-color: rgba(255, 184, 224, 0.65); }
    .stat-label { font-size: 0.78rem; text-transform: uppercase; letter-spacing: 0.14em; color: ${T.muted}; margin-bottom: 14px; }
    .stat-value { font-size: 2.1rem; font-weight: 800; line-height: 1; margin-bottom: 10px; color: ${T.text}; }
    .stat-sub { font-size: 0.95rem; color: ${T.muted}; }

    .mid-row { display: grid; grid-template-columns: 1fr 360px; gap: 20px; margin-bottom: 24px; }
    .compare-card,
    .schedule-card,
    .table-card { background: ${T.secondary}; border: 1px solid ${T.border}; border-radius: 26px; padding: 26px; box-shadow: ${T.cardShadow}; }
    .card-title { font-size: 1rem; font-weight: 700; margin-bottom: 22px; color: ${T.text}; }

    .bar-row { margin-bottom: 16px; }
    .bar-meta { display: flex; justify-content: space-between; margin-bottom: 10px; }
    .bar-name { font-size: 0.92rem; font-weight: 700; color: ${T.text}; }
    .bar-value { font-size: 0.92rem; color: ${T.primary}; font-weight: 700; }
    .bar-track { height: 14px; background: rgba(255, 184, 224, 0.25); border-radius: 999px; overflow: hidden; }
    .bar-fill { height: 100%; background: ${T.primary}; border-radius: 999px; transition: width 0.9s ease; }

    .ember-says { margin-top: 24px; padding: 20px 22px; border-radius: 20px; background: rgba(255, 184, 224, 0.18); border: 1px solid rgba(255, 184, 224, 0.4); }
    .ember-says-label { font-size: 0.75rem; letter-spacing: 0.12em; text-transform: uppercase; color: ${T.primary}; font-weight: 700; }
    .ember-says-text { margin-top: 8px; font-size: 0.95rem; color: ${T.text}; }

    .schedule-item { display: flex; align-items: center; gap: 14px; padding: 18px 20px; border-radius: 20px; background: ${T.secondary}; border: 1px solid ${T.border}; margin-bottom: 14px; }
    .schedule-item.today { background: rgba(255, 184, 224, 0.28); border-color: rgba(255, 184, 224, 0.5); }
    .schedule-dot { width: 10px; height: 10px; border-radius: 50%; background: ${T.primary}; flex-shrink: 0; }
    .schedule-dot.tomorrow { background: transparent; border: 1px solid ${T.primary}; }
    .schedule-name { font-size: 0.98rem; font-weight: 700; color: ${T.text}; }
    .schedule-time { font-size: 0.85rem; color: ${T.muted}; }
    .today-pill { margin-left: 10px; background: ${T.primary}; color: ${T.bg}; padding: 5px 12px; border-radius: 999px; font-size: 0.75rem; font-weight: 700; }
    .schedule-arrow { margin-left: auto; color: ${T.muted}; font-size: 1.1rem; }

    .activities-table { width: 100%; border-collapse: separate; border-spacing: 0 10px; }
    .activities-table thead tr th { font-size: 0.75rem; letter-spacing: 0.2em; text-transform: uppercase; color: ${T.muted}; padding: 12px 14px; text-align: left; }
    .activities-table tbody tr { background: ${T.secondary}; border-radius: 20px; }
    .activities-table tbody tr td { padding: 16px 14px; font-size: 0.95rem; color: ${T.text}; border: none; }
    .activities-table tbody tr:hover { background: rgba(255, 184, 224, 0.18); }
    .act-name { font-weight: 700; }
    .cal-badge, .dur-badge { display: inline-flex; align-items: center; justify-content: center; padding: 7px 14px; border-radius: 999px; font-size: 0.82rem; font-weight: 700; }
    .cal-badge { background: rgba(255, 184, 224, 0.25); color: ${T.primary}; }
    .dur-badge { background: rgba(255, 255, 255, 0.7); color: ${T.muted}; }
    .actions-row { display: flex; flex-wrap: wrap; gap: 14px; margin-top: 18px; }
    .btn-primary { background: ${T.primary}; color: ${T.bg}; border: none; border-radius: 18px; padding: 14px 24px; font-weight: 700; cursor: pointer; transition: transform 0.18s ease, filter 0.18s ease; }
    .btn-primary:hover { transform: translateY(-2px); filter: brightness(0.95); }
    .btn-outline { background: ${T.secondary}; border: 1px solid ${T.primary}; color: ${T.text}; border-radius: 18px; padding: 12px 22px; font-weight: 700; cursor: pointer; }
    .action-btn {
      border: none;
      border-radius: 16px;
      padding: 10px 14px;
      color: ${T.text};
      background: rgba(255, 184, 224, 0.2);
      cursor: pointer;
      transition: background 0.2s ease, transform 0.2s ease;
      margin-right: 10px;
    }
    .action-btn:hover { background: rgba(255, 184, 224, 0.32); transform: translateY(-1px); }
    .action-btn.delete { background: rgba(255, 184, 224, 0.3); color: ${T.text}; }

    @media (max-width: 1100px) { .stats-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } .mid-row { grid-template-columns: 1fr; } }
    @media (max-width: 780px) {
      .ember-app { flex-direction: column; }
      .sidebar { width: 100%; min-height: auto; border-right: none; border-bottom: 1px solid ${T.border}; }
      .main { padding: 24px 20px; }
      .stats-grid { grid-template-columns: 1fr; }
      .header { flex-direction: column; align-items: flex-start; }
    }
    @media (max-width: 520px) {
      .main { padding: 20px 16px; }
      .search-bar { width: 100%; }
      .mid-row { gap: 16px; }
    }
  `}</style>
);

const defaultData = {
  user: { name: 'Jane Doe', initials: 'JD' },
  stats: [
    { label: 'Total Calories', value: '1,847', sub: 'cal this week' },
    { label: 'Running CAL/MIN', value: '11.2', sub: 'cal/min avg' },
    { label: 'Gym CAL/MIN', value: '8.4', sub: 'cal/min avg' },
    { label: 'Total Distance', value: '42 km', sub: 'this month' },
  ],
  calPerMin: [
    { label: 'Running', value: 11.2, max: 15 },
    { label: 'Gym', value: 8.4, max: 15 },
  ],
  schedule: [
    { name: 'Running at Park', time: 'Today · 5:00 PM', today: true },
    { name: 'Bench Press', time: 'Tomorrow · 4:00 PM', today: false },
  ],
  activities: [
    { name: 'Run 5km', duration: '28 min', calories: '314 cal' },
    { name: 'Bench Press', duration: '20 min', calories: '112 cal' },
    { name: 'Run Interval', duration: '15 min', calories: '198 cal' },
  ],
};

function CalComparison({ data }) {
  const running = data.find((d) => d.label === 'Running');
  const gym = data.find((d) => d.label === 'Gym');
  const pct = running && gym ? Math.round(((running.value - gym.value) / gym.value) * 100) : 0;

  return (
    <div className="compare-card">
      <div className="card-title">Calories / Min Comparison</div>
      {data.map((item) => (
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
      <div className="ember-says">
        <div>
          <div className="ember-says-label">Insight</div>
          <div className="ember-says-text">Running is {pct}% more efficient today — keep up the pace.</div>
        </div>
      </div>
    </div>
  );
}

function Schedule({ items }) {
  return (
    <div className="schedule-card">
      <div className="card-title">Up Next</div>
      {items.map((item, i) => (
        <div key={i} className={`schedule-item ${item.today ? 'today' : ''}`}>
          <div className={`schedule-dot ${item.today ? '' : 'tomorrow'}`} />
          <div>
            <div className="schedule-name">
              {item.name}
              {item.today && <span className="today-pill">Today</span>}
            </div>
            <div className="schedule-time">{item.time}</div>
          </div>
          <div className="schedule-arrow">›</div>
        </div>
      ))}
    </div>
  );
}

function ActivitiesTable({ activities }) {
  return (
    <div className="table-card">
      <div className="table-header">
        <div className="card-title" style={{ margin: 0 }}>Recent Activities</div>
        <button className="btn-outline" style={{ padding: '10px 18px', fontSize: 12, borderRadius: 14 }}>
          View All
        </button>
      </div>
      <table className="activities-table">
        <thead>
          <tr>
            <th>Activity</th>
            <th>Duration</th>
            <th>Calories</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((row, i) => (
            <tr key={i}>
              <td>
                <div className="act-name">{row.name}</div>
              </td>
              <td><span className="dur-badge">{row.duration}</span></td>
              <td><span className="cal-badge">{row.calories}</span></td>
              <td>
                <button className="action-btn">Edit</button>
                <button className="action-btn delete">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function DashboardContent({ data }) {
  const [search, setSearch] = useState('');

  return (
    <main className="main">
      <div className="header">
        <div className="header-left">
          <h1>Welcome back, {data.user.name.split(' ')[0]}</h1>
          <p>Here’s your fitness summary for today.</p>
          <div className="badge">Ember Member</div>
        </div>
        <div className="search-bar">
          <input
            placeholder="Search workouts…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="stats-grid">
        {data.stats.map((s) => (
          <StatsCard key={s.label} {...s} />
        ))}
      </div>

      <div className="mid-row">
        <CalComparison data={data.calPerMin} />
        <Schedule items={data.schedule} />
      </div>

      <ActivitiesTable activities={data.activities} />

      <div className="actions-row">
        <button className="btn-primary">Add Run</button>
        <button className="btn-primary">Add Gym Workout</button>
        <button className="btn-outline">Export Report</button>
      </div>
    </main>
  );
}

export default function App({ data = defaultData }) {
  const [activeNav, setActiveNav] = useState('dashboard');

  return (
    <>
      <GlobalStyle />
      <div className="ember-app">
        <Sidebar active={activeNav} onNav={setActiveNav} user={data.user} />
        <DashboardContent data={data} />
      </div>
    </>
  );
}
