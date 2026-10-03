import React from "react";

function FeatureCard({
  icon,
  title,
  description,
  onClick,
}) {
  return (
    <button
      className="feature-card"
      onClick={onClick}
      type="button"
    >
      <div className="feature-card-icon">
        {icon}
      </div>

      <div className="feature-card-content">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>

      <span className="feature-card-arrow">
        →
      </span>
    </button>
  );
}

export default FeatureCard;