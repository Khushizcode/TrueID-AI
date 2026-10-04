import React, { useEffect, useState } from "react";
import { updateProfile, getReports } from "../services/api";

function Profile({
  onNavigate,
  user,
  onUpdateProfile,
  onLogout,
}) {
  const [editMode, setEditMode] =
    useState(false);

  const [name, setName] = useState(
    user?.name || ""
  );

  const [email, setEmail] = useState(
    user?.email || ""
  );

  const [organization, setOrganization] =
    useState(user?.organization || "");

  const [message, setMessage] =
    useState("");

  const [error, setError] = useState("");

  const [saving, setSaving] = useState(false);

  const [stats, setStats] = useState({
    total: 0,
    verified: 0,
    flagged: 0,
    high: 0,
  });

  useEffect(() => {
    let active = true;

    getReports()
      .then((data) => {
        if (!active || !data) return;

        setStats({
          total: data.totalScreenings || 0,
          verified: data.verified || 0,
          flagged: (data.review || 0) + (data.rejected || 0),
          high: (data.riskLevels && data.riskLevels.high) || 0,
        });
      })
      .catch(() => {
        // Stats stay at zero if the report cannot be loaded
      });

    return () => {
      active = false;
    };
  }, []);

  const handleSave = async () => {
    if (!name.trim()) {
      setError("Name cannot be empty.");
      return;
    }

    setError("");
    setSaving(true);

    try {
      const updatedUser = await updateProfile(
        name,
        organization
      );

      onUpdateProfile(updatedUser);

      setName(updatedUser.name || "");
      setOrganization(updatedUser.organization || "");

      setEditMode(false);

      setMessage(
        "Profile updated successfully."
      );

      setTimeout(() => {
        setMessage("");
      }, 2500);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setName(user?.name || "");
    setEmail(user?.email || "");
    setOrganization(
      user?.organization || ""
    );

    setError("");
    setEditMode(false);
  };

  return (
    <div className="profile-page">

      <header className="inner-page-header">

        <button
          className="back-button"
          onClick={() =>
            onNavigate("overview")
          }
        >
          ←
        </button>

        <div>
          <p className="header-label">
            TRUEID AI
          </p>

          <h1>Profile</h1>
        </div>

        <div className="header-placeholder"></div>

      </header>


      <main className="profile-content">

        <section className="profile-hero">

          <div className="profile-avatar">
            {user?.name
              ?.substring(0, 2)
              .toUpperCase() || "TO"}
          </div>

          <div className="profile-hero-info">

            <span className="profile-role">
              {user?.role ||
                "Screening Officer"}
            </span>

            <h2>
              {user?.name ||
                "TrueID Officer"}
            </h2>

            <p>
              {user?.email ||
                "officer@trueid.ai"}
            </p>

          </div>

          <button
            className="edit-profile-button"
            onClick={() =>
              setEditMode(!editMode)
            }
            aria-label="Edit profile"
          >
            ✎
          </button>

        </section>


        {message && (
          <div className="profile-success-message">
            <span>✓</span>
            {message}
          </div>
        )}

        {error && (
          <div
            className="profile-success-message"
            style={{ color: "#b91c1c" }}
          >
            <span>!</span>
            {error}
          </div>
        )}


        {editMode ? (

          <section className="edit-profile-card">

            <div className="profile-section-heading">

              <span>EDIT</span>

              <div>
                <h3>
                  Edit profile
                </h3>

                <p>
                  Update your account information.
                </p>
              </div>

            </div>


            <div className="profile-edit-form">

              <div className="profile-edit-field">

                <label>
                  Full name
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(event) =>
                    setName(
                      event.target.value
                    )
                  }
                />

              </div>


              <div className="profile-edit-field">

                <label>
                  Email address (cannot be changed)
                </label>

                <input
                  type="email"
                  value={email}
                  disabled
                />

              </div>


              <div className="profile-edit-field">

                <label>
                  Organization
                </label>

                <input
                  type="text"
                  value={organization}
                  onChange={(event) =>
                    setOrganization(
                      event.target.value
                    )
                  }
                />

              </div>


              <div className="profile-edit-actions">

                <button
                  className="profile-cancel-button"
                  onClick={handleCancel}
                >
                  CANCEL
                </button>

                <button
                  className="profile-save-button"
                  onClick={handleSave}
                  disabled={saving}
                >
                  {saving ? "SAVING..." : "SAVE CHANGES"}
                </button>

              </div>

            </div>

          </section>

        ) : (

          <section className="profile-section">

            <div className="profile-section-heading">

              <span>01</span>

              <div>
                <h3>
                  Account information
                </h3>

                <p>
                  Your TrueID AI account details.
                </p>
              </div>

            </div>


            <div className="profile-info-card">

              <div className="profile-info-row">
                <div className="profile-info-icon">
                  ◉
                </div>

                <div>
                  <span>
                    Full name
                  </span>

                  <strong>
                    {user?.name}
                  </strong>
                </div>
              </div>


              <div className="profile-info-row">
                <div className="profile-info-icon">
                  @
                </div>

                <div>
                  <span>
                    Email address
                  </span>

                  <strong>
                    {user?.email}
                  </strong>
                </div>
              </div>


              <div className="profile-info-row">
                <div className="profile-info-icon">
                  ◆
                </div>

                <div>
                  <span>
                    Role
                  </span>

                  <strong>
                    {user?.role}
                  </strong>
                </div>
              </div>


              <div className="profile-info-row">
                <div className="profile-info-icon">
                  ▣
                </div>

                <div>
                  <span>
                    Organization
                  </span>

                  <strong>
                    {user?.organization}
                  </strong>
                </div>
              </div>

            </div>

          </section>

        )}


        {/* SCREENING ACTIVITY */}

        <section className="profile-section">

          <div className="profile-section-heading">

            <span>02</span>

            <div>
              <h3>
                Screening activity
              </h3>

              <p>
                Your current screening statistics.
              </p>
            </div>

          </div>


          <div className="profile-stat-grid">

            <div className="profile-stat-card">
              <span className="profile-stat-icon">
                ▣
              </span>

              <strong>{stats.total}</strong>

              <p>
                Total screenings
              </p>
            </div>


            <div className="profile-stat-card">
              <span className="profile-stat-icon">
                ✓
              </span>

              <strong>{stats.verified}</strong>

              <p>
                Verified
              </p>
            </div>


            <div className="profile-stat-card">
              <span className="profile-stat-icon">
                !
              </span>

              <strong>{stats.flagged}</strong>

              <p>
                Under review
              </p>
            </div>


            <div className="profile-stat-card">
              <span className="profile-stat-icon">
                ⚡
              </span>

              <strong>{stats.high}</strong>

              <p>
                High risk
              </p>
            </div>

          </div>

        </section>


        {/* ACCOUNT ACTIONS */}

        <section className="profile-section">

          <div className="profile-section-heading">

            <span>03</span>

            <div>
              <h3>
                Account
              </h3>

              <p>
                Manage your account preferences.
              </p>
            </div>

          </div>


          <div className="profile-action-list">

            <button
              className="profile-action-item"
              onClick={() =>
                setEditMode(true)
              }
            >

              <div className="profile-action-icon">
                ◈
              </div>

              <div>
                <h4>
                  Edit profile
                </h4>

                <p>
                  Update your account information.
                </p>
              </div>

              <span>→</span>

            </button>


            <button
              className="profile-action-item"
              onClick={() =>
                onNavigate("settings")
              }
            >

              <div className="profile-action-icon">
                ⚙
              </div>

              <div>
                <h4>
                  Account settings
                </h4>

                <p>
                  Manage preferences and security.
                </p>
              </div>

              <span>→</span>

            </button>


            <button
              className="profile-action-item"
              onClick={onLogout}
            >

              <div className="profile-action-icon danger">
                ↪
              </div>

              <div>
                <h4>
                  Sign out
                </h4>

                <p>
                  Sign out from this account.
                </p>
              </div>

              <span>→</span>

            </button>

          </div>

        </section>


        <section className="account-status-card">

          <div className="account-status-icon">
            ✓
          </div>

          <div>

            <span>
              ACCOUNT STATUS
            </span>

            <h3>
              Active
            </h3>

            <p>
              Your TrueID AI account is active
              and ready for identity screening.
            </p>

          </div>

        </section>

      </main>


      <nav className="bottom-navigation">

        <button
          className="bottom-nav-item"
          onClick={() =>
            onNavigate("overview")
          }
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
          onClick={() =>
            onNavigate("history")
          }
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
          onClick={() =>
            onNavigate("reports")
          }
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
          onClick={() =>
            onNavigate("settings")
          }
        >
          <span className="bottom-nav-icon">
            ⚙
          </span>

          <span className="bottom-nav-label">
            Settings
          </span>
        </button>


        <button
          className="bottom-nav-item active"
          onClick={() =>
            onNavigate("profile")
          }
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

export default Profile;