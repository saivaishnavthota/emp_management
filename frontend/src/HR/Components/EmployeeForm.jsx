import React, { useEffect, useState } from "react";

export default function EmployeeForm() {
  const [employees, setEmployees] = useState([]);
  const [managersList, setManagersList] = useState([]);
  const [HRList, setHRList] = useState([]);
  const [editRow, setEditRow] = useState(null); 
  const [selectedHR, setSelectedHR] = useState({});
  const [selectedMgr, setSelectedMgr] = useState({});

  const fetchEmployees = () => {
    fetch("/mock-data/employees.json")
      .then((res) => res.json())
      .then((data) => setEmployees(data))
      .catch((err) => console.error("Error fetching employees:", err));
  };

  useEffect(() => {
    fetchEmployees();

    fetch("/mock-data/managers.json")
      .then((res) => res.json())
      .then((data) => setManagersList(data))
      .catch((err) => console.error("Error fetching managers:", err));

    fetch("/mock-data/hr.json")
      .then((res) => res.json())
      .then((data) => setHRList(data))
      .catch((err) => console.error("Error fetching HR:", err));
  }, []);

  const submitChanges = (empId) => {
    const hrId = selectedHR[empId];
    const mgrId = selectedMgr[empId];
    const requests = [];

    if (hrId) {
      requests.push(
        fetch(`https://c284c314e7d7.ngrok-free.app/employees/${empId}/hr`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ hrId }),
        })
      );
    }

    if (mgrId) {
      requests.push(
        fetch(`https://7af2b81040a6.ngrok-free.app/employees/${empId}/manager`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ mgrId }),
        })
      );
    }

    Promise.all(requests)
      .then(() => {
        fetchEmployees();
        setSelectedHR((prev) => ({ ...prev, [empId]: "" }));
        setSelectedMgr((prev) => ({ ...prev, [empId]: "" }));
        setEditRow(null);
      })
      .catch((err) => console.error("Error submitting:", err));
  };

  return (
    <div className="employee-form">
      <div className="table-responsive m-5">
        <table className="table table-sm table-bordered table-striped text-center small-table-text">
          <thead className="thead-dark">
            <tr>
              <th>S.No</th>
              <th>Employee Details</th>
              <th>Role</th>
              <th>HR(s)</th>
              <th>Manager(s)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp, empIndex) => {
              const isEditing = editRow === emp.employeeId;
              return (
                <tr key={emp.employeeId}>
                  <td>{empIndex + 1}</td>
                  <td>
                    {emp.name}
                    <br />
                    <span style={{ fontSize: "0.85em", color: "#888" }}>
                      {emp.email}
                    </span>
                  </td>
                  <td>{emp.role}</td>
                  <td>
                    {emp.hr.length > 0 ? (
                      emp.hr.map((hr, i) => <div key={i}>{hr}</div>)
                    ) : (
                      <span style={{ color: "#999" }}>Not Assigned</span>
                    )}

                    {isEditing && (
                      <div style={{ marginTop: "5px" }}>
                        <select
                          value={selectedHR[emp.employeeId] || ""}
                          onChange={(e) =>
                            setSelectedHR((prev) => ({
                              ...prev,
                              [emp.employeeId]: e.target.value,
                            }))
                          }
                        >
                          <option value="">Select HR</option>
                          {HRList.map((hr) => (
                            <option key={hr.id} value={hr.id}>
                              {hr.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                  </td>
                  <td>
                    {emp.managers.length > 0 ? (
                      emp.managers.map((mgr, i) => <div key={i}>{mgr}</div>)
                    ) : (
                      <span style={{ color: "#999" }}>Not Assigned</span>
                    )}

                    {isEditing && (
                      <div style={{ marginTop: "5px" }}>
                        <select
                          value={selectedMgr[emp.employeeId] || ""}
                          onChange={(e) =>
                            setSelectedMgr((prev) => ({
                              ...prev,
                              [emp.employeeId]: e.target.value,
                            }))
                          }
                        >
                          <option value="">Select Manager</option>
                          {managersList.map((mgr) => (
                            <option key={mgr.id} value={mgr.id}>
                              {mgr.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                  </td>
                  <td>
                    {isEditing ? (
                      <>
                        <button
                          className="btn btn-sm btn-warning me-2"
                          onClick={() => setEditRow(null)}
                        >
                          Cancel
                        </button>
                        <button
                          className="btn btn-sm btn-primary"
                          onClick={() => submitChanges(emp.employeeId)}
                        >
                          Submit
                        </button>
                      </>
                    ) : (
                      <button
                        className="btn btn-sm btn-warning"
                        onClick={() => setEditRow(emp.employeeId)}
                      >
                        Edit
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
