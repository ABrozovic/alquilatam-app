import React, { forwardRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Icons } from "../icons";
import { Tooltip, TooltipProvider } from "../ui/tooltip";

type ProductCardProps = {
  id: string;
  image: string;
  blur?: string;
  name: string;
  brand: string;
  description: string | null;
  price: number;
  priceType: string;
  link?: string;
};
const ProductCard = forwardRef<HTMLInputElement, ProductCardProps>(
  (
    { id, image, name, brand, blur, description, price, priceType, link },
    ref,
  ) => {
    const [showLogo, setShowLogo] = useState(false);
    return (
      <TooltipProvider>
        <Link href={link ? link : `/product/${id}`}>
          <div
            className=" relative h-64 w-full cursor-pointer overflow-hidden rounded-lg border border-gray-200  py-8  shadow-sm transition-colors duration-300 ease-in-out hover:bg-gray-100"
            onMouseEnter={() => setShowLogo(true)}
            onMouseLeave={() => setShowLogo(false)}
            ref={ref}
          >
            <div className="flex h-52 w-full items-center justify-between gap-4">
              <div className="relative h-52 w-52">
                <Image
                  placeholder="blur"
                  blurDataURL={blur}
                  src={image}
                  alt="Image of a category"
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
              <div className="ml-6 flex h-[90%] flex-1 flex-col justify-between">
                <div className="text-brand-700 font-semibold capitalize leading-tight">
                  {name}
                </div>
                <div className="font-semibold capitalize leading-tight text-gray-500">
                  {brand}
                </div>
                <div className="line-clamp-3 leading-tight">{description}</div>
                <div className="text-brand-700 font-semibold">{`${price} bs. / ${priceType}`}</div>
              </div>
            </div>
            <div className="self-end  ">
              <Tooltip
                content={
                  <div className="relative hidden items-center justify-center md:flex">
                    <Icons.logo className="text-brand-700 h-12 w-12" />
                  </div>
                }
                side="top"
                align="end"
                delayDuration={250}
              >
                <div
                  className={`absolute top-1/2 right-2 -translate-y-1/2 rounded-md bg-white p-2 shadow-md transition-opacity duration-300  ease-in-out ${
                    showLogo ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <Icons.logo className="text-brand-700 h-12 w-12" />
                </div>
              </Tooltip>
            </div>
          </div>
        </Link>
      </TooltipProvider>
    );
  },
);
ProductCard.displayName = "ProductCard";
export default ProductCard;
