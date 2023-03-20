import { z } from "zod";

export const autocompleteSchema = z.object({
  id: z.string(),
  name: z.string(),
  categoryId: z.string(),
});
export const categoryImageSchema = z.object({
  id: z.string(),
  categoryId: z.string(),
  image: z.string(),
  publicId: z.string(),
  size: z.number(),
  blur: z.string().optional(),
});
export const categorySchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z
    .string()
    .min(3, { message: "Minimo de 3 letras" })
    .max(50, { message: "Maximum of 20 letras" }),
  autocomplete: autocompleteSchema.array().optional(),
  image: categoryImageSchema,
});
