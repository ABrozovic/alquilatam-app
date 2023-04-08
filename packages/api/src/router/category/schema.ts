import { z } from "zod";

export const fileSchema = z.custom<File>((v) => v instanceof File);

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
  slug: z
    .string()
    .min(3, { message: "Minimo de 3 letras" })
    .max(50, { message: "Maximum of 20 letras" }),
  name: z
    .string()
    .min(3, { message: "Minimo de 3 letras" })
    .max(50, { message: "Maximum of 20 letras" }),
  image: categoryImageSchema,
});
