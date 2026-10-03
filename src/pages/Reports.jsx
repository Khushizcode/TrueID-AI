import React from "react";

function Reports({ onNavigate }) {
  const stats = [
    {
      label: "Total Screenings",
      value: "152",
      change: "+12%",
    },
    {
      label: "Verified",
      value: "118",
      change: "+8%",
    },
    {
      label: "Under Review",
      value: "24",
      change: "+4%",
    },
    {
      label: "High Risk",
      value: "10",
      change: "-2%",
    },
  ];

  const documentStats = [
    {
      name: "Aadhaar",
      count: 78,
      percentage: 51,
    },
    {
      name: "Passport",
      count: 34,
      percentage: 22,
    },
    {
      name: "Driving License",
      count: 26,
      percentage: 17,
    },
    {
      name: "Voter ID",
      count: 14,
      percentage: 10,
    },
  ];

  return (
    <div className="reports-page">

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
          <h1>Reports</h1>
        </div>

        <div className="header-placeholder"></div>

      </header>


      {/* Main Content */}
      <main className="reports-content">

        {/* Intro */}
        <section className="inner-page-intro">

          <span className="intro-badge">
            ANALYTICS
          </span>

          <h2>
            Screening
            <br />
            reports
          </h2>

          <p>
            Monitor identity screening activity,
            verification results and detected risks.
          </p>

        </section>


        {/* Statistics */}
        <section className="report-stats-grid">

          {stats.map((stat) => (
            <div
              className="report-stat-card"
              key={stat.label}
            >

              <span className="report-stat-label">
                {stat.label}
              </span>

              <strong className="report-stat-value">
                {stat.value}
              </strong>

              <span
                className={`report-stat-change ${
                  stat.change.startsWith("-")
                    ? "negative"
                    : ""
                }`}
              >
                {stat.change} this month
              </span>

            </div>
          ))}

        </section>


        {/* Verification Overview */}
        <section className="report-section">

          <div className="report-section-heading">

            <div>
              <span>SCREENING OVERVIEW</span>
              <h3>Verification results</h3>
            </div>

            <span className="report-period">
              This month
            </span>

          </div>


          <div className="verification-overview">

            <div className="verification-chart">

              <div className="chart-circle">

                <div className="chart-circle-inner">
                  <strong>78%</strong>
                  <span>Verified</span>
                </div>

              </div>

            </div>


            <div className="verification-legend">

              <div className="legend-item">
                <span className="legend-dot verified"></span>

                <div>
                  <strong>Verified</strong>
                  <p>118 screenings</p>
                </div>
              </div>


              <div className="legend-item">
                <span className="legend-dot review"></span>

                <div>
                  <strong>Under Review</strong>
                  <p>24 screenings</p>
                </div>
              </div>


              <div className="legend-item">
                <span className="legend-dot high-risk"></span>

                <div>
                  <strong>High Risk</strong>
                  <p>10 screenings</p>
                </div>
              </div>

            </div>

          </div>

        </section>


        {/* Document Distribution */}
        <section className="report-section">

          <div className="report-section-heading">

            <div>
              <span>DOCUMENT ANALYSIS</span>
              <h3>Document distribution</h3>
            </div>

          </div>


          <div className="document-distribution">

            {documentStats.map((document) => (
              <div
                className="document-stat-row"
                key={document.name}
              >

                <div className="document-stat-info">

                  <div>
                    <strong>
                      {document.name}
                    </strong>

                    <span>
                      {document.count}
                    </span>
                  </div>

                  <div className="document-progress">
                    <div
                      className="document-progress-fill"
                      style={{
                        width: `${document.percentage}%`,
                      }}
                    ></div>
                  </div>

                </div>

                <span className="document-percentage">
                  {document.percentage}%
                </span>

              </div>
            ))}

          </div>

        </section>


        {/* Risk Summary */}
        <section className="report-section">

          <div className="report-section-heading">

            <div>
              <span>RISK MONITORING</span>
              <h3>Risk summary</h3>
            </div>

          </div>


          <div className="risk-summary-grid">

            <div className="risk-summary-card low">

              <div className="risk-summary-icon">
                ✓
              </div>

              <div>
                <span>LOW RISK</span>
                <strong>118</strong>
                <p>Screenings</p>
              </div>

            </div>


            <div className="risk-summary-card medium">

              <div className="risk-summary-icon">
                !
              </div>

              <div>
                <span>MEDIUM RISK</span>
                <strong>24</strong>
                <p>Screenings</p>
              </div>

            </div>


            <div className="risk-summary-card high">

              <div className="risk-summary-icon">
                !
              </div>

              <div>
                <span>HIGH RISK</span>
                <strong>10</strong>
                <p>Screenings</p>
              </div>

            </div>

          </div>

        </section>


        {/* Report Action */}
        <section className="report-action">

          <div>
            <span className="report-action-label">
              DETAILED REPORT
            </span>

            <h3>
              Review complete screening history
            </h3>

            <p>
              View individual screening records and
              detailed verification results.
            </p>
          </div>

          <button
            className="report-history-button"
            onClick={() => onNavigate("history")}
          >
            VIEW HISTORY
            <span>→</span>
          </button>

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
          className="bottom-nav-item active"
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

export default Reports;