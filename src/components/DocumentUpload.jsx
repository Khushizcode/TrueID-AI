import React, { useRef, useState } from "react";

function DocumentUpload({ documentType = "Aadhaar", onNavigate }) {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelect = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setSelectedFile(file);
  };

  const handleChooseFile = () => {
    fileInputRef.current?.click();
  };

  const handleContinue = () => {
    if (!selectedFile) return;

    onNavigate("result");
  };

  return (
    <div className="document-upload-page">

      {/* Header */}
      <header className="inner-page-header">

        <button
          className="back-button"
          onClick={() => onNavigate("newScreening")}
          aria-label="Go back"
        >
          ←
        </button>

        <div>
          <p className="header-label">TRUEID AI</p>
          <h1>Upload Document</h1>
        </div>

        <div className="header-placeholder"></div>

      </header>


      {/* Main */}
      <main className="document-upload-content">

        {/* Intro */}
        <section className="inner-page-intro">

          <span className="intro-badge">
            DOCUMENT INPUT
          </span>

          <h2>
            Upload your
            <br />
            {documentType}
          </h2>

          <p>
            Upload a clear image or PDF of the identity
            document for AI-powered screening.
          </p>

        </section>


        {/* Upload Area */}
        <section className="upload-section">

          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/jpg,application/pdf"
            onChange={handleFileSelect}
            hidden
          />

          <button
            className={`upload-dropzone ${
              selectedFile ? "file-selected" : ""
            }`}
            onClick={handleChooseFile}
          >

            <div className="upload-icon">
              {selectedFile ? "✓" : "↑"}
            </div>

            {selectedFile ? (
              <>
                <h3>
                  Document selected
                </h3>

                <p>
                  {selectedFile.name}
                </p>
              </>
            ) : (
              <>
                <h3>
                  Choose a document
                </h3>

                <p>
                  Click to browse files from your device
                </p>
              </>
            )}

            <span className="upload-format">
              JPG • PNG • PDF
            </span>

          </button>

        </section>


        {/* Requirements */}
        <section className="upload-requirements">

          <div className="requirements-heading">
            <span>✓</span>

            <div>
              <h3>For accurate screening</h3>
              <p>
                Make sure your document meets these requirements.
              </p>
            </div>
          </div>


          <div className="requirement-list">

            <div className="requirement-item">
              <span>01</span>
              <p>
                Document should be clearly visible
              </p>
            </div>

            <div className="requirement-item">
              <span>02</span>
              <p>
                Avoid blurry or cropped images
              </p>
            </div>

            <div className="requirement-item">
              <span>03</span>
              <p>
                Ensure important details are readable
              </p>
            </div>

          </div>

        </section>


        {/* Continue */}
        <section className="upload-continue-section">

          <button
            className="continue-screening-button"
            disabled={!selectedFile}
            onClick={handleContinue}
          >
            <span>
              CONTINUE SCREENING
            </span>

            <span className="continue-arrow">
              →
            </span>
          </button>

          <p>
            Your document will be processed securely.
          </p>

        </section>

      </main>

    </div>
  );
}

export default DocumentUpload;