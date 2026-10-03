import React, { useState } from "react";

function SignUp({ onNavigate, onLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [organization, setOrganization] =
    useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] =
    useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !name ||
      !email ||
      !organization ||
      !password
    ) {
      setError("Please fill in all fields.");
      return;
    }

    if (password.length < 6) {
      setError(
        "Password must contain at least 6 characters."
      );
      return;
    }

    const user = {
      name,
      email,
      role: "Screening Officer",
      organization,
    };

    localStorage.setItem(
      "trueid_user",
      JSON.stringify(user)
    );

    localStorage.setItem(
      "trueid_logged_in",
      "true"
    );

    onLogin(user);
  };

  return (
    <div className="auth-page">

      <div className="auth-glow auth-glow-one"></div>
      <div className="auth-glow auth-glow-two"></div>

      <main className="auth-card signup-card">

        <div className="auth-logo">
          <span>✓</span>
        </div>

        <div className="auth-heading">
          <span>TRUEID AI</span>

          <h1>Create account</h1>

          <p>
            Create your officer account to start
            identity screening.
          </p>
        </div>


        <form
          className="auth-form"
          onSubmit={handleSubmit}
        >

          <div className="auth-field">

            <label>Full name</label>

            <div className="auth-input-wrapper">
              <span>◉</span>

              <input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(event) =>
                  setName(event.target.value)
                }
              />
            </div>

          </div>


          <div className="auth-field">

            <label>Email address</label>

            <div className="auth-input-wrapper">
              <span>@</span>

              <input
                type="email"
                placeholder="officer@example.com"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
              />
            </div>

          </div>


          <div className="auth-field">

            <label>Organization</label>

            <div className="auth-input-wrapper">
              <span>▣</span>

              <input
                type="text"
                placeholder="Organization name"
                value={organization}
                onChange={(event) =>
                  setOrganization(event.target.value)
                }
              />
            </div>

          </div>


          <div className="auth-field">

            <label>Password</label>

            <div className="auth-input-wrapper">
              <span>●</span>

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Minimum 6 characters"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >
                {showPassword ? "Hide" : "Show"}
              </button>

            </div>

          </div>


          {error && (
            <div className="auth-message">
              <span>!</span>
              <p>{error}</p>
            </div>
          )}


          <button
            type="submit"
            className="auth-submit-button"
          >
            <span>CREATE ACCOUNT</span>
            <span>→</span>
          </button>

        </form>


        <p className="auth-switch-text">
          Already have an account?
        </p>

        <button
          className="create-account-button"
          onClick={() => onNavigate("signin")}
        >
          SIGN IN
        </button>


        <button
          className="auth-back-button"
          onClick={() => onNavigate("welcome")}
        >
          ← Back to welcome
        </button>

      </main>

    </div>
  );
}

export default SignUp;