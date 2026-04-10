import Link from "next/link";
import { NoticiaProps } from "../types";
import Image from "next/image";

interface CardNoticiaComponentProps {
  noticia: NoticiaProps;
}

export default function CardNoticia({ noticia }: CardNoticiaComponentProps) {
  const dataFormatada = new Date(noticia.data).toLocaleDateString('pt-BR');
  const urlNoticia = `/noticia/${noticia.slug}`;
  const urlCategoria = `/categoria/${noticia.categoria.toLowerCase()}`;

  return (
    <div className="group flex flex-col w-full bg-[#F9F9F9] border border-gray-100 rounded-2xl overflow-hidden p-4 hover:shadow-md transition-all">
      
      {/* LINK NA IMAGEM OTIMIZADO */}
      <Link href={urlNoticia} className="relative w-full h-52 overflow-hidden rounded-xl mb-4 bg-gray-200 block">
        {noticia.imagemUrl ? (
          <Image
            src={noticia.imagemUrl}
            alt={noticia.titulo || "Capa da notícia"}
            fill // Preenche o container h-52
            className="object-cover object-top transform group-hover:scale-105 transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            quality={75}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs italic">
            Sem imagem disponível
          </div>
        )}
      </Link>

      {/* LINK NO NICHO (No meio, com underline) */}
      <div className="mb-2">
        <Link 
          href={urlCategoria}
          className="inline-block text-[#A32222] text-xs font-black uppercase tracking-widest underline underline-offset-4 decoration-2 hover:text-black transition-colors"
        >
          {noticia.categoria}
        </Link>
      </div>

      {/* LINK NO TÍTULO */}
      <Link href={urlNoticia} className="block mb-2">
        <h3 className="text-xl font-black text-[#1A1A1A] leading-tight uppercase italic tracking-tighter group-hover:text-[#A32222] transition-colors line-clamp-2">
          {noticia.titulo}
        </h3>
      </Link>

      {/* LINK NA DESCRIÇÃO */}
      <Link href={urlNoticia} className="block mb-6">
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-4 font-medium">
          {noticia.descricao}
        </p>
      </Link>

      {/* DATA (Rodapé estático) */}
      <div className="mt-auto pt-4 border-t border-gray-200/50">
        <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">
          {dataFormatada}
        </span>
      </div>
    </div>
  );
}