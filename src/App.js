import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import EmployeeLogin from "./Employee/Components/EmployeeLogin";
import Dashboard from "./HR/Components/Dashboard";
import ManagerDashboard from "./Manager/Components/ManagerDashboard";
import EmployeeDashboard from "./Employee/Components/EmployeeDashboard";
import NewUserDetails from "./OnboardingEmployee/NewUserDetails";
import NewUserDocsUpload from "./OnboardingEmployee/NewUserDocsUpload";
import ApplyLeave from "./Employee/Components/ApplyLeave";
import ManagerApplyLeave from "./Manager/Components/ManagerApplyLeave";
function App() {
  return (
    <Routes>
       <Route path="/" element={<EmployeeLogin />} />      
    <Route path="/new-user-form" element={  < NewUserDetails/> } />
      <Route path="/new-user-form/docs" element={<NewUserDocsUpload />} />
  
    <Route
        path="/hr-dashboard/*"
        element={
          <PrivateRoute role="HR">
            <Dashboard />
          </PrivateRoute>
        }
      /> 

      <Route
        path="/manager-dashboard"
        element={
          <PrivateRoute role="Manager">
            <ManagerDashboard />
          </PrivateRoute>
        }
      /> 

      <Route
        path="/employee-dashboard/*"
        element={
          <PrivateRoute role="Employee">
            <EmployeeDashboard />
          </PrivateRoute>
        }
      />
  </Routes>

  )
}


export default App;
