import { performRequest } from "../../../lib/datocms";
import CardNoticia from "../../../components/CardNoticia";
import { PostDato, NoticiaProps } from "../../../types";
import { Fragment } from "react/jsx-runtime";
import AdTopHorizontal from "@/src/components/ads/AdTopHorizontal";
import AdPostGrid from "@/src/components/ads/AdPostGrid";

const CATEGORIA_QUERY = `
  query CategoryPage($nicho: String) {
    allPosts(filter: {category: {eq: $nicho}}, orderBy: date_DESC) {
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

export default async function PageCategoria({ params }: { params: Promise<{ slug: string }> | { slug: string } }) {
  const resolvedParams = await params;
  const slugDaUrl = resolvedParams.slug;

  // Ajuste para garantir que a busca bata com o DatoCMS (Ex: "esportes" -> "Esportes")
  const nichoParaFiltrar = slugDaUrl.charAt(0).toUpperCase() + slugDaUrl.slice(1);

  const data = await performRequest({ 
    query: CATEGORIA_QUERY, 
    variables: { nicho: nichoParaFiltrar } 
  });

  const noticiasFiltradas: PostDato[] = data.allPosts;

  return (
    <main className="min-h-screen bg-white">
      {/* Navbar */}

      {/* Anuncio */}
      <AdTopHorizontal />

      {/* CABEÇALHO CLEAN */}
      <header className="max-w-7xl mx-auto px-6 pt-10 pb-8">
        <div className="flex flex-col gap-2">
          <span className="text-gray-400 text-xs font-bold uppercase tracking-[0.3em]">
            Nicho:
          </span>
          
          {/* Container do Título + Barra Vermelha agora em Coluna */}
          <div className="flex flex-col items-start gap-3">
            <h1 className="text-black text-4xl md:text-6xl font-black uppercase italic tracking-tighter leading-none">
              {nichoParaFiltrar}
            </h1>
            
            {/* A barrinha agora fica embaixo (w-20 ou w-full, você escolhe o tamanho) */}
            <div className="h-2 w-20 bg-[#A32222]"></div>
          </div>

          {/* Linha separadora cinza de fundo */}
          <div className="h-1 w-full bg-gray-100 mt-3"></div>
        </div>
      </header>

      {/* LISTAGEM DE NOTÍCIAS */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        {noticiasFiltradas.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {noticiasFiltradas.map((post, index) => {
              const props: NoticiaProps = {
                titulo: post.title,
                imagemUrl: post.image?.url || "",
                descricao: post.description,
                categoria: post.category,
                slug: post.slug,
                data: post.date
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
              )
            })}
          </div>
        ) : (
          <div className="text-center py-20 bg-[#F9F9F9] rounded-2xl">
            <p className="text-gray-500 font-bold uppercase italic">
              Nenhuma matéria encontrada em {nichoParaFiltrar}.
            </p>
          </div>
        )}
      </section>

      {/*<Footer />*/}
    </main>
  );
}