import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Dashboard} from "./screens/ReportsScreen";
import {DashboardLayout} from "./layouts/DashboardLayout.tsx";
import {UserManagementScreen} from "./screens/UserManagementScreen.tsx";
import {LoginScreen} from "./screens/LoginScreen";
import PatientsScreen from "./screens/PatientsScreen/index.tsx";
import ReportFormat from "./screens/ReportsScreen/ReportFormat";
import ReportsGeneratedScreen from "./screens/ReportsGeneratedScreen";
import ReportFormatsScreen from "./screens/ReportFormatsScreen";

function App() {

  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route path="*" Component={DashboardLayout}>
                    <Route path="" Component={Dashboard}>
                        <Route path=":reportFormat/:reportId" Component={ReportFormat} />
                    </Route>
                    <Route path="users" Component={UserManagementScreen} />
                    <Route path="patients" Component={PatientsScreen} />
                    <Route path="reports" Component={ReportsGeneratedScreen} />
                    <Route path="report-formats/:reportId?" Component={ReportFormatsScreen} />
                </Route>
                <Route path="/login" Component={LoginScreen} />
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
