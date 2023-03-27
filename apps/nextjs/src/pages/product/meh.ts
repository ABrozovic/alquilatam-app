import { type ProductImage } from "@acme/db";

export const productMeh = {
  id: "clf8i3vgt0000kw08fsr5m5rp",
  name: "Vaso termico buba de medio litro",
  type: "vaso termico",
  brand: "bubba",
  description: "vaso o taza termica marca bubba de medio litro vaso o taza termica marca bubba de medio litro vaso o taza termica marca bubba de medio litro vaso o taza termica marca bubba de medio litro",
  price: 20,
  priceType: "dia",
  timeRange: 7,
  timeRangeType: "dia",
  city: "santa cruz de la sierra",
  categoryId: "deportes-y-recreacion",
  userId: null,
  isFeatured: false,
  isActive: true,

  images: [
    {
      image:
        "http://res.cloudinary.com/dnbfenk2q/image/upload/v1678503735/alquilatam/category/y6wugcxbj95aq6hdmo5z.png",
      publicId: "tecnologia",
      blur: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAIAAAAPE8H1AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAPUlEQVR4nAEyAM3/ABlGYoFpTmxPLwBMQjMLAABJNB0AyKqIlntdd2VQAOnYwMitl//97ADZ0cmtoZ2BcmO4NRYHRWVwPAAAAABJRU5ErkJggg==",
      productId: "/category/electronicos-y-teconologia",
      size: 1,
    },
    {
      image:
        "http://res.cloudinary.com/dnbfenk2q/image/upload/v1678503816/alquilatam/category/soba0py2blebq8zntnlb.png",
      publicId: "vehiculos",
      blur: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAIAAAAPE8H1AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAPUlEQVR4nAEyAM3/AOL+/97z+O///wC0kGsjAABOOC0Ah21NOyUaaVhIAI+elY+Pg+Xp1QAqHhofFhMAAACAaRSP1VMkqgAAAABJRU5ErkJggg==",
      productId: "/category/vehiculos",
      size: 1,
    },
    {
      image:
        "http://res.cloudinary.com/dnbfenk2q/image/upload/v1678503711/alquilatam/category/g6ryyzkggkmbdmckd5kd.png",
      publicId: "ropa",
      blur: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAIAAAAPE8H1AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAPUlEQVR4nAEyAM3/AFM7Mv/8+/bt6QAJBBnSztTGurIA4drU+/Hl18e3ALqbgsOokpRmVQDh0sTs3c7p18j3/B+9tvWNAQAAAABJRU5ErkJggg==",
      productId: "/category/ropa",
      size: 1,
    },

  ] as ProductImage[],
  category: {
    id: "deportes-y-recreacion",
    name: "Deportes y Recreacion",
    isActive: true,
  },
  user: null,
};
