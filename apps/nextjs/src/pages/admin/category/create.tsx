import { useState } from "react";
import { useRouter } from "next/router";
import { DevTool } from "@hookform/devtools";
import { Controller } from "react-hook-form";

import {
  createCategoryForm,
  type CreateCategoryForm,
} from "@acme/api/src/router/category/create-category";

import { api } from "~/utils/api";
import { handleCloudinaryUpload } from "~/utils/handle-upload";
import { useZodForm } from "~/components/form/use-zod-form";
import Form from "~/components/form/zod-form";
import { Layout } from "~/components/layout";
import { Button } from "~/components/ui/button";
import Dropzone from "~/components/ui/dropzone";
import HookFormImput from "~/components/ui/hookFormInput";

const CreateCategory = () => {
  const router = useRouter();
  const [error, setError] = useState("");

  const { mutate } = api.category.create.useMutation({
    onError: (err) => {
      setError(err.message);
    },
    onSuccess: () => {
      router.back();
    },
  });

  const form = useZodForm({ schema: createCategoryForm });
  const onSubmit = async (values: CreateCategoryForm) => {
    const newImage = values.image
      ? await handleCloudinaryUpload([values.image], "category")
      : [];
    if (!newImage[0]) throw new Error("Image Upload failed");
    mutate({
      ...values,
      image: {
        image: newImage[0].url,
        publicId: newImage[0].public_id,
        blur: newImage[0].base64,
        size: parseInt(newImage[0].bytes),
      },
    });
  };

  return (
    <Layout>
      <div className="container p-6">
        <Form form={form} onSubmit={onSubmit} logger>
          <div className="flex flex-col gap-2">
            <HookFormImput
              type="text"
              label="Nombre de categoria:"
              register={form.register("name")}
              errors={form.formState.errors}
            />
            <HookFormImput
              type="text"
              label="Slug de categoria:"
              register={form.register("slug")}
              errors={form.formState.errors}
            />
            {error && (
              <div className="flex flex-1 items-center">
                <div className="text-center text-red-500">{error}</div>
              </div>
            )}
            <div className="w-full">
              <Controller
                control={form.control}
                name="image"
                render={({ field: { onChange } }) => (
                  <Dropzone
                    onFilesChanged={(files) =>
                      files.map((file) => onChange(file.file))
                    }
                    maxNumberOfFiles={1}
                    maxFileSizePerFileInMB={3}
                  />
                )}
              />
            </div>
            <Button type="submit">Agregar</Button>
          </div>
        </Form>
        <DevTool control={form.control} />
      </div>
    </Layout>
  );
};
export default CreateCategory;
