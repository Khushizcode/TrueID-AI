import React from "react";

function BottomNav({ activePage = "overview", onNavigate }) {
  const navItems = [
    {
      id: "overview",
      label: "Home",
      icon: "⌂",
    },
    {
      id: "history",
      label: "History",
      icon: "↶",
    },
    {
      id: "reports",
      label: "Reports",
      icon: "▥",
    },
    {
      id: "settings",
      label: "Settings",
      icon: "⚙",
    },
    {
      id: "profile",
      label: "Profile",
      icon: "◉",
    },
  ];

  return (
    <nav className="bottom-navigation">

      {navItems.map((item) => (
        <button
          key={item.id}
          className={`bottom-nav-item ${
            activePage === item.id ? "active" : ""
          }`}
          onClick={() => onNavigate(item.id)}
          aria-label={`Open ${item.label}`}
        >
          <span className="bottom-nav-icon">
            {item.icon}
          </span>

          <span className="bottom-nav-label">
            {item.label}
          </span>
        </button>
      ))}

    </nav>
  );
}

export default BottomNav;