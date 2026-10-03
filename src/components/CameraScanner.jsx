import React, { useEffect, useRef, useState } from "react";

function CameraScanner({ documentType = "Aadhaar", onNavigate }) {
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState("");
  const [captured, setCaptured] = useState(false);

  const startCamera = async () => {
    try {
      setCameraError("");

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: "environment" },
        },
        audio: false,
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      setCameraActive(true);
    } catch (error) {
      console.error("Camera error:", error);

      setCameraError(
        "Camera access nahi mil paaya. Please browser permission allow karein."
      );

      setCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        track.stop();
      });

      streamRef.current = null;
    }

    setCameraActive(false);
  };

  const captureDocument = () => {
    if (!cameraActive) return;

    setCaptured(true);
    stopCamera();
  };

  const retakeDocument = () => {
    setCaptured(false);
    startCamera();
  };

  const continueScreening = () => {
    onNavigate("result");
  };

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => {
          track.stop();
        });
      }
    };
  }, []);

  return (
    <div className="camera-scanner-page">

      {/* Header */}
      <header className="inner-page-header">

        <button
          className="back-button"
          onClick={() => {
            stopCamera();
            onNavigate("newScreening");
          }}
          aria-label="Go back"
        >
          ←
        </button>

        <div>
          <p className="header-label">TRUEID AI</p>
          <h1>Camera Scanner</h1>
        </div>

        <div className="header-placeholder"></div>

      </header>


      {/* Main */}
      <main className="camera-scanner-content">

        {/* Intro */}
        <section className="inner-page-intro">

          <span className="intro-badge">
            DOCUMENT SCAN
          </span>

          <h2>
            Scan your
            <br />
            {documentType}
          </h2>

          <p>
            Position the document inside the frame and
            make sure all important details are visible.
          </p>

        </section>


        {/* Camera Area */}
        <section className="camera-section">

          <div className="camera-view">

            {captured ? (
              <div className="captured-preview">

                <div className="captured-document">
                  <div className="captured-document-top">
                    DOCUMENT CAPTURED
                  </div>

                  <div className="captured-document-body">
                    <div className="fake-photo"></div>

                    <div className="fake-lines">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>

                <div className="capture-success">
                  ✓ Document captured
                </div>

              </div>
            ) : cameraActive ? (
              <>
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="camera-video"
                />

                {/* Scanner Frame */}
                <div className="scanner-overlay">

                  <div className="scanner-corner top-left"></div>
                  <div className="scanner-corner top-right"></div>
                  <div className="scanner-corner bottom-left"></div>
                  <div className="scanner-corner bottom-right"></div>

                  <div className="scanner-line"></div>

                </div>

                <div className="camera-instruction">
                  Align your document inside the frame
                </div>
              </>
            ) : (
              <div className="camera-placeholder">

                <div className="camera-placeholder-icon">
                  ◉
                </div>

                <h3>
                  Camera is ready
                </h3>

                <p>
                  Start the camera to scan your document.
                </p>

                <button
                  className="start-camera-button"
                  onClick={startCamera}
                >
                  START CAMERA
                </button>

              </div>
            )}

          </div>


          {/* Camera Error */}
          {cameraError && (
            <div className="camera-error">
              <span>!</span>
              <p>{cameraError}</p>
            </div>
          )}


          {/* Controls */}
          {!captured && cameraActive && (
            <div className="camera-controls">

              <button
                className="capture-button"
                onClick={captureDocument}
                aria-label="Capture document"
              >
                <span></span>
              </button>

              <p>
                Tap to capture
              </p>

            </div>
          )}


          {/* Captured Actions */}
          {captured && (
            <div className="captured-actions">

              <button
                className="retake-button"
                onClick={retakeDocument}
              >
                RETAKE
              </button>

              <button
                className="continue-screening-button"
                onClick={continueScreening}
              >
                <span>
                  CONTINUE
                </span>

                <span className="continue-arrow">
                  →
                </span>
              </button>

            </div>
          )}

        </section>


        {/* Tips */}
        <section className="scanner-tips">

          <div className="scanner-tip">
            <span>☀</span>
            <div>
              <h4>Good lighting</h4>
              <p>
                Avoid shadows and strong reflections.
              </p>
            </div>
          </div>


          <div className="scanner-tip">
            <span>▣</span>
            <div>
              <h4>Full document</h4>
              <p>
                Keep all four corners visible.
              </p>
            </div>
          </div>


          <div className="scanner-tip">
            <span>⌁</span>
            <div>
              <h4>Keep steady</h4>
              <p>
                Hold your phone still while scanning.
              </p>
            </div>
          </div>

        </section>

      </main>

    </div>
  );
}

export default CameraScanner;