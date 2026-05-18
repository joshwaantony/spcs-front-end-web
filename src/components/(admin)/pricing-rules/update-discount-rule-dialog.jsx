"use client";

import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import RuleDialogShell from "@/components/(admin)/pricing-rules/rule-dialog-shell";
import { RuleFormFields } from "@/components/(admin)/pricing-rules/rule-form-fields";
import { updateDiscountRuleSchema } from "@/components/(admin)/pricing-rules/rule-schemas";
import { usePricingRulesStore } from "@/store/admin/pricing-rules/pricing-rules.store";

const mapRuleToValues = (rule) => ({
  name: rule?.name || "",
  minAmount: rule?.minAmount ?? "",
  maxAmount: rule?.maxAmount ?? "",
  type: rule?.type || "PERCENTAGE",
  value: rule?.value ?? "",
  priority: rule?.priority ?? 0,
  isActive: Boolean(rule?.isActive),
});

export default function UpdateDiscountRuleDialog({ open, onOpenChange, rule }) {
  const methods = useForm({
    resolver: zodResolver(updateDiscountRuleSchema),
    defaultValues: mapRuleToValues(rule),
  });
  const updatingDiscount = usePricingRulesStore((state) => state.updatingDiscount);
  const updateDiscountRule = usePricingRulesStore((state) => state.updateDiscountRule);

  useEffect(() => {
    methods.reset(mapRuleToValues(rule));
  }, [methods, rule]);

  const handleSubmit = async (values) => {
    await updateDiscountRule(rule.id, values);
    onOpenChange(false);
  };

  return (
    <RuleDialogShell
      open={open}
      onOpenChange={onOpenChange}
      title="Update Discount Rule"
      description="Edit the selected discount rule without affecting the create form state."
      methods={methods}
      onSubmit={handleSubmit}
      submitLabel="Save changes"
      loading={updatingDiscount}
      variant="light"
    >
      <RuleFormFields kind="discount" variant="light" />
    </RuleDialogShell>
  );
}
