"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import RuleDialogShell from "@/components/(admin)/pricing-rules/rule-dialog-shell";
import { RuleFormFields } from "@/components/(admin)/pricing-rules/rule-form-fields";
import { createShippingRuleSchema } from "@/components/(admin)/pricing-rules/rule-schemas";
import { usePricingRulesStore } from "@/store/admin/pricing-rules/pricing-rules.store";

const defaultValues = {
  name: "",
  minAmount: "",
  maxAmount: "",
  chargeValue: "",
  region: "",
  priority: 30,
  isActive: true,
};

export default function CreateShippingRuleDialog({ open, onOpenChange }) {
  const methods = useForm({
    resolver: zodResolver(createShippingRuleSchema),
    defaultValues,
  });
  const creatingShipping = usePricingRulesStore((state) => state.creatingShipping);
  const createShippingRule = usePricingRulesStore((state) => state.createShippingRule);

  const handleSubmit = async (values) => {
    await createShippingRule(values);
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
      title="Create Shipping Rule"
      description="Add a shipping charge band with amount range, region, and priority."
      methods={methods}
      onSubmit={handleSubmit}
      submitLabel="Create rule"
      loading={creatingShipping}
      variant="light"
    >
      <RuleFormFields kind="shipping" variant="light" />
    </RuleDialogShell>
  );
}
