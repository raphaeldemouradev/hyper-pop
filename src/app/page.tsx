import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CardNoticia from "../components/CardNoticia";
import { performRequest } from "../lib/datocms";
import { PostDato, NoticiaProps } from "../types";
import Link from "next/link";
import Image from "next/image";
import { Fragment } from "react/jsx-runtime";

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
        url
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
      <Navbar />

      {/* BANNER PRINCIPAL (Refatorado para Flexbox) */}
      {destaque && (
        <section className="relative w-full h-[60vh] md:h-[80vh] bg-gray-900 overflow-hidden flex flex-col justify-end p-6 md:p-12">
          {/* Imagem de Fundo (Mantemos absoluta para não ocupar espaço no fluxo do Flex) */}
          <div className="absolute inset-0 z-0">
            {destaque.image?.url ? (
              <Image
                src={destaque.image.url}
                alt={destaque.title || "Imagem de destaque"}
                fill
                className="object-cover object-center opacity-70 transition-opacity duration-700"
                sizes="100vw"
                priority
                quality={75}
              />
            ) : (
              <div className="w-full h-full bg-gray-900" />
            )}
            {/* Overlay escuro integrado ao container da imagem */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
          </div>

          {/* Conteúdo do Hero (Agora controlado pelo Flex do pai) */}
          <div className="relative z-10 max-w-4xl">
            <Link href={`/noticia/${destaque.slug}`} className="group">
              <h1 className="text-white text-3xl md:text-6xl font-black leading-tight uppercase italic tracking-tighter decoration-[#E6C62F] underline underline-offset-8 decoration-4 group-hover:text-[#E6C62F] transition-colors">
                {destaque.title}
              </h1>
            </Link>
          </div>
        </section>
      )}
      {/* ANÚNCIO (AD) - POSIÇÃO FIXA LOGO ABAIXO DO BANNER */}
      <div className="w-full bg-[#f0f0f0] py-8 flex justify-center border-b border-gray-200">
        <div className="w-[300px] h-[100px] md:w-[728px] md:h-[90px] bg-gray-300 flex items-center justify-center border border-gray-400">
          <span className="text-gray-500 font-mono text-sm tracking-widest">
            ANÚNCIO (AD)
          </span>
        </div>
      </div>

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
                {/* Renderiza o Card da Notícia */}
                <CardNoticia noticia={props} />

                {/* Lógica: Se o índice + 1 for divisível por 3, insere o AD */}
                {(index + 1) % 3 === 0 && (
                  <div className="col-span-1 md:col-span-2 lg:col-span-3 flex justify-center py-4">
                    <div className="w-full h-[150px] bg-[#f9f9f9] border-2 border-dashed border-gray-300 flex items-center justify-center rounded-2xl">
                      <span className="text-gray-400 font-bold tracking-widest uppercase text-xs">
                        Anúncio (AD)
                      </span>
                    </div>
                  </div>
                )}
              </Fragment>
            );
          })}
        </div>
      </section>

      <Footer />
    </main>
  );
}
