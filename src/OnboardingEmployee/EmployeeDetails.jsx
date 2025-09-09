import React, { useState, useEffect } from "react";
import { FaUpload, FaCheckCircle } from "react-icons/fa";
import "./DocUpload.css";

const acceptedFormats = [".pdf", ".doc", ".docx", ".jpg", ".png"];

const sections = {
  employeeDocs: {
    title: "Employee Documents",
    fields: [
      { name: "resume", label: "Updated Resume", required: false },
      { name: "offerLetter", label: "Offer Letter", required: false },
      { name: "compensation", label: "Latest Compensation Letter", required: false },
      { name: "experience", label: "Experience & Relieving Letter", required: false },
      { name: "payslips", label: "Latest 3 months Pay Slips", required: false },
      { name: "form16", label: "Form 16/ Form 12B / Taxable Income Statement", required: false },
    ],
  },
  educationDocs: {
    title: "Educational Documents",
    fields: [
      { name: "ssc", label: "SSC Certificate", required: false },
      { name: "hsc", label: "HSC Certificate", required: false },
      { name: "hscMark", label: "HSC Marksheet", required: false },
      { name: "gradMark", label: "Graduation Marksheet", required: false },
      { name: "latestGrad", label: "Latest Graduation", required: true },
      { name: "pgMark", label: "Post-Graduation Marksheet", required: false },
      { name: "pgCert", label: "Post-Graduation Certificate", required: false },
    ],
  },
  identityDocs: {
    title: "Identity Proof",
    fields: [
      { name: "aadhar", label: "Aadhar", required: true },
      { name: "pan", label: "PAN", required: true },
      { name: "passport", label: "Passport", required: false },
    ],
  },
};

export default function EmployeeDetails() {
  const [files, setFiles] = useState({});
  const [previewUrls, setPreviewUrls] = useState({});
  const [openSection, setOpenSection] = useState(null);

  // validate required fields
  const isFormValid = () => {
    for (const [, section] of Object.entries(sections)) {
      for (const field of section.fields) {
        if (field.required && !files[field.name]) {
          return false;
        }
      }
    }
    return true;
  };

  // Save Draft API
  const handleDraft = async () => {
    const formData = new FormData();
    Object.keys(files).forEach((key) => {
      if (files[key]) {
        formData.append(key, files[key]);
      }
    });

    try {
      const response = await fetch("http://localhost:5000/api/draft-upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Draft saved successfully!");
      } else {
        alert("Failed to save draft.");
      }
    } catch (error) {
      console.error(error);
      alert("Error while saving draft.");
    }
  };

  // Submit API
  const handleSubmit = async () => {
    if (!isFormValid()) {
      alert("Please upload all required documents before submitting!");
      return;
    }

    const formData = new FormData();
    Object.keys(files).forEach((key) => {
      if (files[key]) {
        formData.append(key, files[key]);
      }
    });

    try {
      const response = await fetch("http://localhost:5000/api/submit-upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Documents submitted successfully!");
      } else {
        alert("Failed to submit documents.");
      }
    } catch (error) {
      console.error(error);
      alert("Error while submitting documents.");
    }
  };

  // load draft data if available
  useEffect(() => {
    async function fetchData() {
      const data = {}; // replace with GET API for draft if available
      setFiles(data);
    }
    fetchData();
  }, []);

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      setFiles({ ...files, [field]: file });
      setPreviewUrls({ ...previewUrls, [field]: URL.createObjectURL(file) });
    }
  };

  const getUploadedCount = (section) =>
    section.fields.filter((f) => files[f.name]).length;

  return (
    <div className="upload-container">
      <div className="upload-box">
        <h4>Documents Upload</h4>
        <h6 id="text">Please upload the required documents</h6>
        {Object.entries(sections).map(([key, section]) => (
          <div key={key} className="section">
            <div
              className="section-header"
              onClick={() => setOpenSection(openSection === key ? null : key)}
            >
              <h5>{section.title}</h5>
              <span className="count">
                {getUploadedCount(section)} / {section.fields.length} uploaded
              </span>
              <span className="arrow">{openSection === key ? "▲" : "▼"}</span>
            </div>

            {openSection === key && (
              <div className="section-content">
                {section.fields.map((field) => (
                  <div
                    key={field.name}
                    className={`upload-card ${files[field.name] ? "uploaded" : ""}`}
                    onClick={() => document.getElementById(field.name).click()}
                  >
                    <div className="upload-label">
                      {field.label}{" "}
                      {field.required && <span className="required">*</span>}
                    </div>
                    <div className="upload-status">
                      {files[field.name] ? (
                        <>
                          <FaCheckCircle className="icon success" /> Uploaded
                        </>
                      ) : (
                        <>
                          <FaUpload className="icon" /> Click to upload
                        </>
                      )}
                    </div>

                    <input
                      id={field.name}
                      type="file"
                      accept={acceptedFormats.join(",")}
                      style={{ display: "none" }}
                      onChange={(e) => handleFileChange(e, field.name)}
                    />

                    {files[field.name] && (
                      <a
                        href={previewUrls[field.name]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="preview-link"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {files[field.name].name}
                      </a>
                    )}
                  </div>
                ))}
                <p className="note">
                  Accepted formats: {acceptedFormats.join(", ")}
                </p>
              </div>
            )}
          </div>
        ))}

        <div className="button-group">
          <button type="button" className="btn draft" onClick={handleDraft}>
            Save Draft
          </button>
          <button type="button" className="btn submit" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
