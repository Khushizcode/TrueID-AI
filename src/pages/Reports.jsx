import React, { useEffect, useState } from "react";
import { getReports } from "../services/api";

const emptyReport = {
  totalScreenings: 0,
  verified: 0,
  review: 0,
  rejected: 0,
  verificationRate: 0,
  averageConfidence: 0,
  riskLevels: { low: 0, medium: 0, high: 0 },
  byDocumentType: {},
  recentScreenings: [],
};

function Reports({ onNavigate }) {
  const [report, setReport] = useState(emptyReport);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    getReports()
      .then((data) => {
        if (!active) return;

        setReport({
          ...emptyReport,
          ...(data || {}),
          riskLevels: {
            ...emptyReport.riskLevels,
            ...((data && data.riskLevels) || {}),
          },
          byDocumentType: (data && data.byDocumentType) || {},
        });
      })
      .catch((err) => {
        if (active) setError(err.message);
      });

    return () => {
      active = false;
    };
  }, []);

  const flagged = report.review + report.rejected;

  const stats = [
    {
      label: "Total Screenings",
      value: report.totalScreenings,
    },
    {
      label: "Verified",
      value: report.verified,
    },
    {
      label: "Under Review",
      value: flagged,
    },
    {
      label: "High Risk",
      value: report.riskLevels.high,
    },
  ];

  const documentStats = Object.entries(report.byDocumentType).map(
    ([name, count]) => ({
      name,
      count,
      percentage: report.totalScreenings
        ? Math.round((count * 100) / report.totalScreenings)
        : 0,
    })
  );

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


        {error && (
          <p style={{ textAlign: "center", padding: "12px", color: "#b91c1c" }}>
            {error}
          </p>
        )}


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

              <span className="report-stat-change">
                All time
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
              All time
            </span>

          </div>


          <div className="verification-overview">

            <div className="verification-chart">

              <div className="chart-circle">

                <div className="chart-circle-inner">
                  <strong>{report.verificationRate}%</strong>
                  <span>Verified</span>
                </div>

              </div>

            </div>


            <div className="verification-legend">

              <div className="legend-item">
                <span className="legend-dot verified"></span>

                <div>
                  <strong>Verified</strong>
                  <p>{report.verified} screenings</p>
                </div>
              </div>


              <div className="legend-item">
                <span className="legend-dot review"></span>

                <div>
                  <strong>Under Review</strong>
                  <p>{flagged} screenings</p>
                </div>
              </div>


              <div className="legend-item">
                <span className="legend-dot high-risk"></span>

                <div>
                  <strong>High Risk</strong>
                  <p>{report.riskLevels.high} screenings</p>
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

            {documentStats.length === 0 && (
              <p style={{ padding: "12px", opacity: 0.7 }}>
                No screenings yet.
              </p>
            )}

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
                <strong>{report.riskLevels.low}</strong>
                <p>Screenings</p>
              </div>

            </div>


            <div className="risk-summary-card medium">

              <div className="risk-summary-icon">
                !
              </div>

              <div>
                <span>MEDIUM RISK</span>
                <strong>{report.riskLevels.medium}</strong>
                <p>Screenings</p>
              </div>

            </div>


            <div className="risk-summary-card high">

              <div className="risk-summary-icon">
                !
              </div>

              <div>
                <span>HIGH RISK</span>
                <strong>{report.riskLevels.high}</strong>
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