import { useQuery } from "@tanstack/react-query";
import { fetchInvoiceById, fetchInvoices } from "../api/invoices";
import { queryKeys } from "@/constants/queryKeys";

export const useInvoices = () => {
  return useQuery({
    queryKey: queryKeys.invoices,
    queryFn: fetchInvoices,
  });
};

export const useInvoice = (id: number) => {
  return useQuery({
    queryKey: queryKeys.invoice(id),
    queryFn: () => fetchInvoiceById(id),
  });
};
