"use client";

import { useEffect, useState } from "react";

import type {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { ArrowUpDown, ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useInvoices } from "@/hooks/useInvoices";
import { toast } from "sonner";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Label } from "./ui/label";

export type Invoice = {
  id: string;
  vendorName: string;
  amount: number;
  dueDate: Date;
  userId: number;
  description: string;
  paid: boolean;
};

export const columns: ColumnDef<Invoice>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex justify-center">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "vendorName",
    header: () => <div className="text-left">Payee</div>,
    cell: ({ row }) => (
      <div className="text-left capitalize">{row.getValue("vendorName")}</div>
    ),
    enableSorting: false, // explicitly disable
  },
  {
    accessorKey: "dueDate",
    header: ({ column }) => (
      <div className="flex justify-center">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Due Date
          <ArrowUpDown />
        </Button>
      </div>
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue("dueDate"));
      const formattedDate = date.toLocaleDateString("en-GB");
      return <div className="text-center lowercase">{formattedDate}</div>;
    },
    enableSorting: true, // explicitly enable
  },
  {
    accessorKey: "paid",
    header: () => <div className="text-center">Status</div>,
    cell: ({ row }) => (
      <div className="text-center">
        {JSON.stringify(row.getValue("paid")) === "true" ? "Paid" : "Open"}
      </div>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <div className="text-center">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Amount
          <ArrowUpDown />
        </Button>
      </div>
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);
      return <div className="text-center font-medium">{formatted}</div>;
    },
    enableSorting: true,
  },
  {
    accessorKey: "userId",
    header: () => <div className="text-center">User Id</div>,
    cell: ({ row }) => (
      <div className="text-center font-medium">{row.getValue("userId")}</div>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "description",
    header: () => <div className="text-right">Description</div>,
    cell: ({ row }) => (
      <div className="text-right font-medium">
        {row.getValue("description")}
      </div>
    ),
    enableSorting: false,
  },
];

export function InvoiceList() {
  const { data, isPending, isError } = useInvoices();

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  useEffect(() => {
    if (isError) {
      toast.error("Failed to load invoices!");
    } else if (data?.length) {
      toast.success(`${data.length} invoices loaded successfully`);
    }
  }, [isError, data]);

  if (isPending) {
    return <p className="text-center">Loading...</p>;
  }

  function handleRowClick(invoice: Invoice) {
    console.log("Row clicked:", invoice);
    // Do something, e.g., navigate, open a modal, etc.
  }

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter payees..."
          value={
            (table.getColumn("vendorName")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("vendorName")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <Popover key={row.id}>
                  <PopoverTrigger asChild>
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                      onClick={() => handleRowClick(row.original)}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 space-y-2 rounded-lg border border-gray-200 bg-white p-4 shadow-lg dark:border-gray-500 dark:bg-gray-800">
                    <div className="flex justify-between">
                      <span className="font-semibold">Payee:</span>
                      <span>{row.original.vendorName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold">Amount:</span>
                      <span>
                        {new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "USD",
                        }).format(row.original.amount)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold">Due Date:</span>
                      <span>
                        {new Date(row.original.dueDate).toLocaleDateString(
                          "en-GB",
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold">Status:</span>
                      <span>{row.original.paid ? "Paid" : "Open"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold">User ID:</span>
                      <span>{row.original.userId}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold">Description:</span>
                      <span>{row.original.description}</span>
                    </div>
                  </PopoverContent>
                </Popover>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
