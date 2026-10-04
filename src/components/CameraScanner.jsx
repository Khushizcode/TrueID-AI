import React, { useEffect, useRef, useState } from "react";
import { createScreening } from "../services/api";

function CameraScanner({
  documentType = "Aadhaar",
  purpose = "Identity Verification",
  onNavigate,
  onComplete,
}) {
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState("");
  const [captured, setCaptured] = useState(false);
  const [capturedFile, setCapturedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  const startCamera = async () => {
    try {
      setCameraError("");
      setVideoReady(false);

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: "environment" },
        },
        audio: false,
      });

      streamRef.current = stream;

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

  // The video element only exists after the camera becomes active,
  // so the stream is attached here.
  useEffect(() => {
    if (cameraActive && videoRef.current && streamRef.current) {
      videoRef.current.srcObject = streamRef.current;
    }
  }, [cameraActive]);

   const captureDocument = () => {
    const video = videoRef.current;

    if (!cameraActive || !video || !video.videoWidth) return;

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Reject a black frame (camera not ready yet)
    const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let total = 0;
    let count = 0;

    for (let i = 0; i < pixels.length; i += 800) {
      total += pixels[i] + pixels[i + 1] + pixels[i + 2];
      count += 3;
    }

    if (count === 0 || total / count < 8) {
      setCameraError(
        "The captured image is black. Wait until the live picture appears, then try again."
      );
      return;
    }

    canvas.toBlob(
      (blob) => {
        if (!blob) {
          setCameraError("Could not capture the image. Please try again.");
          return;
        }

        const file = new File([blob], "camera-capture.jpg", {
          type: "image/jpeg",
        });

        setCapturedFile(file);
        setPreviewUrl(URL.createObjectURL(blob));
        setCaptured(true);
        stopCamera();
      },
      "image/jpeg",
      0.92
    );
  };

  const retakeDocument = () => {
    setCaptured(false);
    setCapturedFile(null);
    setPreviewUrl("");
    startCamera();
  };

  const continueScreening = async () => {
    if (!capturedFile || loading) return;

    setCameraError("");
    setLoading(true);

    try {
      const result = await createScreening({
        documentType,
        purpose,
        file: capturedFile,
      });

      onComplete(result);
    } catch (err) {
      setCameraError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

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

                <img
                  src={previewUrl}
                  alt="Captured document"
                  style={{
                    width: "100%",
                    borderRadius: "16px",
                    display: "block",
                  }}
                />

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
                  onPlaying={() => setTimeout(() => setVideoReady(true), 800)}
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
                disabled={!videoReady}
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
                disabled={loading}
              >
                RETAKE
              </button>

              <button
                className="continue-screening-button"
                onClick={continueScreening}
                disabled={loading}
              >
                <span>
                  {loading ? "ANALYZING..." : "CONTINUE"}
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