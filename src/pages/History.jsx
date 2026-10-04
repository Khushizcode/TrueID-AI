import React, { useEffect, useState } from "react";
import { getHistory } from "../services/api";

function formatDate(value) {
  if (!value) return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "";

  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function statusLabel(status) {
  if (status === "VERIFIED") return "Verified";
  if (status === "REVIEW") return "Review";
  if (status === "REJECTED") return "Rejected";
  return status || "Unknown";
}

function History({ onNavigate, onViewScreening }) {
  const [screenings, setScreenings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    getHistory()
      .then((data) => {
        if (active) setScreenings(data || []);
      })
      .catch((err) => {
        if (active) setError(err.message);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const total = screenings.length;
  const verified = screenings.filter(
    (item) => item.status === "VERIFIED"
  ).length;
  const flagged = total - verified;

  const openScreening = (screening) => {
    if (onViewScreening) {
      onViewScreening(screening);
    } else {
      onNavigate("result");
    }
  };

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
              {total}
            </span>

            <span className="summary-label">
              Total
            </span>
          </div>

          <div className="summary-card">
            <span className="summary-number verified-number">
              {verified}
            </span>

            <span className="summary-label">
              Verified
            </span>
          </div>

          <div className="summary-card">
            <span className="summary-number review-number">
              {flagged}
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


          {loading && (
            <p style={{ textAlign: "center", padding: "24px", opacity: 0.7 }}>
              Loading screenings...
            </p>
          )}

          {!loading && error && (
            <p style={{ textAlign: "center", padding: "24px", color: "#b91c1c" }}>
              {error}
            </p>
          )}

          {!loading && !error && screenings.length === 0 && (
            <p style={{ textAlign: "center", padding: "24px", opacity: 0.7 }}>
              No screenings yet. Start a new screening to see it here.
            </p>
          )}


          <div className="history-list">

            {screenings.map((screening) => (

              <button
                className="history-item"
                key={screening.screeningId}
                onClick={() => openScreening(screening)}
              >

                {/* Document icon */}
                <div className="history-document-icon">
                  ▣
                </div>


                {/* Details */}
                <div className="history-item-details">

                  <div className="history-name-row">

                    <h4>
                      {screening.documentType}
                    </h4>

                    <span
                      className={`risk-badge risk-${(screening.risk || "low").toLowerCase()}`}
                    >
                      {screening.risk}
                    </span>

                  </div>

                  <p>
                    {screening.purpose || "Identity screening"}
                  </p>

                  <span className="history-date">
                    {screening.screeningId} • {formatDate(screening.createdAt)}
                  </span>

                </div>


                {/* Status */}
                <div className="history-item-status">

                  <span
                    className={`status-dot status-${(screening.status || "").toLowerCase()}`}
                  ></span>

                  <span>
                    {statusLabel(screening.status)}
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