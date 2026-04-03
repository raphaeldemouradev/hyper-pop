import { StructuredText } from "react-datocms/structured-text";
import React from "react";
import { performRequest } from "../../../lib/datocms";
import AdMateria from "../../../components/AdMateria";
import { PostDato, RenderBlockProps } from "../../../types";
import Link from "next/link";
import { Metadata } from "next";
import Image from "next/image";
import CardNoticia from "@/src/components/CardNoticia";

const NOTICIA_QUERY = `
  query SinglePost($slug: String) {
    post(filter: {slug: {eq: $slug}}) {
      id
      title
      category
      date
      description
      image {
        url
      }
      content {
        value
        blocks {
          id
          __typename
        }
      }
    }
  }
`;

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const resolvedParams = await params;
  const data = await performRequest({ 
    query: `query PostSEO($slug: String) {
      post(filter: {slug: {eq: $slug}}) {
        title
        description
        image { url }
      }
    }`, 
    variables: { slug: resolvedParams.slug } 
  });

  const noticia = data.post;
  return {
    title: noticia?.title,
    description: noticia?.description,
    openGraph: {
      title: noticia?.title,
      description: noticia?.description,
      images: [noticia?.image?.url || ""],
      type: "article",
    },
  };
}

export default async function PageNoticia({ params }: { params: Promise<{ slug: string }> | { slug: string } }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug; 

  const data = await performRequest({ 
    query: NOTICIA_QUERY, 
    variables: { slug: slug } 
  });

  const noticia: PostDato = data.post;

// BUSCA SEM MEXER NO GRAPHQL ORIGINAL
// Criamos uma query rápida só para pegar as recomendações da mesma categoria
const recommendationsData = await performRequest({
  query: `
    query Recs($category: String, $currentSlug: String) {
      allPosts(first: 3, filter: {category: {eq: $category}, slug: {neq: $currentSlug}}) {
        id
        title
        description
        slug
        category
        date
        image { url }
      }
    }
  `,
  variables: { 
    category: noticia.category, 
    currentSlug: slug 
  }
});

const recomendados = recommendationsData.allPosts;

  if (!noticia) {
    return <div className="p-20 text-center font-bold">Notícia não encontrada.</div>;
  }

  return (
    <main className="min-h-screen bg-white">
      {/*<Navbar />*/}

      {/* AD TOPO (Banner) */}
      <div className="w-full bg-[#f0f0f0] py-8 flex justify-center border-b border-gray-200">
        <div className="w-[300px] h-[80px] md:w-[728px] md:h-[90px] bg-gray-300 flex items-center justify-center border border-gray-400">
           <span className="text-gray-500 font-mono text-sm tracking-widest">ANÚNCIO (AD)</span>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-6 py-8">
        <header className="mb-8">
          <Link href={`/categoria/${noticia.category.toLowerCase()}`}>
            <span className="text-[#e62f2f] font-black uppercase tracking-[0.2em] text-xs italic mb-2 inline-block hover:underline underline-offset-4">
              {noticia.category}
            </span>
          </Link>
          <h1 className="text-3xl md:text-6xl font-black text-[#1A1A1A] mt-2 mb-6 leading-tight uppercase italic tracking-tighter">
            {noticia.title}
          </h1>
          <p className="text-xl text-gray-500 italic mb-6 border-l-4 border-[#E6C62F] pl-4">
            {noticia.description}
          </p>
        </header>

        <div className="relative w-full h-[300px] md:h-[500px] mb-10 overflow-hidden rounded-2xl shadow-xl bg-gray-100">
          {noticia.image?.url && (
            <Image src={noticia.image.url} alt={noticia.title} fill className="object-cover object-top" priority />
          )}
        </div>

        <div className="conteudo-materia max-w-none">
          <StructuredText 
            data={noticia.content} 
            // 1. RENDERIZAR OS BLOCOS (Onde você arrastou o Anuncio no Dato)
            renderBlock={({ record }: RenderBlockProps ) => {
              if (record.__typename === "AnuncioRecord") {
                return <AdMateria />;
              }
              return null;
            }}
          />
        </div>
        
        {/* Seção de Recomendados usando seu componente CardNoticia */}
        <section className="max-w-4xl mx-auto py-12 border-t border-gray-100">
          <h2 className="text-2xl font-black uppercase italic tracking-tighter mb-8 flex items-center">
            <span className="w-2 h-8 bg-[#E6C62F] mr-3"></span>
            Veja também em {noticia.category}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recomendados.map((item: PostDato) => (
              <CardNoticia 
                key={item.id} 
                noticia={{
                  id: item.id,
                  titulo: item.title,
                  imagemUrl: item.image?.url || "",
                  descricao: item.description,
                  categoria: item.category,
                  slug: item.slug,
                  data: item.date
                }} 
              />
            ))}
          </div>
        </section>
      </article>

      {/*<Footer />*/}
    </main>
  );
}

