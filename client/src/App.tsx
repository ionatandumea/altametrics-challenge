import { Routes, Route } from "react-router-dom";
import Login from "@/pages/Login";
import Invoices from "@/pages/Invoices";
import { Provider } from "react-redux";
import { store } from "./store";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Toaster position="bottom-center" />
        <div className="flex min-h-screen items-center justify-center">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/invoices"
              element={
                <ProtectedRoute>
                  <Invoices />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Provider>
    </QueryClientProvider>
  );
};
