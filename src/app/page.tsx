import { performRequest } from "../lib/datocms";
import { PostDato, NoticiaProps } from "../types";
import CardNoticia from "../components/CardNoticia";
import Link from "next/link";
import Image from "next/image";
import { Fragment } from "react/jsx-runtime";
import AdTopHorizontal from "../components/ads/AdTopHorizontal";
import AdPostGrid from "../components/ads/AdPostGrid";
import HeroSection from "../components/hero/HeroSection";

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

export default async function Home() {
  //await new Promise((resolve) => setTimeout(resolve, 5000)); // Trava por 5 segundos

  const data = await performRequest({ query: HOME_QUERY });
  const noticias: PostDato[] = data.allPosts;

  const destaque = noticias[0];
  const maisRecentes = noticias.slice(1);

  return (
    <main className="min-h-screen bg-white flex flex-col">
      {/* BANNER PRINCIPAL */}
      <HeroSection />
      
      {/* ANÚNCIO (AD) - POSIÇÃO FIXA LOGO ABAIXO DO BANNER */}
      <AdTopHorizontal />

      {/* SEÇÃO MAIS RECENTES (Feed de Nicho) */}
      <section className="max-w-7xl mx-auto px-6 py-8 w-full">
        <div className="mb-10">
          <h2 className="text-3xl font-black text-black uppercase italic tracking-tighter border-l-8 border-[#A32222] pl-4">
            Mais recentes
          </h2>
        </div>

        {/* Grid de Cards conforme o Figma */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {maisRecentes.map((post, index) => {
            const props: NoticiaProps = {
              titulo: post.title,
              imagemUrl: post.image?.url || "",
              descricao: post.description,
              categoria: post.category,
              slug: post.slug,
              data: post.date,
            };

            return (
              <Fragment key={post.id}>
                {/* Renderiza o Card */}
                <CardNoticia noticia={props} />

                {/* LÓGICA DE REPETIÇÃO PARA MOBILE (A cada 3 posts) */}
                {(index + 1) % 3 === 0 && (
                  <div className="block md:hidden col-span-1">
                    <AdPostGrid type="mobile" />
                  </div>
                )}

                {/* LÓGICA DE REPETIÇÃO PARA TABLET (A cada 4 posts) */}
                {/* No tablet (2 colunas), ele aparece após 2 linhas completas (4 posts) */}
                {(index + 1) % 4 === 0 && (
                  <div className="hidden md:block lg:hidden col-span-2">
                    <AdPostGrid type="tablet" />
                  </div>
                )}

                {/* LÓGICA DE REPETIÇÃO PARA DESKTOP (A cada 6 posts) */}
                {/* No PC (3 colunas), ele aparece após 2 linhas completas (6 posts) */}
                {(index + 1) % 6 === 0 && (
                  <div className="hidden lg:block col-span-3">
                    <AdPostGrid type="desktop" />
                  </div>
                )}
              </Fragment>
            );
          })}
        </div>
      </section>

      {/*<Footer />*/}
    </main>
  );
}
