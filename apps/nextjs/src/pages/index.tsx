import Head from "next/head";
import Link from "next/link";

import { AdBanner } from "~/components/banner";
import { Layout } from "~/components/layout";
import { buttonVariants } from "~/components/ui/button";
import AutoCarousel from "~/components/ui/carousel";
import { Input } from "~/components/ui/input";
import { siteConfig } from "~/temp/site";

export const images = [
  {
    src: "http://res.cloudinary.com/dnbfenk2q/image/upload/v1678503735/alquilatam/category/y6wugcxbj95aq6hdmo5z.png",
    alt: "tecnologia",
    blur: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAIAAAAPE8H1AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAPUlEQVR4nAEyAM3/ABlGYoFpTmxPLwBMQjMLAABJNB0AyKqIlntdd2VQAOnYwMitl//97ADZ0cmtoZ2BcmO4NRYHRWVwPAAAAABJRU5ErkJggg==",
    link: "/category/electronicos-y-teconologia",
    id: "1",
  },
  {
    src: "http://res.cloudinary.com/dnbfenk2q/image/upload/v1678503816/alquilatam/category/soba0py2blebq8zntnlb.png",
    alt: "vehiculos",
    blur: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAIAAAAPE8H1AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAPUlEQVR4nAEyAM3/AOL+/97z+O///wC0kGsjAABOOC0Ah21NOyUaaVhIAI+elY+Pg+Xp1QAqHhofFhMAAACAaRSP1VMkqgAAAABJRU5ErkJggg==",
    link: "/category/vehiculos",
    id: "2",
  },
  {
    src: "http://res.cloudinary.com/dnbfenk2q/image/upload/v1678503711/alquilatam/category/g6ryyzkggkmbdmckd5kd.png",
    alt: "ropa",
    blur: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAIAAAAPE8H1AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAPUlEQVR4nAEyAM3/AFM7Mv/8+/bt6QAJBBnSztTGurIA4drU+/Hl18e3ALqbgsOokpRmVQDh0sTs3c7p18j3/B+9tvWNAQAAAABJRU5ErkJggg==",
    link: "/category/ropa",
    id: "3",
  },
  {
    src: "http://res.cloudinary.com/dnbfenk2q/image/upload/v1678503836/alquilatam/category/zhmyefd7s1l9h7km6fou.png",
    alt: "muebles",
    blur: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAIAAAAPE8H1AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAPUlEQVR4nAEyAM3/AO3s6MfLx7m7tgBUZmUACQMCEQEAkIh5iIBmf35yAGlFGmFGAFpfXwD/+/P28Obx8vI38xgHdPECCwAAAABJRU5ErkJggg==",
    link: "/category/muebles",
    id: "4",
  },
];
export default function IndexPage() {
  return (
    <>
      <Layout>
        <Head>
          <title>Alquilatam - Plataforma de alquiler colaborativo</title>
          <meta
            name="description"
            content="Alquila cualquier objeto que necesites a través de la comunidad de Alquilatam. Ahorra dinero y reduce tu huella de carbono."
          />
          <meta
            name="keywords"
            content="alquiler, economía colaborativa, comunidad, objetos, ahorro, sostenibilidad"
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <section className="container flex-1  gap-6 pt-6 pb-8 ">
          <div className="flex flex-1 flex-col gap-6">
            <div className="flex flex-col gap-6">
              <div className="flex w-full items-center justify-between gap-8">
                <Link
                  href={siteConfig.links.docs}
                  target="_blank"
                  rel="noreferrer"
                  className={`${buttonVariants({
                    variant: "outline",
                    size: "lg",
                  })} w-full`}
                >
                  REGISTRATE
                </Link>
                <Link
                  target="_blank"
                  rel="noreferrer"
                  href={siteConfig.links.github}
                  className={`${buttonVariants({
                    variant: "outline",
                    size: "lg",
                  })} w-full`}
                >
                  INICIA SESION
                </Link>
              </div>
              <h1 className="text-brand-700 text-center text-xl font-extrabold leading-tight tracking-tighter">
                Alquila cualquier objeto que necesites con Alquilatam: La
                plataforma de economía colaborativa para compartir y ahorra!
              </h1>
              <AdBanner />
            </div>
            <div className="flex flex-[8] flex-col justify-evenly"></div>
            <Input type="text" placeholder="Que Buscas?" />
            <AutoCarousel
              slides={images}
              minHeight="30vh"
              maxHeight="50vh"
              timeInSecs={8}
            />
            <AdBanner />
          </div>
        </section>
      </Layout>
    </>
  );
}
