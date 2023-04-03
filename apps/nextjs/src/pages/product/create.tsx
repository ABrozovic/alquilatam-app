import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { productSchema } from "@acme/api/src/router/product/schema";
import {
  updateProductSchema,
  type UpdateProduct,
} from "@acme/api/src/router/product/update-product";

import { useZodForm } from "~/components/form/use-zod-form";
import Form from "~/components/form/zod-form";
import { Layout } from "~/components/layout";
import HookFormImput from "~/components/ui/hookFormInput";
import HookFormTextArea from "~/components/ui/hookFormTextArea";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

const CreateProduct = () => {
  const {
    handleSubmit,
    register,
    setValue,
    control,
    clearErrors,
    formState: { errors },
  } = useForm<UpdateProduct>({
    resolver: zodResolver(updateProductSchema),
  });
  const form = useZodForm({ schema: updateProductSchema });
  return (
    <Layout>
      <div className="container flex min-h-full flex-1 flex-col items-center pt-6 pb-6">
        <Form<UpdateProduct> form={form} onSubmit={() => console.log("a")}>
          <Controller
            name="categoryId"
            control={control}
            render={({ field: { onChange } }) => (
              <>
                <Label htmlFor={register?.name} className="text-brand-700">
                  Selecciona una categoria
                </Label>
                <Select onValueChange={(val) => console.log(val)}>
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
            errors={errors}
            register={register("name")}
          />
          <HookFormImput
            label="Tipo"
            placeholder="Ej: Cámara"
            errors={errors}
            register={register("type")}
          />
          <HookFormTextArea
            label="Descripción"
            placeholder="Ej: Cámara de 24.2 megapíxeles con sensor CMOS de 35.9 x 24 mm"
            errors={errors}
            register={register("description")}
          />
          <div className="flex gap-4">
            <Controller
              name="categoryId"
              control={control}
              render={({ field: { onChange } }) => (
                <div className="w-full">
                  <Label htmlFor="Precio" className="text-brand-700">
                    Precio:
                  </Label>
                  <Select onValueChange={(val) => console.log(val)}>
                    <SelectTrigger className="border-brand-700 w-full">
                      <SelectValue
                        className="text-red-500"
                        placeholder={
                          <span className="text-slate-400">Ej: 100</span>
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
            <Controller
              name="categoryId"
              control={control}
              render={({ field: { onChange } }) => (
                <div className="w-full">
                  <br />
                  <Select onValueChange={(val) => console.log(val)}>
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
                </div>
              )}
            />
          </div>

          <div className="flex gap-4">
            <Controller
              name="categoryId"
              control={control}
              render={({ field: { onChange } }) => (
                <div className="w-full">
                  <Label htmlFor={register?.name} className="text-brand-700">
                    TIEMPO MINIMO DE ALQUILER:
                  </Label>
                  <Select onValueChange={(val) => console.log(val)}>
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
                </div>
              )}
            />
            <Controller
              name="categoryId"
              control={control}
              render={({ field: { onChange } }) => (
                <div className="w-full">
                  <br />
                  <Select onValueChange={(val) => console.log(val)}>
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
                </div>
              )}
            />
          </div>
          <HookFormTextArea
            label="Ciudad"
            placeholder="Ej: Ej: Santa Cruz de la Sierra"
            errors={errors}
            register={register("city")}
          />
        </Form>
      </div>
    </Layout>
  );
};

export default CreateProduct;
