import { performRequest } from "@/src/lib/datocms";
import { PostDato } from "@/src/types";
import Image from "next/image";
import Link from "next/link";

const HOME_QUERY = `
  query {
    allPosts(orderBy: date_DESC) {
      id
      title
      description
      slug
      category
      date
      image {
        url(imgixParams: { fit: crop, w:578, h:384, auto:format})
      }
    }
  }
`;

export default async function HeroSection() {
  const data = await performRequest({ query: HOME_QUERY });
  const noticias: PostDato[] = data.allPosts;

  const destaque = noticias[0];
  const secundaria = noticias[1];
  console.log(destaque)

  return (
    <>
      {destaque ? (
        <section className="w-full max-w-7xl mx-auto md:py-4 md:px-4">

          {/* Grid Container: 1 coluna no mobile, 2 colunas customizadas no desktop */}
          <div className="grid grid-cols-1 lg:grid-cols-[750px_1fr] gap-6">
            {/* --- HERO PRINCIPAL (900x400) --- */}
            <Link
              href={`/noticia/${destaque.slug}`}
              className="group relative block w-full h-[450px] md:rounded-xl overflow-hidden shadow-xl bg-gray-900"
            >
              <Image
                src={destaque.image.url}
                alt={destaque.title || "Imagem de destaque"}
                fill
                priority
                className="object-cover transition-transform group-hover:scale-101"
              />

              {/* TEXTO do Hero */}
              <div className="absolute bottom-0 left-0 w-full p-6 md:p-8">
                <div className="max-w-md">
                  <h1 className="text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] text-2xl md:text-3xl font-black leading-tight uppercase italic tracking-tighter decoration-[#E6C62F] underline underline-offset-4 decoration-4 group-hover:text-[#E6C62F] transition-colors">
                    {destaque.title}
                  </h1>
                </div>
              </div>
            </Link>


            {/* --- HERO SECUNDÁRIO (Escondido no Mobile) --- */}
            {/* A lógica "hidden md:flex" garante que ele só apareça do Desktop em diante */}
            {secundaria && (
            <Link
              href={`/noticia/${secundaria.slug}`}
              className="hidden lg:flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group"
            >
              {/* Área da Imagem Secundária */}
              <div className="relative w-full h-[200px] overflow-hidden">
                <Image
                  src={secundaria.image?.url || "/placeholder.png"}
                  alt={secundaria.title || "Destaque Secundário"}
                  fill
                  className="object-cover bg-gray-900 transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Texto da Notícia Secundária */}
              <div className="p-4 flex flex-col gap-2">
                {/* O group-hover agora vai mudar a cor do texto e do sublinhado perfeitamente */}
                <h2 className="text-gray-900 drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)] text-lg xl:text-2xl font-black leading-tight uppercase italic tracking-tighter decoration-[#825d22] underline underline-offset-4 decoration-4 group-hover:text-[#866608] group-hover:decoration-[#88691c] transition-colors duration-300">
                  {secundaria.title}
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-4 font-medium">
                  {secundaria.description}
                </p>
              </div>
            </Link>
          )}
          </div>

        </section>
      ) : (
        <div className="w-full h-full bg-gray-900" />
      )}
    </>
  );
}
