import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { z } from "zod";
import { type CommonMimeTypes } from "~/utils/mime-types";
import { Dialog, DialogContent } from "./dialog";

type FileObject = {
  id: string;
  file: File & { readonly path?: string };
  preview: string;
};

const MB_BYTES = 1000000;

type DropzoneProps = {
  onFilesChanged: (files: FileObject[]) => void;
  onError?: (err: string) => void;
  multiple?: boolean;
  maxNumberOfFiles?: number;
  acceptedMimeTypes?: CommonMimeTypes[];
  maxFileSizePerItemInMB?: number;
  defaultValue?: FileObject[];
};
const Dropzone: React.FC<DropzoneProps> = ({
  maxFileSizePerItemInMB = 3,
  maxNumberOfFiles = 4,
  onFilesChanged,
  onError,
  acceptedMimeTypes = [],
  defaultValue = [],
  multiple = true,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [modalImg, setModalImg] = useState<FileObject | null>(null);
  const [previews, setPreviews] = useState<FileObject[]>(defaultValue);
  const [error, setError] = useState<string>();
  const onFilesChangedRef = useRef(onFilesChanged);
  const maxFileSizePerItem = maxFileSizePerItemInMB * MB_BYTES;
  const imageArray = z
    .array(z.any())
    .max(maxNumberOfFiles, {
      message: `You can only add up to ${maxNumberOfFiles} images`,
    })
    .superRefine((f, ctx) => {
      for (let i = 0; i < f.length; i++) {
        const { id, file } = f[i] as FileObject;
        if (!defaultValue.map(({ id }) => id).includes(id)) {
          if (!acceptedMimeTypes.includes(file?.type as CommonMimeTypes)) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: `File at index ${i} must be one of [${acceptedMimeTypes.join(
                ", ",
              )}] but was ${file?.type}`,
            });
          }
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
    setError("");
    const newFiles: File[] = [];
    const newPreviews: string[] = [];
    const newFilesWithPreviews: FileObject[] = [];
    acceptedFiles.forEach((file) => {
      const existingFile = previews.find(
        ({ file: f }) =>
          f?.name === file.name &&
          f?.length === file.length &&
          f?.type === file.type,
      );
      if (!existingFile) {
        const preview = {
          preview: URL.createObjectURL(file),
          id: crypto.randomUUID(),
        };
        newPreviews.push(URL.createObjectURL(file));
        newFiles.push(file);
        newFilesWithPreviews.push({
          file,
          ...preview,
        });
      }
    });
    const total = [...previews, ...newFilesWithPreviews];
    try {
      imageArray.parse(total);
      setPreviews((prevFiles) => {
        return [...prevFiles, ...newFilesWithPreviews];
      });
    } catch (err) {
      if (err instanceof z.ZodError) {
        onError && err.issues[0] && onError(err.issues[0].message);
        onError && err.message && onError(err.message);
        setError((err.issues[0] && err.issues[0].message) || err.message);
      }
    }
  };
  const handleRemove = (index: number) => {
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const thumbnails = previews.map((preview, index) => {
    return (
      <div
        key={preview.id}
        className="border-brand-700 relative inline-block h-52 w-52 overflow-hidden rounded-lg border-2"
      >
        <Image
          fill
          className="objet-cover"
          alt="Image preview"
          key={index}
          src={preview.preview}
          sizes="(max-width: 768px) 100vw,
                  (max-width: 1200px) 50vw,
                  33vw"
          onLoad={() => URL.revokeObjectURL(preview.preview)}
        />
        <div
          className={`absolute top-0 left-0 flex h-52 w-52 items-center justify-center`}
        >
          <div className="group flex flex-col">
            <div className="absolute top-0 right-0 h-52 w-52 bg-white opacity-0 transition-all duration-200 ease-in-out group-hover:opacity-90"></div>
            <button
              className="z-10 rounded-lg bg-blue-500 py-2 px-4 text-white  opacity-0 transition-all duration-300 ease-in-out hover:bg-blue-700 group-hover:opacity-100"
              onClick={() => {
                setModalImg(preview);
                setShowModal(true);
              }}
            >
              Ver
            </button>
            <button
              className="bg-brand-700 z-10 mt-2 rounded-lg py-2 px-4 text-white  opacity-0 transition-all duration-300 ease-in-out hover:bg-red-700 group-hover:opacity-100"
              onClick={() => handleRemove(index)}
            >
              Quitar
            </button>
          </div>
        </div>
      </div>
    );
  });

  useEffect(() => {
    onFilesChangedRef.current(previews);
  }, [previews]);

  const { getRootProps, getInputProps, isDragAccept, isFocused, isDragReject } =
    useDropzone({
      multiple: multiple,
      accept: {
        "image/png": [".png"],
        "image/jpg": [".jpg"],
      },
      onDrop: (acceptedFiles) => {
        handleDrop(acceptedFiles);
      },
    });

  const getColor = useMemo(
    () =>
      (isDragAccept && "green-500") ||
      (isDragReject && "red-500") ||
      (isFocused && "blue-500") ||
      "gray-500",
    [isDragAccept, isFocused, isDragReject],
  );

  return (
    <>
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-h-[95%] p-4">
          <div className="flex items-center justify-center ">
            <div className="relative h-[85vh] w-full">
              <Image
                src={modalImg?.preview || ""}
                alt="Product Image"
                fill
                className="object-contain "
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <div id="parent" className="mx-auto ">
        <div
          {...getRootProps({
            className: `border-${getColor} border-2 border-dashed p-8 text-center`,
          })}
        >
          <input {...getInputProps()} className="hidden" />
          <p className={`text-${getColor}`}>
            Drag and drop some files here, or click to select files
          </p>
        </div>
        {error && <div className="text-red-500">{error} </div>}

        <div
          className={`mt-4 grid w-full items-center justify-around justify-items-center gap-4  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-${previews.length}`}
        >
          {thumbnails}
        </div>
      </div>
    </>
  );
};

export default Dropzone;
