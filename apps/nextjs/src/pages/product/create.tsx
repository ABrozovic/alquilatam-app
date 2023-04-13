import { useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { Controller } from "react-hook-form";

import {
  createProductFormSchema,
  type CreateProductForm,
} from "@acme/api/src/router/product/create-product";

import { api } from "~/utils/api";
import { handleCloudinaryUpload } from "~/utils/handle-upload";
import { useZodForm } from "~/components/form/use-zod-form";
import Form from "~/components/form/zod-form";
import { Layout } from "~/components/layout";
import { Button } from "~/components/ui/button";
import Dropzone from "~/components/ui/dropzone";
import HookFormImput from "~/components/ui/hookFormInput";
import HookFormTextArea from "~/components/ui/hookFormTextArea";
import { Label } from "~/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

const CreateProduct = () => {
  const { userId } = useAuth();
  const { data: categories } = api.category.getAll.useQuery();
  const { mutate: createProduct } = api.product.create.useMutation();
  const form = useZodForm({
    schema: createProductFormSchema,
  });
  useEffect(() => {
    if (!userId) return;
    form.reset({ userId });
  }, [form, userId]);

  const onSubmit = async (values: CreateProductForm) => {
    const newImages = values.images
      ? await handleCloudinaryUpload([...values.images], "product")
      : [];

    if (!newImages) throw new Error("Image Upload failed");
    createProduct({
      ...values,
      images: newImages.map((image) => ({
        image: image.url,
        publicId: image.public_id,
        size: parseInt(image.bytes),
        blur: image.base64,
      })),
    });
  };

  if (!categories) return null;
  return (
    <Layout>
      <div className="container flex min-h-full flex-1 flex-col items-center pt-6 pb-6">
        <Form<CreateProductForm> form={form} logger onSubmit={onSubmit}>
          <Controller
            name="categoryId"
            control={form.control}
            render={({ field: { onChange } }) => (
              <>
                <Label htmlFor={form.register?.name} className="text-brand-700">
                  Selecciona una categoria
                </Label>
                <Select
                  onValueChange={(val) => onChange(val)}
                  {...form.register("categoryId")}
                >
                  <SelectTrigger className="border-brand-700 w-full">
                    <SelectValue
                      className="text-red-500"
                      placeholder={
                        <span className="text-slate-400">
                          Ej: Entretenimiento
                        </span>
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem
                        className="text-brand-700 w-full"
                        key={cat.id}
                        value={cat.id}
                      >
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </>
            )}
          />
          <HookFormImput
            label="Nombre del producto"
            disabled={false}
            placeholder="Ej: Cámara EOS 5D Mark IV"
            errors={form.formState.errors}
            register={form.register("name")}
          />
          <HookFormImput
            label="Marca"
            placeholder="Ej: Canon"
            errors={form.formState.errors}
            register={form.register("brand")}
          />
          <HookFormImput
            label="Tipo"
            placeholder="Ej: Cámara"
            errors={form.formState.errors}
            register={form.register("type")}
          />
          <HookFormTextArea
            label="Descripción"
            placeholder="Ej: Cámara de 24.2 megapíxeles con sensor CMOS de 35.9 x 24 mm"
            errors={form.formState.errors}
            register={form.register("description")}
          />
          <div className="flex gap-4">
            <div>
              <HookFormImput
                className="w-40"
                label="Precio"
                placeholder="Ej: 100"
                errors={form.formState.errors}
                register={form.register("price", { valueAsNumber: true })}
              />
            </div>
            <Controller
              name="priceType"
              control={form.control}
              render={({ field: { onChange } }) => (
                <div className="w-40">
                  <br />
                  <Select onValueChange={(val) => onChange(val)}>
                    <SelectTrigger className="border-brand-700 w-full">
                      <SelectValue
                        className="text-red-500"
                        placeholder={
                          <span className="text-slate-400">Ej: Por mes</span>
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem
                        className="text-brand-700 w-full"
                        value="hora"
                      >
                        Hora
                      </SelectItem>
                      <SelectItem className="text-brand-700 w-full" value="dia">
                        Día
                      </SelectItem>
                      <SelectItem
                        className="text-brand-700 w-full"
                        value="semana"
                      >
                        Semana
                      </SelectItem>
                      <SelectItem className="text-brand-700 w-full" value="mes">
                        Mes
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            />
          </div>
          <Label htmlFor={form.register?.name} className="text-brand-700">
            Tiempo minimo de alquiler:
          </Label>
          <div className="flex gap-4">
            <div>
              <HookFormImput
                className="w-40"
                placeholder="Ej: 1"
                errors={form.formState.errors}
                register={form.register("timeRange", { valueAsNumber: true })}
              />
            </div>
            <Controller
              name="timeRangeType"
              control={form.control}
              render={({ field: { onChange } }) => (
                <div className="w-40">
                  <Select onValueChange={(val) => onChange(val)}>
                    <SelectTrigger className="border-brand-700 w-full">
                      <SelectValue
                        className="text-red-500"
                        placeholder={
                          <span className="text-slate-400">Ej: 1 mes</span>
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem
                        className="text-brand-700 w-full"
                        value="hora"
                      >
                        Hora(s)
                      </SelectItem>
                      <SelectItem className="text-brand-700 w-full" value="dia">
                        Día(s)
                      </SelectItem>
                      <SelectItem
                        className="text-brand-700 w-full"
                        value="semana"
                      >
                        Semana(s)
                      </SelectItem>
                      <SelectItem className="text-brand-700 w-full" value="mes">
                        Mes(es)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            />
          </div>
          <HookFormTextArea
            label="Ciudad"
            placeholder="Ej: Ej: Santa Cruz de la Sierra"
            errors={form.formState.errors}
            register={form.register("city")}
          />
          <Controller
            control={form.control}
            name="images"
            render={({ field: { onChange }, fieldState: { error } }) => (
              <>
                <Dropzone
                  onFilesChanged={(files) =>
                    onChange(files.map((file) => file.file))
                  }
                  onError={(error) => console.log(error)}
                />
                {error && <div className="text-red-500">{error.message}</div>}
              </>
            )}
          />
          <Button type="submit">Create</Button>
        </Form>
      </div>
    </Layout>
  );
};

export default CreateProduct;
