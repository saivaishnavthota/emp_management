import { Routes, Route } from "react-router-dom";
import EmployeeLogin from "./Employee/Components/EmployeeLogin";
import Dashboard from "./HR/Components/Dashboard";
// import ManagerDashboard from "./Components/ManagerDashboard";
import EmployeeDashboard from "./Employee/Components/EmployeeDashboard";
import PrivateRoute from "./PrivateRoute";
import EmployeeAttendence from "./Employee/Components/EmployeeAttendence";
import ApplyLeave from "./Employee/Components/ApplyLeave";
import LeaveManagement from "./HR/Components/LeaveManagement";
import ManagerDashboard from "./Manager/Components/ManagerDashboard";
import EmployeeForm from "./HR/Components/EmployeeForm";
import ManagerEmployees from "./Manager/Components/ManagerEmployees";
import Profile from "./Employee/Components/Profile";
import UpdatePassword from "./Employee/Components/UpdatePassword";
import Dashex from "./Employee/Components/Dashex";
function App() {
  return (
  //  <Routes>
  //     <Route path="/" element={<EmployeeLogin />} />

  //     <Route
  //       path="/hr-dashboard/*"
  //       element={
  //         <PrivateRoute role="HR">
  //           <Dashboard />
  //         </PrivateRoute>
  //       }
  //     />

  //     <Route
  //       path="/manager-dashboard"
  //       element={
  //         <PrivateRoute role="Manager">
  //           <ManagerDashboard />
  //         </PrivateRoute>
  //       }
  //     /> 

  //     <Route
  //       path="/employee-dashboard/*"
  //       element={
  //         <PrivateRoute role="Employee">
  //           <EmployeeDashboard />
  //         </PrivateRoute>
  //       }
  //     />
  //   </Routes> 
  <Dashex/>
  //  <EmployeeDashboard/>
  // <UpdatePassword/>
     );
}

export default App;
