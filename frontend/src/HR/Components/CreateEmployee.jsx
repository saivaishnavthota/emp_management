import React, { useState } from "react";
import "../Styles/CreateEmployee.css";
const CreateEmployee = () => {
    const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const token = localStorage.getItem("token");

    const response = await fetch("http://127.0.0.1:8000/users/hr/create_employee", {
      method: "POST",
      headers: { "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
       },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (response.ok) {
      alert(`✅ Employee Created! ID: ${data.employeeId}`);
      setFormData({ name: "", email: "", role: "" }); 
    } else {
      alert(`❌ Error:  ${data.detail || "Something went wrong"}`);
    }
  } catch (error) {
    console.error("Error creating employee:", error);
    alert("Server error, please try again.");
  }
};


  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="form-box shadow-lg p-4 rounded">
        <h2 className="text-center mb-4">Registration</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email ID</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Role</label>
            <select
              name="role"
              className="form-select"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="HR">HR</option>
              <option value="Manager">Manager</option>
              <option value="Employee">Employee</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary w-50">
            Create
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreateEmployee;

