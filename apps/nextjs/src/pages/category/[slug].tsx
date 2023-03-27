import React, { useRef } from "react";
import {
  type GetServerSidePropsContext,
  type InferGetServerSidePropsType,
} from "next";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import { Virtuoso } from "react-virtuoso";

import { type ProductByCategory } from "@acme/api/src/router/product/get-product-by-category";
import { slugSchema } from "@acme/api/src/util/schema-parser";

import { api } from "~/utils/api";
import { cn } from "~/utils/cn";
import { AdBanner } from "~/components/banner";
import { Layout } from "~/components/layout";
import ProductCard from "~/components/product/product-card";
import { Input } from "~/components/ui/input";
import { useFuse } from "~/hooks/use-fuse";
import { getSSGProxy } from "~/lib/ssg-helper";

const Category = ({
  categorySlug,
}: Required<InferGetServerSidePropsType<typeof getServerSideProps>>) => {
  const { data } = api.product.getByCategory.useQuery({ categorySlug });

  const fuseOptions = {
    keys: ["name", "description", "brand"],
    includeMatches: true,
    threshold: 0.1,
  };
  const { hits, onSearch } = useFuse(
    data?.products,
    true,
    { limit: -1 },
    fuseOptions,
  );

  const scrollAreaRef = useRef<HTMLDivElement | null>(null);

  if (!data) return null;
  return (
    <Layout>
      <section className="container relative flex min-h-full flex-1 pt-6 pb-6 ">
        <div className="flex flex-1 flex-col gap-6 py-4">
          <AdBanner />
          <div className="flex items-center gap-4">
            <Input
              className="mx-6 flex-1 text-center  text-lg font-bold placeholder:text-center"
              placeholder="Que buscas?"
              onKeyUp={onSearch}
            />
          </div>

          <ScrollArea.Root className="h-full overflow-hidden">
            <ScrollArea.Viewport
              className="ScrollAreaViewport h-full w-full px-5"
              ref={scrollAreaRef}
            >
              <Virtuoso
                customScrollParent={scrollAreaRef.current ?? undefined}
                totalCount={hits.length}
                itemContent={(index) => {
                  const {
                    id,
                    name,
                    brand,
                    description,
                    price,
                    priceType,
                    images,
                  } = {
                    ...hits[index]?.item,
                  } as ProductByCategory;

                  const image = (images && { ...images[0] }.image) || "";
                  const blur = (images && { ...images[0] }.blur) || "";

                  return (
                    <div className="py-2">
                      <ProductCard
                        key={id}
                        id={id}
                        name={name}
                        image={image}
                        blur={blur}
                        brand={brand}
                        description={description || ""}
                        price={price}
                        priceType={priceType}
                      />
                    </div>
                  );
                }}
              />
            </ScrollArea.Viewport>
            <ScrollBar />
          </ScrollArea.Root>
        </div>
      </section>
    </Layout>
  );
};

export default Category;
export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const query = ctx.query;
  const ssg = getSSGProxy(ctx);
  const data = slugSchema.safeParse(query);
  if (!data.success) {
    return { props: {} };
  }
  const slug = data.data.slug;
  await ssg.product.getByCategory.prefetch({ categorySlug: slug });
  return {
    props: {
      trpcState: ssg.dehydrate(),
      categorySlug: slug,
    },
  };
};
const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>(({ className, orientation = "vertical", ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      "flex touch-none select-none transition-colors",
      orientation === "vertical" &&
        "h-full w-2.5 border-l border-l-transparent p-[1px]",
      orientation === "horizontal" &&
        "h-2.5 border-t border-t-transparent p-[1px]",
      className,
    )}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-red-500 dark:bg-slate-700" />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
));
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;
