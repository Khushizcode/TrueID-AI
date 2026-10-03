import React from "react";

function History({ onNavigate }) {
  const screenings = [
    {
      id: "SCR-1003",
      name: "Ankit Singh",
      document: "Driving License",
      risk: "MEDIUM",
      status: "Review",
      date: "Today, 10:42 AM",
    },
    {
      id: "SCR-1002",
      name: "Priya Verma",
      document: "Passport",
      risk: "LOW",
      status: "Verified",
      date: "Yesterday, 04:18 PM",
    },
    {
      id: "SCR-1001",
      name: "Rahul Sharma",
      document: "Aadhaar",
      risk: "LOW",
      status: "Verified",
      date: "28 Sep 2026, 11:32 AM",
    },
  ];

  return (
    <div className="history-page">

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
          <h1>Screening History</h1>
        </div>

        <div className="header-placeholder"></div>

      </header>


      {/* Main Content */}
      <main className="history-content">

        {/* Intro */}
        <section className="inner-page-intro">

          <span className="intro-badge">
            ACTIVITY
          </span>

          <h2>
            Previous
            <br />
            screenings
          </h2>

          <p>
            Review your previous identity screening
            results and verification activity.
          </p>

        </section>


        {/* Summary */}
        <section className="history-summary">

          <div className="summary-card">
            <span className="summary-number">
              152
            </span>

            <span className="summary-label">
              Total
            </span>
          </div>

          <div className="summary-card">
            <span className="summary-number verified-number">
              118
            </span>

            <span className="summary-label">
              Verified
            </span>
          </div>

          <div className="summary-card">
            <span className="summary-number review-number">
              24
            </span>

            <span className="summary-label">
              Review
            </span>
          </div>

        </section>


        {/* History List */}
        <section className="history-list-section">

          <div className="list-section-heading">
            <div>
              <span>RECENT ACTIVITY</span>
              <h3>Screening records</h3>
            </div>

            <button className="filter-button">
              Filter
            </button>
          </div>


          <div className="history-list">

            {screenings.map((screening) => (

              <button
                className="history-item"
                key={screening.id}
                onClick={() => onNavigate("result")}
              >

                {/* Document icon */}
                <div className="history-document-icon">
                  ▣
                </div>


                {/* Details */}
                <div className="history-item-details">

                  <div className="history-name-row">

                    <h4>
                      {screening.name}
                    </h4>

                    <span
                      className={`risk-badge risk-${screening.risk.toLowerCase()}`}
                    >
                      {screening.risk}
                    </span>

                  </div>

                  <p>
                    {screening.document}
                  </p>

                  <span className="history-date">
                    {screening.id} • {screening.date}
                  </span>

                </div>


                {/* Status */}
                <div className="history-item-status">

                  <span
                    className={`status-dot status-${screening.status.toLowerCase()}`}
                  ></span>

                  <span>
                    {screening.status}
                  </span>

                  <span className="history-arrow">
                    →
                  </span>

                </div>

              </button>

            ))}

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
          className="bottom-nav-item active"
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

export default History;