import React from "react";

function Welcome({ onGetStarted }) {
  return (
    <div className="welcome-page">

      {/* Background decorative elements */}
      <div className="welcome-glow welcome-glow-one"></div>
      <div className="welcome-glow welcome-glow-two"></div>

      {/* Main content */}
      <main className="welcome-content">

        {/* Logo */}
        <div className="trueid-logo">
          <div className="logo-shield">
            ✓
          </div>
        </div>

        {/* Brand Name */}
        <h1 className="welcome-title">
          TrueID <span>AI</span>
        </h1>

        {/* Main Headline */}
        <h2 className="welcome-headline">
          Scan documents
          <br />
          and detect fake identity
        </h2>

        {/* Description */}
        <p className="welcome-description">
          AI-powered identity screening that helps verify
          documents and identify potential identity risks
          quickly and securely.
        </p>

        {/* Get Started Button */}
        <button
          className="get-started-btn"
          onClick={onGetStarted}
        >
          <span>Get Started</span>
          <span className="button-arrow">→</span>
        </button>

        {/* Small trust information */}
        <div className="welcome-features">

          <div className="welcome-feature">
            <span className="feature-icon">✦</span>
            <span>AI Powered</span>
          </div>

          <div className="feature-dot">•</div>

          <div className="welcome-feature">
            <span className="feature-icon">✓</span>
            <span>Secure</span>
          </div>

          <div className="feature-dot">•</div>

          <div className="welcome-feature">
            <span className="feature-icon">⚡</span>
            <span>Fast</span>
          </div>

        </div>

      </main>

      {/* Bottom branding */}
      <footer className="welcome-footer">
        <span>TRUEID AI</span>
        <span>•</span>
        <span>Identity Screening Platform</span>
      </footer>

    </div>
  );
}

export default Welcome;