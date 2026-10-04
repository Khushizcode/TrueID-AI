import React, { useState } from "react";
import { login, saveSession } from "../services/api";

function SignIn({ onNavigate, onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const data = await login(email, password);
      saveSession(data.token, data.user);
      onLogin(data.user);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    setError(
      "Password reset is available after backend authentication is connected."
    );
  };

  return (
    <div className="auth-page">

      <div className="auth-glow auth-glow-one"></div>
      <div className="auth-glow auth-glow-two"></div>

      <main className="auth-card">

        <div className="auth-logo">
          <span>✓</span>
        </div>

        <div className="auth-heading">
          <span>TRUEID AI</span>

          <h1>Welcome back</h1>

          <p>
            Sign in to continue to your identity
            screening dashboard.
          </p>
        </div>

        <form
          className="auth-form"
          onSubmit={handleSubmit}
        >

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

            <div className="auth-label-row">
              <label>Password</label>

              <button
                type="button"
                onClick={handleForgotPassword}
              >
                Forgot password?
              </button>
            </div>

            <div className="auth-input-wrapper">
              <span>●</span>

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Enter your password"
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
            disabled={loading}
          >
            <span>{loading ? "SIGNING IN..." : "SIGN IN"}</span>
            <span>→</span>
          </button>

        </form>


        <div className="auth-divider">
          <span></span>
          <p>OR</p>
          <span></span>
        </div>


        <button
          className="create-account-button"
          onClick={() => onNavigate("signup")}
        >
          CREATE NEW ACCOUNT
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

export default SignIn;