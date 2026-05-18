"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import RuleDialogShell from "@/components/(admin)/pricing-rules/rule-dialog-shell";
import { RuleFormFields } from "@/components/(admin)/pricing-rules/rule-form-fields";
import { createDiscountRuleSchema } from "@/components/(admin)/pricing-rules/rule-schemas";
import { usePricingRulesStore } from "@/store/admin/pricing-rules/pricing-rules.store";

const defaultValues = {
  name: "",
  minAmount: "",
  maxAmount: "",
  type: "PERCENTAGE",
  value: "",
  priority: 30,
  isActive: true,
};

export default function CreateDiscountRuleDialog({ open, onOpenChange }) {
  const methods = useForm({
    resolver: zodResolver(createDiscountRuleSchema),
    defaultValues,
  });
  const creatingDiscount = usePricingRulesStore((state) => state.creatingDiscount);
  const createDiscountRule = usePricingRulesStore((state) => state.createDiscountRule);

  const handleSubmit = async (values) => {
    await createDiscountRule(values);
    methods.reset(defaultValues);
    onOpenChange(false);
  };

  return (
    <RuleDialogShell
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) {
          methods.reset(defaultValues);
        }
        onOpenChange(nextOpen);
      }}
      title="Create Discount Rule"
      description="Add a new discount band with the same fields used by your pricing API."
      methods={methods}
      onSubmit={handleSubmit}
      submitLabel="Create rule"
      loading={creatingDiscount}
      variant="light"
    >
      <RuleFormFields kind="discount" variant="light" />
    </RuleDialogShell>
  );
}
