import React, { useEffect } from "react";
import "./App.css";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainDashboard from "./layout/routes/dashboard/MainDashboard";
import { storeSlice } from "./app/storeSlice";
import Login from "./pages/Login/page";
import BudgetPlan from "./pages/Budget/BudgetPlan/page";
import Deliberation from "./pages/Budget/Deliberation/page";
import EnforcementPlan from "./pages/Budget/EnforcementPlan/page";

const App: React.FC = () => {
  const token = localStorage.getItem("token");
  const logoutUser = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  useEffect(() => {
    let timer: any;
    if (token) {
      timer = setTimeout(logoutUser, 30 * 60 * 1000);

      const resetTimer = () => {
        clearTimeout(timer);
        timer = setTimeout(logoutUser, 30 * 60 * 1000);
      };

      document.addEventListener("click", resetTimer);

      document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
          resetTimer();
        }
      });

      // Cleanup: Hapus event listener saat komponen di-unmount
      return () => {
        clearTimeout(timer);
        document.removeEventListener("click", resetTimer);
        document.removeEventListener("visibilitychange", resetTimer);
      };
    }
  }, []);

  return (
    <Provider store={storeSlice}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="Budget" element={<MainDashboard />}>
            <Route path="BudgetPlan" element={<BudgetPlan />} />
            <Route path="FinalBudgetSummary" element={<Deliberation />} />
            <Route path="EnforcementPlan" element={<EnforcementPlan />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
