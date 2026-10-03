import React from "react";

function Overview({ onNavigate }) {
  return (
    <div className="overview-page">

      {/* Top Header */}
      <header className="overview-header">

        <div className="brand-section">
          <div className="small-logo">
            ✓
          </div>

          <div>
            <h1>TrueID <span>AI</span></h1>
            <p>Identity Screening</p>
          </div>
        </div>

        <button
          className="profile-button"
          onClick={() => onNavigate("profile")}
          aria-label="Open profile"
        >
          👤
        </button>

      </header>


      {/* Main Content */}
      <main className="overview-content">

        {/* Greeting */}
        <section className="overview-intro">

          <p className="intro-label">
            IDENTITY VERIFICATION
          </p>

          <h2>
            Identity Screening
            <br />
            Overview
          </h2>

          <p className="intro-description">
            Verify identity documents and detect potential
            risks using AI-powered screening.
          </p>

        </section>


        {/* Main Screening Card */}
        <section className="screening-card">

          <div className="screening-card-icon">
            <span>⌁</span>
          </div>

          <div className="screening-card-content">

            <span className="card-label">
              NEW SCREENING
            </span>

            <h3>
              Start a new
              <br />
              identity verification
            </h3>

            <p>
              Upload or scan an identity document
              to begin the screening process.
            </p>

          </div>

          <button
            className="start-screening-button"
            onClick={() => onNavigate("newScreening")}
          >
            <span>START NEW SCREENING</span>
            <span>→</span>
          </button>

        </section>


        {/* Quick Access */}
        <section className="quick-access">

          <div className="section-heading">
            <div>
              <span>QUICK ACCESS</span>
              <h3>Manage your screenings</h3>
            </div>
          </div>


          <div className="quick-access-grid">

            {/* History */}
            <button
              className="quick-card"
              onClick={() => onNavigate("history")}
            >
              <div className="quick-icon history-icon">
                ↶
              </div>

              <div className="quick-card-text">
                <h4>History</h4>
                <p>View past screenings</p>
              </div>

              <span className="quick-arrow">
                →
              </span>
            </button>


            {/* Reports */}
            <button
              className="quick-card"
              onClick={() => onNavigate("reports")}
            >
              <div className="quick-icon reports-icon">
                ▥
              </div>

              <div className="quick-card-text">
                <h4>Reports</h4>
                <p>View screening reports</p>
              </div>

              <span className="quick-arrow">
                →
              </span>
            </button>


            {/* Settings */}
            <button
              className="quick-card"
              onClick={() => onNavigate("settings")}
            >
              <div className="quick-icon settings-icon">
                ⚙
              </div>

              <div className="quick-card-text">
                <h4>Settings</h4>
                <p>Manage preferences</p>
              </div>

              <span className="quick-arrow">
                →
              </span>
            </button>


            {/* Profile */}
            <button
              className="quick-card"
              onClick={() => onNavigate("profile")}
            >
              <div className="quick-icon profile-icon">
                ◉
              </div>

              <div className="quick-card-text">
                <h4>Profile</h4>
                <p>Manage your account</p>
              </div>

              <span className="quick-arrow">
                →
              </span>
            </button>

          </div>

        </section>

      </main>


      {/* Bottom Navigation */}
      <nav className="bottom-navigation">

        <button
          className="bottom-nav-item active"
          onClick={() => onNavigate("overview")}
        >
          <span className="bottom-nav-icon">
            ⌂
          </span>

          <span className="bottom-nav-label">
            Home
          </span>
        </button>


        <button
          className="bottom-nav-item"
          onClick={() => onNavigate("history")}
        >
          <span className="bottom-nav-icon">
            ↶
          </span>

          <span className="bottom-nav-label">
            History
          </span>
        </button>


        <button
          className="bottom-nav-item"
          onClick={() => onNavigate("reports")}
        >
          <span className="bottom-nav-icon">
            ▥
          </span>

          <span className="bottom-nav-label">
            Reports
          </span>
        </button>


        <button
          className="bottom-nav-item"
          onClick={() => onNavigate("settings")}
        >
          <span className="bottom-nav-icon">
            ⚙
          </span>

          <span className="bottom-nav-label">
            Settings
          </span>
        </button>


        <button
          className="bottom-nav-item"
          onClick={() => onNavigate("profile")}
        >
          <span className="bottom-nav-icon">
            ◉
          </span>

          <span className="bottom-nav-label">
            Profile
          </span>
        </button>

      </nav>

    </div>
  );
}

export default Overview;