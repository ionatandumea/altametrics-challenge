import { Routes, Route } from "react-router-dom";
import Login from "@/pages/Login";
import Invoices from "@/pages/Invoices";

export const App = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/invoices" element={<Invoices />} />
      </Routes>
    </div>
  );
};
