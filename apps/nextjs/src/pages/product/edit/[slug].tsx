import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import {
  updateProductSchema,
  type UpdateProduct,
} from "@acme/api/src/router/product/update-product";

import { api } from "~/utils/api";
import { extractMediaType } from "~/utils/mime-types";
import { useZodForm } from "~/components/form/use-zod-form";
import Form from "~/components/form/zod-form";
import { Layout } from "~/components/layout";
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

const EditProduct = () => {
  const { data: product } = api.product.getById.useQuery(
    { productId: "" },
    { enabled: !!"productId" },
  );

  const form = useZodForm({ schema: updateProductSchema });
  if (!product) return null;
  return (
    <Layout>
      <div className="container flex min-h-full flex-1 flex-col items-center pt-6 pb-6">
        <Form<UpdateProduct>
          form={form}
          logger
          onSubmit={() => console.log("a")}
        >
          <Controller
            name="categoryId"
            control={form.control}
            render={({ field: { onChange } }) => (
              <>
                <Label htmlFor={form.register?.name} className="text-brand-700">
                  Selecciona una categoria
                </Label>
                <Select
                  onValueChange={(val) => console.log(val)}
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
                    <SelectItem value="test">1</SelectItem>
                    <SelectItem value="tesat">2</SelectItem>
                    <SelectItem value="tesaadt">3</SelectItem>
                    <SelectItem value="tesaat">4</SelectItem>
                    <SelectItem value="tedst">5</SelectItem>
                    <SelectItem value="tfest">6</SelectItem>
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
                register={form.register("price")}
              />
            </div>
            <Controller
              name="priceType"
              control={form.control}
              render={({ field: { onChange } }) => (
                <div className="w-40">
                  <br />
                  <Select onValueChange={(val) => console.log(val)}>
                    <SelectTrigger className="border-brand-700 w-full">
                      <SelectValue
                        className="text-red-500"
                        placeholder={
                          <span className="text-slate-400">Ej: Por mes</span>
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="test">1</SelectItem>
                      <SelectItem value="tesat">2</SelectItem>
                      <SelectItem value="tesaadt">3</SelectItem>
                      <SelectItem value="tesaat">4</SelectItem>
                      <SelectItem value="tedst">5</SelectItem>
                      <SelectItem value="tfest">6</SelectItem>
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
                register={form.register("timeRange")}
              />
            </div>
            <Controller
              name="timeRangeType"
              control={form.control}
              render={({ field: { onChange } }) => (
                <div className="w-40">
                  <Select onValueChange={(val) => console.log(val)}>
                    <SelectTrigger className="border-brand-700 w-full">
                      <SelectValue
                        className="text-red-500"
                        placeholder={
                          <span className="text-slate-400">Ej: 1 mes</span>
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="test">1</SelectItem>
                      <SelectItem value="tesat">2</SelectItem>
                      <SelectItem value="tesaadt">3</SelectItem>
                      <SelectItem value="tesaat">4</SelectItem>
                      <SelectItem value="tedst">5</SelectItem>
                      <SelectItem value="tfest">6</SelectItem>
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
            render={({
              field: { onChange },
              fieldState: { invalid, isTouched, isDirty, error },
              formState,
            }) => (
              <Dropzone
                onFilesChanged={(files) => onChange(files)}
                defaultValue={product.images.map((image) => ({
                  id: image.id,
                  preview: image.image,
                  file: { type: extractMediaType(image.blur) } as File,
                }))}
                onError={(error) => console.log(error)}
              />
            )}
          />
        </Form>
      </div>
    </Layout>
  );
};

export default EditProduct;

// export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
//   const query = ctx.query;
//   const ssg = getSSGProxy(ctx);
//   const data = slugSchema.safeParse(query);
//   if (!data.success) {
//     return { props: {} };
//   }
//   const slug = data.data.slug;
//   await ssg.product.getByCategory.prefetch({ categorySlug: slug });
//   return {
//     props: {
//       trpcState: ssg.dehydrate(),
//       categorySlug: slug,
//     },
//   };
// };
