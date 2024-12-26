import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import Dashboard from "./pages/dashboard";
import Auth from "./pages/auth";
import { FinancialRecordProvider } from "./context/FinancialRecordContext";

function App() {
  return (
    <Router>
      <div className="app-container">
        <div className="navbar"></div>

        <Routes>
          <Route
            path="/"
            element={
              <FinancialRecordProvider>
                <Dashboard />
              </FinancialRecordProvider>
            }
          />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;
