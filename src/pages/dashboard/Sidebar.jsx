const navItems = [
  { label: 'Dashboard', id: 'dashboard' },
  { label: 'Workouts', id: 'workouts' },
  { label: 'Add Workout', id: 'add' },
  { label: 'Analytics', id: 'analytics' },
  { label: 'Profile', id: 'profile' },
];

function Sidebar({ active, onNav, user }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-flame">E</div>
        <div>
          <div className="logo-text">Project Ember</div>
          <div className="logo-sub">Fitness Tracker</div>
        </div>
      </div>

      <div className="nav-label">Menu</div>
      {navItems.map((item) => (
        <div
          key={item.id}
          className={`nav-item ${active === item.id ? 'active' : ''}`}
          onClick={() => onNav(item.id)}
        >
          {item.label}
        </div>
      ))}

      <div className="sidebar-spacer" />

      <div className="sidebar-user">
        <div className="user-avatar">{user.initials}</div>
        <div>
          <div className="user-name">{user.name}</div>
          <span className="user-badge">Ember Member</span>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
