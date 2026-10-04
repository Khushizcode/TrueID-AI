import React from "react";

function formatDate(value) {
  if (!value) return "Just now";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "Just now";

  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function Result({ onNavigate, result }) {
  if (!result) {
    return (
      <div className="result-page">

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
            <h1>Screening Result</h1>
          </div>

          <div className="header-placeholder"></div>

        </header>

        <main className="result-content">

          <section className="no-risk-card">

            <div className="no-risk-icon">
              !
            </div>

            <div>
              <h4>No result to show</h4>
              <p>
                Start a new screening or open a record
                from your history.
              </p>
            </div>

          </section>

          <section className="result-actions">

            <button
              className="primary-result-button"
              onClick={() => onNavigate("newScreening")}
            >
              <span>NEW SCREENING</span>
              <span>→</span>
            </button>

            <button
              className="secondary-result-button"
              onClick={() => onNavigate("history")}
            >
              VIEW SCREENING HISTORY
            </button>

          </section>

        </main>

      </div>
    );
  }

  const indicators = result.riskIndicators || [];
  const isVerified = result.status === "VERIFIED";
  const riskIsLow = result.risk === "LOW";

  let statusMessage = "The document requires additional review.";

  if (result.status === "VERIFIED") {
    statusMessage =
      "The identity document passed the current screening checks.";
  } else if (result.status === "REJECTED") {
    statusMessage =
      "The identity document failed the screening checks.";
  }

  return (
    <div className="result-page">

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
          <h1>Screening Result</h1>
        </div>

        <div className="header-placeholder"></div>

      </header>


      {/* Main Content */}
      <main className="result-content">

        {/* Result Status */}
        <section
          className={`result-status-card ${
            isVerified ? "result-verified" : "result-review"
          }`}
        >

          <div className="result-status-icon">
            {isVerified ? "✓" : "!"}
          </div>

          <span className="result-status-label">
            SCREENING COMPLETE
          </span>

          <h2>
            {result.status}
          </h2>

          <p>
            {statusMessage}
          </p>

        </section>


        {/* Confidence */}
        <section className="confidence-section">

          <div className="section-title-row">
            <div>
              <span>AI ANALYSIS</span>
              <h3>Screening confidence</h3>
            </div>

            <strong>
              {result.confidence}%
            </strong>
          </div>


          <div className="confidence-bar">
            <div
              className="confidence-progress"
              style={{
                width: `${result.confidence}%`,
              }}
            ></div>
          </div>

          <p className="confidence-description">
            Confidence represents the model's current
            assessment based on the available screening checks.
          </p>

        </section>


        {/* Verification Checks */}
        <section className="verification-section">

          <div className="section-title-row">
            <div>
              <span>VERIFICATION</span>
              <h3>Screening checks</h3>
            </div>
          </div>


          <div className="verification-list">

            {/* Name Match */}
            <div className="verification-item">

              <div className="verification-icon">
                {result.nameMatch ? "✓" : "!"}
              </div>

              <div className="verification-details">
                <h4>Name match</h4>
                <p>
                  {result.nameMatch
                    ? "Identity details match the provided information."
                    : "Identity details could not be matched."}
                </p>
              </div>

              <span
                className={
                  result.nameMatch
                    ? "check-status success"
                    : "check-status warning"
                }
              >
                {result.nameMatch ? "MATCH" : "REVIEW"}
              </span>

            </div>


            {/* Document Validity */}
            <div className="verification-item">

              <div className="verification-icon">
                {result.documentValid ? "✓" : "!"}
              </div>

              <div className="verification-details">
                <h4>Document validity</h4>
                <p>
                  {result.documentValid
                    ? "Document structure passed the current checks."
                    : "Document structure did not pass all checks."}
                </p>
              </div>

              <span
                className={
                  result.documentValid
                    ? "check-status success"
                    : "check-status warning"
                }
              >
                {result.documentValid ? "VALID" : "REVIEW"}
              </span>

            </div>


            {/* Risk Analysis */}
            <div className="verification-item">

              <div className="verification-icon">
                {indicators.length === 0 ? "✓" : "!"}
              </div>

              <div className="verification-details">
                <h4>Risk analysis</h4>
                <p>
                  {indicators.length === 0
                    ? "No significant risk indicators were detected."
                    : `${indicators.length} risk indicator(s) were detected.`}
                </p>
              </div>

              <span
                className={
                  riskIsLow
                    ? "check-status success"
                    : "check-status warning"
                }
              >
                {result.risk}
              </span>

            </div>

          </div>

        </section>


        {/* Risk Indicators */}
        <section className="risk-indicators-section">

          <div className="section-title-row">

            <div>
              <span>RISK ANALYSIS</span>
              <h3>Risk indicators</h3>
            </div>

            <span className="risk-level-badge">
              {result.risk} RISK
            </span>

          </div>


          {indicators.length === 0 ? (
            <div className="no-risk-card">

              <div className="no-risk-icon">
                ✓
              </div>

              <div>
                <h4>No risk indicators found</h4>
                <p>
                  No suspicious indicators were identified
                  during this screening.
                </p>
              </div>

            </div>
          ) : (
            <div className="risk-list">
              {indicators.map((indicator, index) => (
                <div
                  className="risk-list-item"
                  key={`${indicator.code}-${index}`}
                >
                  <span>!</span>
                  <p>
                    <strong>{indicator.severity}</strong>
                    {" - "}
                    {indicator.message}
                  </p>
                </div>
              ))}
            </div>
          )}

        </section>


        {/* Screening Information */}
        <section className="screening-info-section">

          <div className="section-title-row">
            <div>
              <span>SCREENING DETAILS</span>
              <h3>Verification information</h3>
            </div>
          </div>


          <div className="info-grid">

            <div className="info-item">
              <span>Screening ID</span>
              <strong>{result.screeningId}</strong>
            </div>

            <div className="info-item">
              <span>Document</span>
              <strong>{result.documentType}</strong>
            </div>

            <div className="info-item">
              <span>Purpose</span>
              <strong>{result.purpose || "-"}</strong>
            </div>

            <div className="info-item">
              <span>Screened</span>
              <strong>{formatDate(result.createdAt)}</strong>
            </div>

          </div>

        </section>


        {/* Actions */}
        <section className="result-actions">

          <button
            className="primary-result-button"
            onClick={() => onNavigate("newScreening")}
          >
            <span>NEW SCREENING</span>
            <span>→</span>
          </button>

          <button
            className="secondary-result-button"
            onClick={() => onNavigate("history")}
          >
            VIEW SCREENING HISTORY
          </button>

        </section>

      </main>

    </div>
  );
}

export default Result;