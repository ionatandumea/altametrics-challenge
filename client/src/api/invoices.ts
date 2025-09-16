import { apiClient } from "./apiClient";

export const fetchInvoices = async () => {
  const { data } = await apiClient.get("/invoices");

  return data;
};

export const fetchInvoiceById = async (id: number) => {
  const { data } = await apiClient.get(`/users/${id}`);

  return data;
};
