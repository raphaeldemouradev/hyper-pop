// src/types/index.ts
import { StructuredTextDocument } from "react-datocms";

// 1. O que site (Frontend) espera (em Português para facilitar seu design)
export interface NoticiaProps {
  id?: string;
  titulo: string;
  imagemUrl: string;
  descricao: string;
  categoria: string;
  slug: string;
  data: string;
}

// Anuncio types
export interface BlockAnuncio {
  id: string;
  __typename: string
}

// bloco
export interface RenderBlockProps {
  record: BlockAnuncio;
}

// 2. O que o DatoCMS (Backend) envia (em Inglês, como está no Playground)
export interface PostDato {
  id: string;
  title: string;
  description: string;
  slug: string;
  category: string;
  date: string;
  image: {
    url: string;
  } | null;
  content: {
    value: StructuredTextDocument;
    blocks: any[];
  };
  _firstPublishedAt?: string;
  _updatedAt?: string
}