/**
 *
 * @returns
 */

import { useUser } from "@clerk/clerk-react";
import { FinancialRecordForm } from "./FinancialRecordForm";
import "./pages/dashboard/financial-record.css";
import { FinancialRecordList } from "./FinancialRecordList";
const Dashboard = () => {
  const { user } = useUser();
  return (
    <div className="dashboard-container">
      <h1>Welcome {user?.firstName}! Here are your Finances</h1>
      <FinancialRecordForm />
      <div></div>
      <FinancialRecordList />
    </div>
  );
};

export default Dashboard;
