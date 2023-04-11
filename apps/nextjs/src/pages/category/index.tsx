import Image from "next/image";
import Link from "next/link";

import { api } from "~/utils/api";
import { AdBanner } from "~/components/banner";
import { Layout } from "~/components/layout";

const Categories = () => {
  const { data: categories } = api.category.getAll.useQuery(undefined, {
    select: (data) => [
      ...data,
      ...data,
      ...data,
      ...data,
      ...data,
      ...data,
      ...data,
      ...data,
      ...data,
      ...data,
      ...data,
      ...data,
      ...data,
      ...data,
      ...data,
      ...data,
      ...data,
      ...data,
      ...data,
      ...data,
      ...data,
      ...data,
      ...data,
    ],
  });
  if (!categories) return null;
  return (
    <Layout>
      <div className="container p-6">
        <div className="flex flex-1 flex-col">
          <AdBanner />
          <div className="grid grid-cols-1 items-center justify-between justify-items-center gap-4 pt-6 sm:grid-cols-3 md:grid-cols-4">
            {categories.map(({ id, slug, name, image }) => (
              <CategoryCard
                key={id}
                slug={slug}
                name={name}
                blur={image?.blur || ""}
                image={image?.image as string}
              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Categories;
const CategoryCard = ({
  slug,
  image,
  blur,
  name,
}: {
  slug: string;
  image: string;
  blur?: string;
  name: string;
}) => {
  return (
    <Link href={`/category/${slug}`}>
      <div className="group relative h-96 w-56 cursor-pointer overflow-hidden rounded-2xl p-0 shadow-lg">
        <Image
          src={image}
          alt="Image of a category"
          placeholder="blur"
          blurDataURL={blur}
          fill
          className="object-cover transition duration-300 ease-in-out group-hover:scale-105"
          sizes="(max-width: 768px) 60vw,
              (max-width: 1200px) 50vw,
              33vw"
        />
        <div className="bg-brand-700 absolute bottom-0 flex h-24 w-full flex-col items-center justify-center bg-opacity-75 transition duration-300 ease-in-out group-hover:bg-opacity-90">
          <div className="line-clamp-2 text-center font-bold uppercase text-white">
            {name}
          </div>
        </div>
      </div>
    </Link>
  );
};
