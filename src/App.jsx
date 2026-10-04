import React, { useEffect, useState } from "react";

import Welcome from "./pages/Welcome";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Overview from "./pages/Overview";
import NewScreening from "./pages/NewScreening";
import History from "./pages/History";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import Result from "./pages/Result";

import DocumentUpload from "./components/DocumentUpload";
import CameraScanner from "./components/CameraScanner";

import { clearSession } from "./services/api";

import "./App.css";

function getSavedUser() {
  try {
    const savedUser = localStorage.getItem("trueid_user");

    return savedUser ? JSON.parse(savedUser) : null;
  } catch {
    localStorage.removeItem("trueid_user");
    return null;
  }
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("trueid_logged_in") === "true";
  });

  const [user, setUser] = useState(() => {
    return (
      getSavedUser() || {
        name: "TrueID Officer",
        email: "officer@trueid.ai",
        role: "Screening Officer",
        organization: "TrueID AI",
      }
    );
  });

  const [currentPage, setCurrentPage] = useState(() => {
    const loggedIn =
      localStorage.getItem("trueid_logged_in") === "true";

    return loggedIn ? "overview" : "welcome";
  });

  const [screeningData, setScreeningData] = useState({
    documentType: "Aadhaar",
    purpose: "Identity Verification",
  });

  const [currentResult, setCurrentResult] = useState(null);

  useEffect(() => {
    if (!isLoggedIn) {
      if (
        currentPage !== "welcome" &&
        currentPage !== "signin" &&
        currentPage !== "signup"
      ) {
        setCurrentPage("welcome");
      }
    }
  }, [isLoggedIn, currentPage]);

  useEffect(() => {
    const onForcedLogout = () => {
      setIsLoggedIn(false);
      setCurrentResult(null);
      setCurrentPage("welcome");
    };

    window.addEventListener("trueid-logout", onForcedLogout);

    return () =>
      window.removeEventListener("trueid-logout", onForcedLogout);
  }, []);

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
    setIsLoggedIn(true);

    localStorage.setItem(
      "trueid_user",
      JSON.stringify(loggedInUser)
    );

    localStorage.setItem("trueid_logged_in", "true");

    setCurrentPage("overview");
  };

  const handleLogout = () => {
    clearSession();

    setIsLoggedIn(false);
    setCurrentResult(null);

    setCurrentPage("welcome");
  };

  const handleUpdateProfile = (updatedUser) => {
    setUser(updatedUser);

    localStorage.setItem(
      "trueid_user",
      JSON.stringify(updatedUser)
    );
  };

  const updateScreeningData = (data) => {
    setScreeningData((previousData) => ({
      ...previousData,
      ...data,
    }));
  };

  // Called after a screening finishes, or when a history record is opened
  const showResult = (result) => {
    setCurrentResult(result);
    setCurrentPage("result");
  };

  /*
   * PUBLIC PAGES
   */

  if (currentPage === "welcome") {
    return (
      <Welcome
        onGetStarted={() => {
          if (isLoggedIn) {
            setCurrentPage("overview");
          } else {
            setCurrentPage("signin");
          }
        }}
      />
    );
  }

  if (currentPage === "signin") {
    return (
      <SignIn
        onNavigate={goToPage}
        onLogin={handleLogin}
      />
    );
  }

  if (currentPage === "signup") {
    return (
      <SignUp
        onNavigate={goToPage}
        onLogin={handleLogin}
      />
    );
  }

  /*
   * PROTECTED PAGES
   */

  if (!isLoggedIn) {
    return (
      <Welcome
        onGetStarted={() => setCurrentPage("signin")}
      />
    );
  }

  if (currentPage === "overview") {
    return (
      <Overview
        onNavigate={goToPage}
        user={user}
      />
    );
  }

  if (currentPage === "newScreening") {
    return (
      <NewScreening
        onNavigate={goToPage}
        screeningData={screeningData}
        onUpdateScreeningData={updateScreeningData}
      />
    );
  }

  if (currentPage === "documentUpload") {
    return (
      <DocumentUpload
        documentType={screeningData.documentType}
        purpose={screeningData.purpose}
        onNavigate={goToPage}
        onComplete={showResult}
      />
    );
  }

  if (currentPage === "cameraScanner") {
    return (
      <CameraScanner
        documentType={screeningData.documentType}
        purpose={screeningData.purpose}
        onNavigate={goToPage}
        onComplete={showResult}
      />
    );
  }

  if (currentPage === "result") {
    return (
      <Result
        onNavigate={goToPage}
        result={currentResult}
      />
    );
  }

  if (currentPage === "history") {
    return (
      <History
        onNavigate={goToPage}
        onViewScreening={showResult}
      />
    );
  }

  if (currentPage === "reports") {
    return (
      <Reports
        onNavigate={goToPage}
      />
    );
  }

  if (currentPage === "settings") {
    return (
      <Settings
        onNavigate={goToPage}
      />
    );
  }

  if (currentPage === "profile") {
    return (
      <Profile
        onNavigate={goToPage}
        user={user}
        onUpdateProfile={handleUpdateProfile}
        onLogout={handleLogout}
      />
    );
  }

  return (
    <Welcome
      onGetStarted={() => setCurrentPage("signin")}
    />
  );
}

export default App;