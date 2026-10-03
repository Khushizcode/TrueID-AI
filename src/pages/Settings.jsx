import React, { useState } from "react";

function Settings({ onNavigate }) {
  const [notifications, setNotifications] = useState(true);
  const [autoSave, setAutoSave] = useState(true);
  const [highRiskAlerts, setHighRiskAlerts] = useState(true);

  return (
    <div className="settings-page">

      {/* Header */}
      <header className="inner-page-header">

        <button
          className="back-button"
          onClick={() => onNavigate("overview")}
          aria-label="Go back"
        >
          ←
        </button>

        <div>
          <p className="header-label">TRUEID AI</p>
          <h1>Settings</h1>
        </div>

        <div className="header-placeholder"></div>

      </header>


      {/* Main Content */}
      <main className="settings-content">

        {/* Intro */}
        <section className="inner-page-intro">

          <span className="intro-badge">
            PREFERENCES
          </span>

          <h2>
            Manage your
            <br />
            settings
          </h2>

          <p>
            Configure screening preferences, notifications
            and security options.
          </p>

        </section>


        {/* Screening Settings */}
        <section className="settings-section">

          <div className="settings-section-heading">
            <span>01</span>

            <div>
              <h3>Screening</h3>
              <p>
                Configure how screenings are handled.
              </p>
            </div>
          </div>


          <div className="settings-list">

            {/* Auto Save */}
            <div className="setting-item">

              <div className="setting-icon">
                ▣
              </div>

              <div className="setting-info">
                <h4>Auto-save screenings</h4>

                <p>
                  Automatically save completed screening
                  records to your history.
                </p>
              </div>

              <button
                className={`toggle-switch ${
                  autoSave ? "enabled" : ""
                }`}
                onClick={() => setAutoSave(!autoSave)}
                aria-label="Toggle auto-save"
                aria-pressed={autoSave}
              >
                <span></span>
              </button>

            </div>


            {/* High Risk Alerts */}
            <div className="setting-item">

              <div className="setting-icon">
                !
              </div>

              <div className="setting-info">
                <h4>High-risk alerts</h4>

                <p>
                  Get notified when a screening detects
                  high-risk indicators.
                </p>
              </div>

              <button
                className={`toggle-switch ${
                  highRiskAlerts ? "enabled" : ""
                }`}
                onClick={() =>
                  setHighRiskAlerts(!highRiskAlerts)
                }
                aria-label="Toggle high-risk alerts"
                aria-pressed={highRiskAlerts}
              >
                <span></span>
              </button>

            </div>

          </div>

        </section>


        {/* Notifications */}
        <section className="settings-section">

          <div className="settings-section-heading">
            <span>02</span>

            <div>
              <h3>Notifications</h3>
              <p>
                Manage TrueID AI notifications.
              </p>
            </div>
          </div>


          <div className="settings-list">

            <div className="setting-item">

              <div className="setting-icon">
                ♢
              </div>

              <div className="setting-info">
                <h4>Screening notifications</h4>

                <p>
                  Receive notifications when screening
                  results are ready.
                </p>
              </div>

              <button
                className={`toggle-switch ${
                  notifications ? "enabled" : ""
                }`}
                onClick={() =>
                  setNotifications(!notifications)
                }
                aria-label="Toggle notifications"
                aria-pressed={notifications}
              >
                <span></span>
              </button>

            </div>

          </div>

        </section>


        {/* Security */}
        <section className="settings-section">

          <div className="settings-section-heading">
            <span>03</span>

            <div>
              <h3>Security & Privacy</h3>
              <p>
                Manage your data and account security.
              </p>
            </div>
          </div>


          <div className="settings-action-list">

            <button className="settings-action-item">

              <div className="setting-icon">
                ◈
              </div>

              <div className="setting-info">
                <h4>Data & privacy</h4>

                <p>
                  Manage document and screening data.
                </p>
              </div>

              <span className="settings-action-arrow">
                →
              </span>

            </button>


            <button className="settings-action-item">

              <div className="setting-icon">
                ◉
              </div>

              <div className="setting-info">
                <h4>Account security</h4>

                <p>
                  Manage password and authentication.
                </p>
              </div>

              <span className="settings-action-arrow">
                →
              </span>

            </button>

          </div>

        </section>


        {/* Application Info */}
        <section className="app-info-card">

          <div className="app-info-logo">
            ✓
          </div>

          <div>
            <h3>TrueID AI</h3>

            <p>
              Identity Screening Platform
            </p>

            <span>
              Version 1.0.0
            </span>
          </div>

        </section>

      </main>


      {/* Bottom Navigation */}
      <nav className="bottom-navigation">

        <button
          className="bottom-nav-item"
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
          className="bottom-nav-item active"
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

export default Settings;