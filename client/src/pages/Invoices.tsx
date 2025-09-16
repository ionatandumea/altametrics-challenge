import { InvoiceList } from "@/components/InvoiceList";

export default function Invoices() {
  return (
    <div className="flex-1 p-10">
      <h1 className="mb-6 text-3xl font-bold text-gray-800">📄 Invoices</h1>
      <p className="mb-4 text-gray-600">
        Manage and review all your invoices in one place.
      </p>
      <InvoiceList />
    </div>
  );
}
