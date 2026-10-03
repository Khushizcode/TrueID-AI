import React from "react";

function Result({ onNavigate }) {
  const result = {
    status: "VERIFIED",
    risk: "LOW",
    confidence: 96,
    nameMatch: true,
    documentValid: true,
    riskIndicators: [],
  };

  const isVerified = result.status === "VERIFIED";

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
            {isVerified
              ? "The identity document passed the current screening checks."
              : "The document requires additional review."
            }
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
                  Identity details match the provided information.
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
                  Document structure passed the current checks.
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
                ✓
              </div>

              <div className="verification-details">
                <h4>Risk analysis</h4>
                <p>
                  No significant risk indicators were detected.
                </p>
              </div>

              <span className="check-status success">
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


          {result.riskIndicators.length === 0 ? (
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
              {result.riskIndicators.map((indicator, index) => (
                <div
                  className="risk-list-item"
                  key={index}
                >
                  <span>!</span>
                  <p>{indicator}</p>
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
              <strong>SCR-1004</strong>
            </div>

            <div className="info-item">
              <span>Document</span>
              <strong>Aadhaar</strong>
            </div>

            <div className="info-item">
              <span>Purpose</span>
              <strong>Identity Verification</strong>
            </div>

            <div className="info-item">
              <span>Screened</span>
              <strong>Just now</strong>
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