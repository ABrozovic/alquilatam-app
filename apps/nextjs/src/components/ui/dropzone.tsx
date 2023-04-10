import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useDropzone } from "react-dropzone";

import { commonMimeTypes, type CommonMimeType } from "~/utils/mime-types";
import useFileInput from "~/hooks/use-file-input";
import { Dialog, DialogContent } from "./dialog";

type FileObject = {
  id: string;
  file: File & { readonly path?: string };
  preview: string;
};

type DropzoneProps = {
  onFilesChanged: (files: FileObject[]) => void;
  onError?: (err: string) => void;
  multiple?: boolean;
  maxNumberOfFiles?: number;
  acceptedMimeTypes?: CommonMimeType[];
  maxFileSizePerFileInMB?: number;
  defaultValue?: FileObject[];
};
const Dropzone: React.FC<DropzoneProps> = ({
  maxFileSizePerFileInMB = 3,
  maxNumberOfFiles = 3,
  onFilesChanged,
  acceptedMimeTypes = ["image/png"],
  defaultValue = [],
  multiple = true,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [modalImg, setModalImg] = useState<FileObject | null>(null);
  const [error, setError] = useState<string>();
  const onFilesChangedRef = useRef(onFilesChanged);

  const { files, handleDrop, handleRemove } = useFileInput({
    maxNumberOfFiles,
    acceptedMimeTypes,
    defaultFiles: defaultValue,
    maxFileSizePerFileInMB,
    onError(err) {
      setError(err);
    },
  });
  useEffect(() => {
    return () => {
      console.log("rab")
      files.map((preview) => URL.revokeObjectURL(preview.preview));
    };
  }, [files]);

  const thumbnails = files.map((preview, index) => {
    return (
      <div
        key={preview.id}
        className="border-brand-700 relative inline-block h-52 w-52 overflow-hidden rounded-lg border-2"
      >
        <Image
          fill
          className="object-cover"
          alt="Image preview"
          key={index}
          src={preview.preview}
          sizes="(max-width: 768px) 100vw,
                  (max-width: 1200px) 50vw,
                  33vw"
        />
        <div
          className={`absolute top-0 left-0 flex h-52 w-52 items-center justify-center`}
        >
          <div className="group flex flex-col">
            <div className="absolute top-0 right-0 h-52 w-52 bg-white opacity-0 transition-all duration-200 ease-in-out group-hover:opacity-90"></div>
            <button
              type="button"
              className="z-10 rounded-lg bg-blue-500 py-2 px-4 text-white  opacity-0 transition-all duration-300 ease-in-out hover:bg-blue-700 group-hover:opacity-100"
              onClick={() => {
                setModalImg(preview);
                setShowModal(true);
              }}
            >
              Ver
            </button>
            <button
              type="button"
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
    onFilesChangedRef.current(files);
  }, [files]);

  const { getRootProps, getInputProps, isDragAccept, isFocused, isDragReject } =
    useDropzone({
      multiple: multiple,
      accept: buildAcceptedObjects(acceptedMimeTypes),
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

  function clamp(maxColumns: number) {
    return Math.min(Math.max(files.length, maxColumns), maxNumberOfFiles);
  }

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
            className: `border-${getColor} mt-2 border-2 border-dashed p-8 text-center`,
          })}
        >
          <input {...getInputProps()} className="hidden" />
          <p className={`text-${getColor}`}>
            Drag and drop some files here, or click to select files
          </p>
        </div>
        {error && <div className="mt-1 text-center text-red-500">{error} </div>}

        <div
          className={`mt-4 grid w-full grid-cols-1 items-center justify-around justify-items-center gap-4 sm:grid-cols-${clamp(
            2,
          )} md:grid-cols-${clamp(3)} lg:grid-cols-${clamp(3)}`}
        >
          {thumbnails}
        </div>
      </div>
    </>
  );
};

export default Dropzone;

function buildAcceptedObjects(acceptedMimeTypes: string[]): {
  [key: string]: string[];
} {
  const acceptedObjects: {
    [key: string]: string[];
  } = {};
  const mimeTypes = commonMimeTypes as Record<string, { extensions: string[] }>;
  for (const mimeType of acceptedMimeTypes) {
    const extensions = mimeTypes[mimeType]?.extensions || [];
    acceptedObjects[mimeType] = extensions;
  }

  return acceptedObjects;
}
