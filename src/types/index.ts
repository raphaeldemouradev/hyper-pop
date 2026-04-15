import { StructuredTextDocument } from "react-datocms";

/* O que o site (Frontend) espera 
 * Usado nos componentes de UI como CardNoticia */
export interface NoticiaProps {
  id?: string;
  titulo: string;
  imagemUrl: string;
  descricao: string;
  categoria: string;
  slug: string;
  data: string;
  credit: string;
}

// Props para a função renderBlock do StructuredText - Ajustado para ser genérico
export interface RenderBlockProps {
  record: any; 
}

/* O que o DatoCMS (Backend) envia */
export interface PostDato {
  id: string;
  title: string;
  description: string;
  slug: string;
  category: string;
  date: string;
  credit: string;
  image: { url: string };
  content: {
    value: StructuredTextDocument;
    blocks: AllBlocks[]; 
  };
  _firstPublishedAt?: string;
  _updatedAt?: string;
}

/* União de Blocos (AllBlocks)
 * Aqui você adiciona novos blocos no futuro (ex: BlockVideo | BlockGaleria)
 * Por enquanto, aceitamos o Anuncio ou qualquer registro genérico.
 */
export type AllBlocks = BlockAnuncio | { id: string; __typename: string };

// Representa o bloco específico de anúncio
export interface BlockAnuncio {
  id: string;
  __typename: "AnuncioRecord";
}