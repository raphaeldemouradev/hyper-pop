import { StructuredTextDocument } from "react-datocms";

/* 1. O que o site (Frontend) espera 
 * Usado nos componentes de UI como CardNoticia */
export interface NoticiaProps {
  id?: string;
  titulo: string;
  imagemUrl: string;
  descricao: string;
  categoria: string;
  slug: string;
  data: string;
}

/* 2. Interfaces auxiliares para o DatoCMS */
export interface ImageDato {
  url: string;
  author?: string; // Campo para os direitos autorais/créditos
  alt?: string;
}

// Representa o bloco específico de anúncio
export interface BlockAnuncio {
  id: string;
  __typename: "AnuncioRecord";
}

/** * 3. União de Blocos (AllBlocks)
 * Aqui você adiciona novos blocos no futuro (ex: BlockVideo | BlockGaleria)
 * Por enquanto, aceitamos o Anuncio ou qualquer registro genérico.
 */
export type AllBlocks = BlockAnuncio | { id: string; __typename: string };

// Props para a função renderBlock do StructuredText - Ajustado para ser genérico
export interface RenderBlockProps {
  record: any; 
}

/* 4. O que o DatoCMS (Backend) envia */
export interface PostDato {
  id: string;
  title: string;
  description: string;
  slug: string;
  category: string;
  date: string;
  image: ImageDato | null;
  content: {
    value: StructuredTextDocument;
    blocks: AllBlocks[]; // MUDANÇA: Agora aceita a união de blocos para renderizar corretamente
  };
  _firstPublishedAt?: string;
  _updatedAt?: string;
}