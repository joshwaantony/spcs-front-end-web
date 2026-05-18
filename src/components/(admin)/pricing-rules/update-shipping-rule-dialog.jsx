"use client";

import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import RuleDialogShell from "@/components/(admin)/pricing-rules/rule-dialog-shell";
import { RuleFormFields } from "@/components/(admin)/pricing-rules/rule-form-fields";
import { updateShippingRuleSchema } from "@/components/(admin)/pricing-rules/rule-schemas";
import { usePricingRulesStore } from "@/store/admin/pricing-rules/pricing-rules.store";

const mapRuleToValues = (rule) => ({
  name: rule?.name || "",
  minAmount: rule?.minAmount ?? "",
  maxAmount: rule?.maxAmount ?? "",
  chargeValue: rule?.chargeValue ?? "",
  region: rule?.region || "",
  priority: rule?.priority ?? 0,
  isActive: Boolean(rule?.isActive),
});

export default function UpdateShippingRuleDialog({ open, onOpenChange, rule }) {
  const methods = useForm({
    resolver: zodResolver(updateShippingRuleSchema),
    defaultValues: mapRuleToValues(rule),
  });
  const updatingShipping = usePricingRulesStore((state) => state.updatingShipping);
  const updateShippingRule = usePricingRulesStore((state) => state.updateShippingRule);

  useEffect(() => {
    methods.reset(mapRuleToValues(rule));
  }, [methods, rule]);

  const handleSubmit = async (values) => {
    await updateShippingRule(rule.id, values);
    onOpenChange(false);
  };

  return (
    <RuleDialogShell
      open={open}
      onOpenChange={onOpenChange}
      title="Update Shipping Rule"
      description="Edit the selected shipping rule without reusing the create dialog state."
      methods={methods}
      onSubmit={handleSubmit}
      submitLabel="Save changes"
      loading={updatingShipping}
      variant="light"
    >
      <RuleFormFields kind="shipping" variant="light" />
    </RuleDialogShell>
  );
}
