import { z } from "zod";

export const DiscountType = {
  PERCENTAGE: "PERCENTAGE",
  FIXED: "FIXED",
};

const moneySchema = z.coerce.number().min(0);
const nullableMoneySchema = z.preprocess(
  (value) => (value === "" || value === undefined ? null : value),
  z.coerce.number().min(0).nullable()
);
const nullableRegionSchema = z.preprocess(
  (value) => (value === "" || value === undefined ? null : value),
  z.string().trim().min(1).max(80).nullable()
);

const discountRuleBaseSchema = z.object({
  name: z.string().trim().min(1).max(120),
  minAmount: moneySchema,
  maxAmount: nullableMoneySchema,
  type: z.enum(Object.values(DiscountType)),
  value: moneySchema,
  priority: z.coerce.number().int().min(0).default(0),
  isActive: z.coerce.boolean().default(true),
});

const shippingRuleBaseSchema = z.object({
  name: z.string().trim().min(1).max(120),
  minAmount: moneySchema,
  maxAmount: nullableMoneySchema,
  chargeValue: moneySchema,
  region: nullableRegionSchema,
  priority: z.coerce.number().int().min(0).default(0),
  isActive: z.coerce.boolean().default(true),
});

export const createDiscountRuleSchema = discountRuleBaseSchema.refine(
  (data) => data.maxAmount == null || data.maxAmount === 0 || data.minAmount <= data.maxAmount,
  {
    path: ["maxAmount"],
    message: "maxAmount must be greater than or equal to minAmount",
  }
);

export const updateDiscountRuleSchema = discountRuleBaseSchema
  .partial()
  .superRefine((data, ctx) => {
    if (data.minAmount == null || data.maxAmount == null || data.maxAmount === 0) {
      return;
    }

    if (data.minAmount > data.maxAmount) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["maxAmount"],
        message: "maxAmount must be greater than or equal to minAmount",
      });
    }
  });

export const createShippingRuleSchema = shippingRuleBaseSchema.refine(
  (data) => data.maxAmount == null || data.maxAmount === 0 || data.minAmount <= data.maxAmount,
  {
    path: ["maxAmount"],
    message: "maxAmount must be greater than or equal to minAmount",
  }
);

export const updateShippingRuleSchema = shippingRuleBaseSchema
  .partial()
  .superRefine((data, ctx) => {
    if (data.minAmount == null || data.maxAmount == null || data.maxAmount === 0) {
      return;
    }

    if (data.minAmount > data.maxAmount) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["maxAmount"],
        message: "maxAmount must be greater than or equal to minAmount",
      });
    }
  });
