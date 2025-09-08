import React, { useState, useRef } from "react";
import "../Styles/EmployeeUploadDocs.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
const EmployeeUploadDocs = () => {

    const [formData, setFormData] = useState({
    aadhar: null,
    pan: null,
    graduation: null,
    tenth: null,
    intermediate: null,
  });

  const fileRefs = {
    aadhar: useRef(null),
    pan: useRef(null),
    graduation: useRef(null),
    tenth: useRef(null),
    intermediate: useRef(null),
  };


  const handleFileChange = (e) => {
    const { name, files } = e.target;
     if (files.length > 0) {
    setFormData({ ...formData, [name]: files[0] });
     }
  };
  
  const handleRemove = (field) => {
    setFormData({ ...formData, [field]: null });
    if (fileRefs[field].current) {
      fileRefs[field].current.value = ""; 
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.aadhar ||
      !formData.pan ||
      !formData.graduation 
    ) {
      alert("Please upload all required documents!");
      return;
    }

    alert("Documents uploaded successfully!");
    console.log(formData);
  };

const renderPreview = (file, field) => {
    if (!file) return null;

    const fileType = file.type;
    return (
      <div className="file-preview">
        {fileType === "application/pdf" ? (
          <FontAwesomeIcon icon={faFilePdf} className="icon-pdf" />
        ) : (
          <img
            src={URL.createObjectURL(file)}
            alt="preview"
            className="img-preview"
          />
        )}
        <span className="file-name">{file.name}</span>
        <button
          type="button"
          className="btn-remove"
          onClick={() => handleRemove(field)}
        >
          <FontAwesomeIcon icon={faTimesCircle} />
        </button>
      </div>
    );
  };

  return (
     <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="form-box shadow-lg p-4 rounded">
        <h2 className="text-center mb-4">Upload Documents</h2>
        <form onSubmit={handleSubmit}>
          
          <div className="mb-3 d-flex align-items-center justify-content-between">
            <div className="flex-grow-1">
              <label className="form-label">Aadhar</label>
              <input
                type="file"
                name="aadhar"
                className="form-control"
                accept=".jpg,.jpeg,.pdf"
                onChange={handleFileChange}
                ref={fileRefs.aadhar}
                required
              />
            </div>
            {renderPreview(formData.aadhar, "aadhar")}
          </div>

          <div className="mb-3 d-flex align-items-center justify-content-between">
            <div className="flex-grow-1">
              <label className="form-label">PAN</label>
              <input
                type="file"
                name="pan"
                className="form-control"
                accept=".jpg,.jpeg,.pdf"
                onChange={handleFileChange}
                ref={fileRefs.pan}
                required
              />
            </div>
            {renderPreview(formData.pan, "pan")}
          </div>

      
          <div className="mb-3 d-flex align-items-center justify-content-between">
            <div className="flex-grow-1">
              <label className="form-label">Recent Graduation Certificate</label>
              <input
                type="file"
                name="graduation"
                className="form-control"
                accept=".jpg,.jpeg,.pdf"
                onChange={handleFileChange}
                ref={fileRefs.graduation}
                required
              />
            </div>
            {renderPreview(formData.graduation, "graduation")}
          </div>

          
          <div className="mb-3 d-flex align-items-center justify-content-between">
            <div className="flex-grow-1">
              <label className="form-label">10th Certificate</label>
              <input
                type="file"
                name="tenth"
                className="form-control"
                accept=".jpg,.jpeg,.pdf"
                onChange={handleFileChange}
                ref={fileRefs.tenth}
               
              />
            </div>
            {renderPreview(formData.tenth, "tenth")}
          </div>

          
          <div className="mb-3 d-flex align-items-center justify-content-between">
            <div className="flex-grow-1">
              <label className="form-label">Intermediate Certificate</label>
              <input
                type="file"
                name="intermediate"
                className="form-control"
                accept=".jpg,.jpeg,.pdf"
                onChange={handleFileChange}
                ref={fileRefs.intermediate}
                
              />
            </div>
            {renderPreview(formData.intermediate, "intermediate")}
          </div>

        
          <button type="submit" className="btn-upload w-100">
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

export default EmployeeUploadDocs

