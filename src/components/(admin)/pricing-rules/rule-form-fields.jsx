"use client";

import { useEffect, useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { DiscountType } from "@/components/(admin)/pricing-rules/rule-schemas";

const PRIORITY_OPTIONS = [
  { label: "Highest", value: 10 },
  { label: "High", value: 20 },
  { label: "Medium", value: 30 },
  { label: "Low", value: 40 },
  { label: "Lowest", value: 50 },
];

export function RuleFormFields({ kind = "discount", variant = "dark" }) {
  const inputVariant = variant === "light" ? "light" : "dark";
  const fields =
    kind === "discount"
      ? [
          { name: "name", label: "Rule name", placeholder: "Festive 100-1000" },
          { name: "minAmount", label: "Min amount", placeholder: "100", type: "number" },
          { name: "maxAmount", label: "Max amount", placeholder: "1000 or 0", type: "number" },
          {
            name: "type",
            label: "Discount type",
            options: [DiscountType.PERCENTAGE],
            input: "select",
          },
          { name: "value", label: "Value", placeholder: "10", type: "number" },
          { name: "priority", label: "Priority", input: "priority" },
        ]
      : [
          { name: "name", label: "Rule name", placeholder: "Kerala Express" },
          { name: "minAmount", label: "Min amount", placeholder: "0", type: "number" },
          { name: "maxAmount", label: "Max amount", placeholder: "0 for unlimited", type: "number" },
          { name: "chargeValue", label: "Charge value", placeholder: "40", type: "number" },
          { name: "region", label: "Region", placeholder: "Kerala" },
          { name: "priority", label: "Priority", input: "priority" },
        ];

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {fields.map((field) => (
        <RuleField key={field.name} variant={variant} inputVariant={inputVariant} {...field} />
      ))}
      <div className="md:col-span-2">
        <RuleSwitchField name="isActive" label="Active status" variant={variant} />
      </div>
    </div>
  );
}

function PriorityField({ name, label, variant = "dark", inputVariant = "dark" }) {
  const { register, setValue, watch, formState: { errors } } = useFormContext();
  const priorityValue = Number(watch(name) ?? 0);
  const [useCustom, setUseCustom] = useState(false);

  const mappedOption = useMemo(
    () => PRIORITY_OPTIONS.find((option) => option.value === priorityValue),
    [priorityValue]
  );

  useEffect(() => {
    setUseCustom(priorityValue !== 0 && mappedOption == null);
  }, [priorityValue, mappedOption]);

  const error = errors?.[name]?.message;

  const fieldLabel = (
    <span
      className={cn(
        "mb-2 flex items-center justify-between gap-3 text-xs font-black uppercase tracking-[0.18em]",
        variant === "light" ? "text-slate-500" : "text-white/45"
      )}
    >
      <span>{label}</span>
      <label className="flex cursor-pointer items-center gap-2 text-xs font-medium text-slate-500">
        <Switch
          variant={variant}
          checked={useCustom}
          onCheckedChange={(value) => {
            setUseCustom(value);
            if (!value) {
              setValue(name, 30, { shouldValidate: true });
            }
          }}
        />
        Use custom priority
      </label>
    </span>
  );

  return (
    <label className="block md:col-span-2">
      {fieldLabel}
      {useCustom ? (
        <Input
          type="number"
          variant={inputVariant}
          step="1"
          placeholder="70"
          className={cn(error && "border-red-400/70")}
          {...register(name)}
        />
      ) : (
        <select
          {...register(name)}
          className={cn(
            variant === "light"
              ? "flex h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-[#141810] outline-none transition focus:border-[#46EC12] focus:bg-white"
              : "flex h-11 w-full rounded-2xl border border-white/10 bg-white/6 px-4 text-sm text-white outline-none transition focus:border-[#d7ff94] focus:bg-white/10",
            error && "border-red-400/70"
          )}
        >
          <option value="">Select priority</option>
          {PRIORITY_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )}
      <p className={cn("mt-2 text-sm", variant === "light" ? "text-slate-500" : "text-white/60")}> 
        Lower priority values apply first when rules overlap. Top Priority (1) should only be used for special override rules.
      </p>
      {error ? <p className="mt-2 text-sm font-medium text-red-300">{String(error)}</p> : null}
    </label>
  );
}

function RuleField({ name, label, placeholder, type = "text", input = "input", options = [], variant = "dark", inputVariant = "dark" }) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors?.[name]?.message;

  if (input === "priority") {
    return <PriorityField name={name} label={label} variant={variant} inputVariant={inputVariant} />;
  }

  return (
    <label className="block">
      <span
        className={cn(
          "mb-2 flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em]",
          variant === "light" ? "text-slate-500" : "text-white/45"
        )}
      >
        {label}
        {name === "maxAmount" ? <Badge variant="muted">0 or blank = unlimited</Badge> : null}
      </span>
      {input === "select" ? (
        <select
          {...register(name)}
          className={cn(
            variant === "light"
              ? "flex h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-[#141810] outline-none transition focus:border-[#46EC12] focus:bg-white"
              : "flex h-11 w-full rounded-2xl border border-white/10 bg-white/6 px-4 text-sm text-white outline-none transition focus:border-[#d7ff94] focus:bg-white/10",
            error && "border-red-400/70"
          )}
        >
          {options.map((option) => (
            <option
              key={option}
              value={option}
              className={variant === "light" ? "bg-white text-[#141810]" : "bg-slate-900 text-white"}
            >
              {option}
            </option>
          ))}
        </select>
      ) : (
        <Input
          type={type}
          variant={inputVariant}
          step={type === "number" ? "any" : undefined}
          placeholder={placeholder}
          className={cn(error && "border-red-400/70")}
          {...register(name)}
        />
      )}
      {error ? <p className="mt-2 text-sm font-medium text-red-300">{String(error)}</p> : null}
    </label>
  );
}

function RuleSwitchField({ name, label, variant = "dark" }) {
  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const checked = Boolean(watch(name));
  const error = errors?.[name]?.message;

  return (
    <div>
      <span
        className={cn(
          "mb-2 block text-xs font-black uppercase tracking-[0.18em]",
          variant === "light" ? "text-slate-500" : "text-white/45"
        )}
      >
        {label}
      </span>
      <div
        className={cn(
          "flex items-center justify-between rounded-[22px] px-4 py-3",
          variant === "light"
            ? "border border-slate-200 bg-slate-50"
            : "border border-white/10 bg-white/6"
        )}
      >
        <div>
          <p className={variant === "light" ? "text-sm font-bold text-[#141810]" : "text-sm font-bold text-white"}>
            {checked ? "Enabled" : "Disabled"}
          </p>
          <p className={variant === "light" ? "text-xs text-slate-500" : "text-xs text-white/45"}>
            Toggle active state for this rule.
          </p>
        </div>
        <Switch
          variant={variant}
          checked={checked}
          onCheckedChange={(value) => setValue(name, value, { shouldValidate: true })}
        />
      </div>
      {error ? <p className="mt-2 text-sm font-medium text-red-300">{String(error)}</p> : null}
    </div>
  );
}
