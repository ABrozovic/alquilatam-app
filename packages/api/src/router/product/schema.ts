import { z } from "zod";

export const productImageSchema = z.object({
  id: z.string(),
  productId: z.string().optional(),
  publicId: z.string(),
  image: z.string(),
  size: z.number(),
  blur: z.string().optional(),
});
export type Image = z.infer<typeof productImageSchema>;

export const productSchema = z.object({
  id: z.string(),
  name: z
    .string({ required_error: "Nombre de producto obligatorio" })
    .min(3, "Nombre de producto debe tener al menos 3 caracteres."),
  type: z.string().min(1, "Tipo de producto es requerido"),
  brand: z.string().min(1, "Marca de producto es requerida"),
  description: z.string().optional(),
  price: z.number({
    required_error: "Precio de producto obligatorio",
    invalid_type_error: "Ingrese un número",
  }),
  priceType: z.string({
    required_error: "Tipo de precio de producto obligatorio",
  }),
  timeRange: z.number({
    required_error: "Rango de tiempo de producto obligatorio",
    invalid_type_error: "Ingrese un número",
  }),
  timeRangeType: z.string({
    required_error: "Tipo de rango de tiempo de producto obligatorio",
  }),
  city: z.string().min(1, "Ciudad de producto es requerida"),
  categoryId: z.string(),
  userId: z.string(),
  images: productImageSchema.array().optional(),
});
