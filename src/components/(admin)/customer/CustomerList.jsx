"use client";

import { useEffect } from "react";
import { useCustomersStore } from "@/store/admin/customers/customers.store";
import CustomerRow from "./CustomerRow";

export default function CustomerList() {
  const { customers, loading, error, fetchCustomers } = useCustomersStore();

  useEffect(() => {
    fetchCustomers(1);
  }, [fetchCustomers]);

  if (loading) {
    return (
      <div className="flex-1 min-h-0 overflow-y-auto rounded-2xl border border-gray-100 bg-white">
        <div className="space-y-3 p-3 sm:space-y-4 sm:p-4 lg:p-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-24 animate-pulse rounded-2xl border border-gray-100 bg-gray-50 sm:h-28"
            />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 min-h-0 overflow-y-auto rounded-2xl border border-red-100 bg-red-50 px-4 py-4 text-sm font-medium text-red-600 sm:px-5">
        {error}
      </div>
    );
  }

  if (!customers?.length) {
    return (
      <div className="flex-1 min-h-0 overflow-y-auto rounded-2xl border border-dashed border-gray-200 bg-white px-4 py-10 text-center text-sm font-medium text-gray-500 sm:px-6 sm:py-12">
        No customers found for the selected filters.
      </div>
    );
  }

  return (
    <div className="flex-1 min-h-0 overflow-y-auto rounded-2xl border border-gray-100 bg-white">
      <div className="space-y-3 p-3 sm:space-y-4 sm:p-4 lg:p-6">
        {customers.map((customer) => (
          <CustomerRow
            key={customer.user_id}
            userId={customer.user_id}
            name={customer.name}
            phone={customer.phone}
            address={customer.address}
            city={customer.city}
            district={customer.district}
            state={customer.state}
            pin={customer.pin_code}
            createdAt={customer.created_at}
          />
        ))}
      </div>
    </div>
  );
}
