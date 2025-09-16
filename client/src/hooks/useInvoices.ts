import { useQuery } from "@tanstack/react-query";
import { fetchInvoiceById, fetchInvoices } from "../api/invoices";

const QUERY_KEY = "invoices";

export const useInvoices = () => {
  return useQuery({
    queryKey: [QUERY_KEY],
    queryFn: fetchInvoices,
  });
};

export const useInvoice = (id: number) => {
  return useQuery({
    queryKey: [QUERY_KEY, id],
    queryFn: () => fetchInvoiceById(id), 
  });
};
