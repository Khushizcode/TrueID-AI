import { useState } from "react";

function NewScreening({
  onNavigate,
  screeningData,
  onUpdateScreeningData,
}) {
  const [documentType, setDocumentType] = useState(
    screeningData?.documentType || "Aadhaar"
  );

  const [purpose, setPurpose] = useState(
    screeningData?.purpose || "Identity Verification"
  );

  const documentTypes = [
    "Aadhaar",
    "Passport",
    "Driving License",
    "Voter ID",
  ];

  const handleDocumentTypeChange = (type) => {
    setDocumentType(type);

    onUpdateScreeningData({
      documentType: type,
    });
  };

  const handlePurposeChange = (event) => {
    const selectedPurpose = event.target.value;

    setPurpose(selectedPurpose);

    onUpdateScreeningData({
      purpose: selectedPurpose,
    });
  };

  const handleUpload = () => {
    onUpdateScreeningData({
      documentType,
      purpose,
    });

    onNavigate("documentUpload");
  };

  const handleCamera = () => {
    onUpdateScreeningData({
      documentType,
      purpose,
    });

    onNavigate("cameraScanner");
  };

  return (
    <div className="new-screening-page">

      {/* HEADER */}
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
          <h1>New Screening</h1>
        </div>

        <div className="header-placeholder"></div>

      </header>


      {/* MAIN CONTENT */}
      <main className="new-screening-content">

        {/* INTRO */}
        <section className="inner-page-intro">

          <span className="intro-badge">
            NEW VERIFICATION
          </span>

          <h2>
            Start identity
            <br />
            screening
          </h2>

          <p>
            Select the identity document you want to
            verify and provide the document using upload
            or camera scan.
          </p>

        </section>


        {/* DOCUMENT TYPE */}
        <section className="form-section">

          <div className="form-section-heading">

            <div>

              <span className="form-number">
                01
              </span>

              <div>

                <h3>
                  Document type
                </h3>

                <p>
                  Select the document you want to verify
                </p>

              </div>

            </div>

          </div>


          <div className="document-type-grid">

            {documentTypes.map((type) => (

              <button
                key={type}
                className={`document-type-card ${
                  documentType === type
                    ? "selected"
                    : ""
                }`}
                onClick={() =>
                  handleDocumentTypeChange(type)
                }
              >

                <span className="document-type-icon">

                  {type === "Aadhaar" && "▣"}

                  {type === "Passport" && "▤"}

                  {type === "Driving License" && "▱"}

                  {type === "Voter ID" && "☷"}

                </span>

                <span>
                  {type}
                </span>

                {documentType === type && (

                  <span className="selected-check">
                    ✓
                  </span>

                )}

              </button>

            ))}

          </div>

        </section>


        {/* DOCUMENT INPUT */}
        <section className="form-section">

          <div className="form-section-heading">

            <div>

              <span className="form-number">
                02
              </span>

              <div>

                <h3>
                  Provide document
                </h3>

                <p>
                  Upload an image or scan using camera
                </p>

              </div>

            </div>

          </div>


          <div className="document-input-options">

            {/* UPLOAD */}

            <button
              className="input-option-card"
              onClick={handleUpload}
            >

              <div className="input-option-icon">
                ↑
              </div>

              <div className="input-option-text">

                <h4>
                  Upload document
                </h4>

                <p>
                  JPG, PNG or PDF
                </p>

              </div>

              <span className="input-option-arrow">
                →
              </span>

            </button>


            {/* CAMERA */}

            <button
              className="input-option-card"
              onClick={handleCamera}
            >

              <div className="input-option-icon camera-option">
                ◉
              </div>

              <div className="input-option-text">

                <h4>
                  Use camera
                </h4>

                <p>
                  Scan document directly
                </p>

              </div>

              <span className="input-option-arrow">
                →
              </span>

            </button>

          </div>

        </section>


        {/* SCREENING PURPOSE */}
        <section className="form-section">

          <div className="form-section-heading">

            <div>

              <span className="form-number">
                03
              </span>

              <div>

                <h3>
                  Screening purpose
                </h3>

                <p>
                  Why are you verifying this identity?
                </p>

              </div>

            </div>

          </div>


          <select
            className="purpose-select"
            value={purpose}
            onChange={handlePurposeChange}
          >

            <option value="Identity Verification">
              Identity Verification
            </option>

            <option value="KYC Verification">
              KYC Verification
            </option>

            <option value="Employee Verification">
              Employee Verification
            </option>

            <option value="Visitor Verification">
              Visitor Verification
            </option>

            <option value="Other">
              Other
            </option>

          </select>

        </section>


        {/* CONTINUE */}
        <section className="continue-section">

          <p>
            Select a document and choose how you want
            to provide it.
          </p>

        </section>

      </main>

    </div>
  );
}

export default NewScreening;