"use client";

import { useEffect } from "react";
import Sidebar from "@/components/(admin)/layout/Sidebar";
import Header from "@/components/(admin)/pricing-rules/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePricingRulesStore } from "@/store/admin/pricing-rules/pricing-rules.store";
import DiscountRulesTable from "@/components/(admin)/pricing-rules/discount-rules-table";
import ShippingRulesTable from "@/components/(admin)/pricing-rules/shipping-rules-table";

export default function PricingRulesPage() {
  const fetchDiscountRules = usePricingRulesStore((state) => state.fetchDiscountRules);
  const fetchShippingRules = usePricingRulesStore((state) => state.fetchShippingRules);

  useEffect(() => {
    fetchDiscountRules().catch(() => {});
    fetchShippingRules().catch(() => {});
  }, [fetchDiscountRules, fetchShippingRules]);

  return (
    <div className="bg-background-light min-h-screen text-charcoal">
      <div className="flex h-screen overflow-hidden gap-6 p-6">
        <Sidebar />

        <main className="flex-1 flex flex-col gap-3 overflow-hidden">
          <div className="flex-1 overflow-y-auto">
                  <Header />
            <div className="bg-white rounded-[24px] p-4 sm:p-6">
        

              <div className="mt-6 space-y-6">
                <Tabs defaultValue="discount" className="w-full">
                  <TabsList>
                    <TabsTrigger value="discount">Discount Rules</TabsTrigger>
                    <TabsTrigger value="shipping">Shipping Rules</TabsTrigger>
                  </TabsList>

                  <TabsContent value="discount">
                    <DiscountRulesTable />
                  </TabsContent>

                  <TabsContent value="shipping">
                    <ShippingRulesTable />
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
