import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

import { useDropzone } from "react-dropzone";

import { z } from "zod";

import { Dialog, DialogContent } from "./dialog";

type FileObject = {
  name: string;
  path: string;
  preview: string;
} & File;

const IMAGE_MIME_TYPES = ["image/gif", "image/jpeg", "image/png"];
const MB_BYTES = 1000000; // Number of bytes in a megabyte.
type DropzoneProps = {
  onFilesChanged: (files: FileObject[]) => void;
  onError?: (err: string) => void;
  multiple?: boolean;
  maxNumberOfFiles?: number;
  acceptedFileType?: "images";
  maxFileSizePerItemInMB?: number;
};
const Dropzone: React.FC<DropzoneProps> = ({
  acceptedFileType = "images",
  maxFileSizePerItemInMB = 3,
  maxNumberOfFiles = 4,
  onFilesChanged,
  onError,
  multiple = true,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [modalImg, setModalImg] = useState<FileObject | null>(null);
  const acceptedMimeTypes =
    acceptedFileType === "images" ? IMAGE_MIME_TYPES : IMAGE_MIME_TYPES;
  const maxFileSizePerItem = maxFileSizePerItemInMB * MB_BYTES;
  const imageArray = z
    .array(z.any())
    .max(maxNumberOfFiles)
    .superRefine((f, ctx) => {
      for (let i = 0; i < f.length; i++) {
        const file = f[i];
        if (!acceptedMimeTypes.includes(file.type)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `File at index ${i} must be one of [${acceptedMimeTypes.join(
              ", ",
            )}] but was ${file.type}`,
          });
        }
        if (file.size > maxFileSizePerItem) {
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

  const [files, setFiles] = useState<FileObject[]>([]);
  const { getRootProps, getInputProps, isDragAccept, isFocused, isDragReject } =
    useDropzone({
      multiple: multiple,
      accept: {
        "image/png": [".png"],
        "image/jpg": [".jpg"],
      },
      onDrop: (acceptedFiles) => {
        const newFiles = acceptedFiles
          .filter((file: File) => {
            const existingFile = files.find(
              (f: FileObject) =>
                f.name === file.name &&
                f.length === file.length &&
                f.size === file.size,
            );
            return !existingFile;
          })
          .map((file: File) => {
            const preview = URL.createObjectURL(file);
            return {
              ...file,
              preview,
              name: file.name,
              size: file.size,
              type: file.type,
            } as FileObject;
          });
        const total = [...files, ...newFiles];
        try {
          imageArray.parse(total);
          onFilesChanged(total);
          setFiles((prevFiles) => {
            return [...prevFiles, ...newFiles];
          });
        } catch (err) {
          if (err instanceof z.ZodError) {
            onError && err.issues[0] && onError(err.issues[0].message);
          }
        }
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

  const handleRemove = (index: number) => {
    const arrayWithoutFile = files.filter((_, i) => i !== index);
    onFilesChanged(arrayWithoutFile);
    setFiles(arrayWithoutFile);
  };
  const thumbs = files.map((file, index) => (
    <div
      key={file.name}
      className="relative inline-flex overflow-hidden rounded-lg border-2 border-black"
    >
      <img
        className="h-48 w-48 object-cover"
        src={file.preview}
        alt={file.name}
      />
      <div
        className={`absolute top-0 left-0 flex h-48 w-48 items-center justify-center`}
      >
        <div className="group flex flex-col">
          <div className="absolute top-0 right-0 h-48 w-48 bg-white opacity-0 transition-all duration-200 ease-in-out group-hover:opacity-90"></div>
          <button
            className="z-10 rounded-lg bg-blue-500 py-2 px-4 text-white  opacity-0 transition-all duration-300 ease-in-out hover:bg-blue-700 group-hover:opacity-100"
            onClick={() => {
              setModalImg(file);
              setShowModal(true);
            }}
          >
            View
          </button>
          <button
            className="z-10 mt-2 rounded-lg bg-red-500 py-2 px-4 text-white  opacity-0 transition-all duration-300 ease-in-out hover:bg-red-700 group-hover:opacity-100"
            onClick={() => handleRemove(index)}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  ));

  useEffect(() => {
    files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <div id="parent" className="mx-auto w-2/3">
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-[95%] p-4">
          <div className="flex items-center justify-center ">
            <div className="relative  h-[85vh] w-full">
              <Image
                src={modalImg?.preview || ""}
                alt="Product Image"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>

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
      <div className="flex flex-col items-center justify-center ">
        <div
          id="grid"
          className="mt-4 grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
        >
          {thumbs}
        </div>
      </div>
    </div>
  );
};

export default Dropzone;
