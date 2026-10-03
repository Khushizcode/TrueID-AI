import React from "react";

function Navbar({ activePage, onNavigate, user }) {
  return (
    <header className="navbar">
      <div
        className="navbar-brand"
        onClick={() => onNavigate("overview")}
      >
        <div className="navbar-logo">
          <span>✓</span>
        </div>

        <div className="navbar-title">
          <strong>TRUEID AI</strong>
          <span>Identity Screening</span>
        </div>
      </div>

      <nav className="navbar-links">
        <button
          className={activePage === "overview" ? "active" : ""}
          onClick={() => onNavigate("overview")}
        >
          Overview
        </button>

        <button
          className={activePage === "newScreening" ? "active" : ""}
          onClick={() => onNavigate("newScreening")}
        >
          New Screening
        </button>

        <button
          className={activePage === "history" ? "active" : ""}
          onClick={() => onNavigate("history")}
        >
          History
        </button>

        <button
          className={activePage === "reports" ? "active" : ""}
          onClick={() => onNavigate("reports")}
        >
          Reports
        </button>
      </nav>

      <button
        className="navbar-profile"
        onClick={() => onNavigate("profile")}
      >
        <div className="navbar-avatar">
          {user?.name
            ? user.name.charAt(0).toUpperCase()
            : "U"}
        </div>

        <div className="navbar-user-info">
          <strong>
            {user?.name || "TrueID Officer"}
          </strong>
          <span>
            {user?.role || "Screening Officer"}
          </span>
        </div>
      </button>
    </header>
  );
}

export default Navbar;