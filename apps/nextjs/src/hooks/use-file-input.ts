// Component 1: FileInput (handles the file input and validation)
import { useState } from "react";
import { z } from "zod";

import { type CommonMimeType } from "~/utils/mime-types";

type FileObject = {
  id: string;
  file: File & { readonly path?: string };
  preview: string;
};

const MB_BYTES = 1000000;

type FileInputProps = {
  onError: (err: string) => void;
  maxNumberOfFiles?: number;
  acceptedMimeTypes?: CommonMimeType[];
  maxFileSizePerFileInMB?: number;
  defaultFiles?: FileObject[];
};

const useFileInput = ({
  maxFileSizePerFileInMB = 3,
  maxNumberOfFiles = 1,
  onError,
  acceptedMimeTypes = [],
  defaultFiles = [],
}: FileInputProps) => {
  const maxFileSizePerItem = maxFileSizePerFileInMB * MB_BYTES;
  const [files, setFiles] = useState<FileObject[]>(defaultFiles);
  const schema = z
    .array(z.any())
    .max(maxNumberOfFiles, {
      message: `You can only add up to ${maxNumberOfFiles} images`,
    })
    .superRefine((f, ctx) => {
      for (let i = 0; i < f.length; i++) {
        const { file } = f[i] as FileObject;
        if (!acceptedMimeTypes.includes(file?.type as CommonMimeType)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `File at index ${i} must be one of [${acceptedMimeTypes.join(
              ", ",
            )}] but was ${file?.type}`,
          });
        }

        if (file && file.size > maxFileSizePerItem) {
          ctx.addIssue({
            code: z.ZodIssueCode.too_big,
            type: "array",
            message: `The file at index ${i} must not be larger than ${maxFileSizePerItem} bytes: ${file.size}`,
            maximum: maxFileSizePerItem,
            inclusive: true,
          });
        }
      }
    });

  const handleDrop = (acceptedFiles: File[]) => {
    onError("");
    const newFilesWithPreviews: FileObject[] = acceptedFiles
      .map((file) => {
        const id = `${file.name}-${file.lastModified}-${file.size}`;
        const preview = URL.createObjectURL(file);
        return { id, file, preview };
      })
      .filter(({ id }) => !files.map(({ id }) => id).includes(id));

    if (newFilesWithPreviews.length > 0) {
      try {
        const validatedFiles = schema.parse(newFilesWithPreviews.concat(files));
        setFiles(validatedFiles as FileObject[]);
      } catch (err) {
        if (err instanceof z.ZodError) {
          err.issues[0]
            ? onError(err.issues[0].message)
            : err.message && onError(err.message);
        }
      }
    }
  };
  const handleRemove = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return { files, handleDrop, onError, handleRemove };
};
export default useFileInput;
