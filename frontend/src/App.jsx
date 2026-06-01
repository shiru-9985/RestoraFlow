import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import ChangePassword
from "./pages/ChangePassword";
import Login from "./pages/Login";

import ClientDashboard from "./pages/ClientDashboard";
import VerifierDashboard from "./pages/VerifierDashboard";
import ManagerDashboard from "./pages/ManagerDashboard";
import AdminDashboard from "./pages/AdminDashboard";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login />} />

        <Route
          path="/client"
          element={<ClientDashboard />}
        />
        <Route
  path="/change-password"
  element={<ChangePassword />}
/>
        <Route
          path="/verifier"
          element={<VerifierDashboard />}
        />

        <Route
          path="/manager"
          element={<ManagerDashboard />}
        />

        <Route
          path="/admin"
          element={<AdminDashboard />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;