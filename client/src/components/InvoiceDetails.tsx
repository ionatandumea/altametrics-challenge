import { formatCurrency, formatDate } from "@/lib/utils";
import { PopoverContent } from "./ui/popover";
import type { Invoice } from "@/lib/types";

const InvoiceDetails = ({ invoice }: { invoice: Invoice }) => {
  return (
    <PopoverContent className="w-80 space-y-2 rounded-lg border border-gray-200 bg-white p-4 shadow-lg dark:border-gray-500 dark:bg-gray-800">
      <div className="flex justify-between">
        <span className="font-semibold">Payee:</span>
        <span>{invoice.vendorName}</span>
      </div>
      <div className="flex justify-between">
        <span className="font-semibold">Amount:</span>
        <span>{formatCurrency(invoice.amount)}</span>
      </div>
      <div className="flex justify-between">
        <span className="font-semibold">Due Date:</span>
        <span>{formatDate(invoice.dueDate)}</span>
      </div>
      <div className="flex justify-between">
        <span className="font-semibold">Status:</span>
        <span>{invoice.paid ? "Paid" : "Open"}</span>
      </div>
      <div className="flex justify-between">
        <span className="font-semibold">User ID:</span>
        <span>{invoice.userId}</span>
      </div>
      <div className="flex flex-col">
        <span className="font-semibold">Description:</span>
        <span>{invoice.description}</span>
      </div>
    </PopoverContent>
  );
};

export default InvoiceDetails;
