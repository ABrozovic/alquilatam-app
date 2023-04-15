import React, { useEffect, useRef } from "react";
import {
  type GetServerSidePropsContext,
  type InferGetServerSidePropsType,
} from "next";
import Image from "next/image";
import { useAuth } from "@clerk/nextjs";
import {
  Book,
  ChevronLeft,
  ChevronRight,
  Database,
  DollarSign,
  Locate,
  LocateIcon,
  LucideSortDesc,
} from "lucide-react";

import { slugSchema } from "@acme/api/src/util/schema-parser";

import { api } from "~/utils/api";
import { parseTimeRange } from "~/utils/parse-time";
import { AdBanner } from "~/components/banner";
import { Layout } from "~/components/layout";
import AlertModal from "~/components/modals/alert-modal";
import ProductContactModal from "~/components/product-contact-modal";
import RegistrationReminder from "~/components/registration-modal";
import { Button } from "~/components/ui/button";
import { Dialog, DialogContent } from "~/components/ui/dialog";
import { getSSGProxy } from "~/lib/ssg-helper";

const ProductPage = ({
  productId,
}: Required<InferGetServerSidePropsType<typeof getServerSideProps>>) => {
  const { userId } = useAuth();
  const { data: product } = api.product.getById.useQuery(
    { productId },
    { enabled: !!"productId" },
  );

  const [openImageModal, setOpenImageModal] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [contact, setContact] = React.useState(false);
  const [currentImage, setCurrentImage] = React.useState(0);
  if (!product) return null;
  const handleSetImage = (index: number) => {
    if (index >= 0 && index < product.images.length) {
      setCurrentImage(index);
      if (!openImageModal) setOpenImageModal(true);
    }
  };

  return (
    <>
      <Dialog open={openImageModal} onOpenChange={setOpenImageModal}>
        <DialogContent className="max-w-[95%] p-4">
          <div className="flex items-center justify-center ">
            <ChevronLeft
              className={`h-12 w-12  ${
                0 === currentImage
                  ? "text-gray-500"
                  : "text-brand-700 cursor-pointer hover:animate-pulse"
              }`}
              onClick={() => handleSetImage(currentImage - 1)}
            />
            <div className="relative  h-[85vh] w-full">
              <Image
                src={product.images[currentImage]?.image || ""}
                placeholder="blur"
                blurDataURL={product.images[currentImage]?.blur || ""}
                alt="Product Image"
                fill
                className="object-contain"
              />
            </div>
            <ChevronRight
              className={`h-12 w-12 ${
                product.images.length - 1 === currentImage
                  ? "text-gray-500"
                  : "text-brand-700 cursor-pointer hover:animate-pulse"
              }`}
              onClick={() => handleSetImage(currentImage + 1)}
            />
          </div>
        </DialogContent>
      </Dialog>
      <RegistrationReminder open={open} setOpen={setOpen} />
      <Layout>
        <ProductContactModal
          open={contact}
          setOpen={setContact}
          description={`Puedes contactarte con ${product.user?.name} en: \n  ${product.user?.phone1} \n ${product.user?.phone2} `}
        />
        <section className="container relative flex min-h-full flex-1 flex-col pt-6 pb-6 ">
          <AdBanner />
          <div className="flex flex-1 items-center justify-center p-6 ">
            <div className="flex h-96 w-auto md:w-[50%]  ">
              <div className="relative w-full overflow-hidden rounded-3xl">
                <Image
                  onClick={() => handleSetImage(0)}
                  src={product.images[0]?.image || ""}
                  placeholder="blur"
                  blurDataURL={product.images[0]?.blur || ""}
                  alt="Image of a category"
                  fill
                  className="relative cursor-pointer object-contain transition-transform duration-300 hover:scale-105"
                />
              </div>
              {product.images.length === 2 ? (
                <div className="relative h-full w-full">
                  <Image
                    onClick={() => handleSetImage(1)}
                    src={product.images[1]?.image || ""}
                    placeholder="blur"
                    blurDataURL={product.images[1]?.blur || ""}
                    alt="Image of a category"
                    fill
                    className="relative cursor-pointer object-contain"
                  />
                </div>
              ) : product.images.length > 2 ? (
                <div className="relative flex h-full w-full flex-col gap-1">
                  <div className="relative h-full w-full">
                    <Image
                      onClick={() => handleSetImage(1)}
                      src={product.images[1]?.image || ""}
                      placeholder="blur"
                      blurDataURL={product.images[1]?.blur || ""}
                      alt="Image of a category"
                      fill
                      className="cursor-pointer object-contain"
                    />
                  </div>
                  <div className="relative h-full w-full">
                    <Image
                      onClick={() => handleSetImage(2)}
                      src={product.images[2]?.image || ""}
                      placeholder="blur"
                      blurDataURL={product.images[2]?.blur || ""}
                      alt="Image of a category"
                      fill
                      className="cursor-pointer object-contain"
                    />
                  </div>
                </div>
              ) : null}
            </div>
          </div>
          <div className="flex flex-col gap-4 px-12 md:mx-auto">
            <div className="flex items-center gap-2">
              <DollarSign className="h-7 w-7 text-center" />
              <div className="flex flex-col">
                <div className="text-brand-700 font-bold capitalize">Monto</div>
                <div className="font-bold capitalize text-gray-600">
                  {`${product.price}bs / ${product.priceType}`}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Locate className="h-7 w-7 text-center" />
              <div className="flex flex-col">
                <div className="text-brand-700 font-bold capitalize">
                  CIUDAD
                </div>
                <div className="font-bold capitalize text-gray-600">
                  {product.city}
                </div>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Book className="h-7 w-7 text-center" />
              <div className="flex flex-col">
                <div className="text-brand-700 font-bold capitalize">
                  CARACTERÍSTICAS
                </div>
                <div className="text-brand-700 flex gap-1 font-bold capitalize">
                  {`Tipo:`}
                  <div className="font-bold capitalize text-gray-600">
                    {product.type}
                  </div>
                </div>
                <div className="text-brand-700 flex gap-1 font-bold capitalize">
                  {`Marca:`}
                  <div className="font-bold capitalize text-gray-600">
                    {product.brand}
                  </div>
                </div>
                <div className="text-brand-700 flex gap-1 font-bold capitalize">
                  {`Minimo de alquiler:`}
                  <div className="font-bold capitalize text-gray-600">
                    {product.timeRange}
                    {parseTimeRange(product.timeRange, product.timeRangeType)}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex  items-center gap-2">
              <Book className="h-7 w-7 text-center" />
              <div className="flex flex-1 flex-col">
                <div className="text-brand-700 font-bold capitalize">
                  DESCRIPCION
                </div>
                <div className="font-bold capitalize text-gray-600">
                  {product.description}
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Button
              className="mt-4 w-96 rounded-3xl"
              onClick={() => (!userId ? setOpen(true) : setContact(true))}
            >
              ALQUILAR
            </Button>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default ProductPage;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const query = ctx.query;
  const ssg = getSSGProxy(ctx);
  const data = slugSchema.safeParse(query);
  if (!data.success) {
    return { props: {} };
  }
  const productId = data.data.slug;
  await ssg.product.getById.prefetch({ productId });
  return {
    props: {
      trpcState: ssg.dehydrate(),
      productId: productId,
    },
  };
};
