"use client";

import { useMemo, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Pencil, Search, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { usePricingRulesStore } from "@/store/admin/pricing-rules/pricing-rules.store";
import CreateDiscountRuleDialog from "@/components/(admin)/pricing-rules/create-discount-rule-dialog";
import UpdateDiscountRuleDialog from "@/components/(admin)/pricing-rules/update-discount-rule-dialog";
import RuleDeleteModal from "@/components/(admin)/pricing-rules/RuleDeleteModal";

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(value || 0));

const formatRange = (minAmount, maxAmount) => {
  if (maxAmount == null || maxAmount === 0) {
    return `${formatCurrency(minAmount)} and above`;
  }

  return `${formatCurrency(minAmount)} - ${formatCurrency(maxAmount)}`;
};

export default function DiscountRulesTable() {
  const [globalFilter, setGlobalFilter] = useState("");
  const [openCreate, setOpenCreate] = useState(false);
  const [editingRule, setEditingRule] = useState(null);
  const [deletingRule, setDeletingRule] = useState(null);

  const discountRules = usePricingRulesStore((state) => state.discountRules);
  const discountLoading = usePricingRulesStore((state) => state.discountLoading);
  const discountError = usePricingRulesStore((state) => state.discountError);
  const deletingDiscountId = usePricingRulesStore((state) => state.deletingDiscountId);
  const deleteDiscountRule = usePricingRulesStore((state) => state.deleteDiscountRule);

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Rule",
        cell: ({ row }) => (
          <div>
            <p className="font-bold text-[#141810]">{row.original.name}</p>
            <p className="mt-1 text-xs text-slate-500">Discount pricing band</p>
          </div>
        ),
      },
      {
        accessorKey: "range",
        header: "Range",
        cell: ({ row }) => (
          <span className="font-semibold text-slate-700">
            {formatRange(row.original.minAmount, row.original.maxAmount)}
          </span>
        ),
      },
      {
        accessorKey: "type",
        header: "Type",
        cell: ({ row }) => <Badge>{row.original.type}</Badge>,
      },
      {
        accessorKey: "value",
        header: "Value",
        cell: ({ row }) =>
          row.original.type === "PERCENTAGE"
            ? `${row.original.value}%`
            : formatCurrency(row.original.value),
      },
      {
        accessorKey: "priority",
        header: "Priority",
        cell: ({ row }) => <Badge variant="priority">P{row.original.priority}</Badge>,
      },
      {
        accessorKey: "isActive",
        header: "Status",
        cell: ({ row }) => (
          <Badge variant={row.original.isActive ? "success" : "muted"}>
            {row.original.isActive ? "Active" : "Inactive"}
          </Badge>
        ),
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <Button variant="light" size="sm" onClick={() => setEditingRule(row.original)}>
              <Pencil className="h-4 w-4" />
              Edit
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => setDeletingRule(row.original)}
            >
              <Trash2 className="h-4 w-4" />
              Delete
            </Button>
          </div>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: discountRules,
    columns,
    state: { globalFilter },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: (row, _columnId, value) => {
      const query = String(value || "").toLowerCase();
      const target = [
        row.original.name,
        row.original.type,
        String(row.original.priority),
      ]
        .join(" ")
        .toLowerCase();
      return target.includes(query);
    },
  });

  return (
    <>
      <section className="rounded-[30px] bg-white p-5 shadow-sm border border-slate-200">
        <div className="flex flex-col gap-4 border-b border-slate-200 pb-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h3 className="text-2xl font-black tracking-tight text-[#141810]">
              Discount Rules
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              Manage discount bands with API-backed forms, instant search, and live edits.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative min-w-60 w-full sm:w-auto">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                value={globalFilter}
                onChange={(event) => setGlobalFilter(event.target.value)}
                placeholder="Search discount rules"
                className="pl-11 bg-[#F3F4F6] border border-[#E5E7EB] text-[#141810] focus:border-[#46EC12] focus:bg-white placeholder:text-slate-500"
              />
            </div>
            <Button
              className="bg-[#46EC12] text-[#141810] hover:brightness-95"
              onClick={() => setOpenCreate(true)}
            >
              Add Rule
            </Button>
          </div>
        </div>

        <div className="mt-5 overflow-hidden rounded-3xl border border-slate-200 bg-white">
          <div className="max-h-130 overflow-auto">
            <Table>
              <TableHeader className="sticky top-0 z-10 bg-slate-50">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id} className="border-b border-slate-200">
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id} className="bg-slate-50 text-slate-500">
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>

              <TableBody>
                {discountLoading ? (
                  Array.from({ length: 5 }).map((_, index) => (
                    <TableRow key={`discount-skeleton-${index}`} className="border-b border-slate-200 bg-white">
                      <TableCell colSpan={7} className="bg-white">
                        <div className="grid gap-3 md:grid-cols-5">
                          <Skeleton className="h-10" />
                          <Skeleton className="h-10" />
                          <Skeleton className="h-10" />
                          <Skeleton className="h-10" />
                          <Skeleton className="h-10" />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : discountError ? (
                  <EmptyRow
                    title="Could not load discount rules"
                    message={discountError}
                    colSpan={7}
                    isLight
                  />
                ) : table.getRowModel().rows.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id} className="border-b border-slate-200 bg-white hover:bg-slate-50">
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id} className="text-[#141810] bg-white">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <EmptyRow
                    title="No discount rules found"
                    message="Try another search or add the first pricing band."
                    colSpan={7}
                    isLight
                  />
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        <TablePagination table={table} />
      </section>

      <CreateDiscountRuleDialog open={openCreate} onOpenChange={setOpenCreate} />
      <UpdateDiscountRuleDialog
        open={!!editingRule}
        onOpenChange={(nextOpen) => {
          if (!nextOpen) {
            setEditingRule(null);
          }
        }}
        rule={editingRule}
      />

      <RuleDeleteModal
        isOpen={!!deletingRule}
        rule={deletingRule}
        kind="discount"
        deleting={deletingDiscountId === deletingRule?.id}
        deleteError={discountError}
        onClose={() => setDeletingRule(null)}
        onDelete={async (id) => {
          if (!id) return;
          await deleteDiscountRule(id);
          setDeletingRule(null);
        }}
      />
    </>
  );
}

function EmptyRow({ title, message, colSpan, isLight = false }) {
  return (
    <TableRow>
      <TableCell colSpan={colSpan} className="py-16 text-center bg-white">
        <div>
          <p className={`text-lg font-black ${isLight ? "text-[#141810]" : "text-white"}`}>
            {title}
          </p>
          <p
            className={`mt-2 text-sm ${isLight ? "text-slate-500" : "text-white/50"}`}
          >
            {message}
          </p>
        </div>
      </TableCell>
    </TableRow>
  );
}

function TablePagination({ table }) {
  return (
    <div className="mt-5 flex flex-col gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-slate-600">
        Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount() || 1}
      </p>
      <div className="flex items-center gap-2">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
