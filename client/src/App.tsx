import { Routes, Route } from "react-router-dom";
import Login from "@/pages/Login";
import Invoices from "@/pages/Invoices";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";

const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="bottom-center" />
      <div className="flex min-h-screen items-center justify-center">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/invoices" element={<Invoices />} />
        </Routes>
      </div>
    </QueryClientProvider>
  );
};
