// src/app/sitemap.ts
import { MetadataRoute } from 'next';
import { performRequest } from '../lib/datocms';
import { PostDato } from '../types';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 1. Defina a URL base do seu site (quando você subir para a Vercel, mude aqui)
  const baseUrl = "https://hyper-pop.vercel.app";

  // 2. Buscamos todos os posts no DatoCMS para criar os links das notícias
  const data = await performRequest({
    query: `
      query {
        allPosts {
          slug
          _updatedAt
        }
      }
    `,
  });

  // 3. Transformamos os dados do Dato em links do Sitemap
  const noticiasUrls = data.allPosts.map((post: PostDato) => ({
    url: `${baseUrl}/noticia/${post.slug}`,
    //lastModified: new Date(post._updatedAt),
    changeFrequency: 'daily' as const,
    priority: 0.7,
  }));

  // 4. Definimos as páginas fixas (Home e Categorias)
  const paginasEstaticas = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'always' as const,
      priority: 1.0, // A Home é sempre a prioridade máxima
    },
    {
      url: `${baseUrl}/categoria/esportes`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/categoria/entretenimento`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/categoria/videogame`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ];

  // Retornamos a união das páginas fixas com as notícias dinâmicas
  return [...paginasEstaticas, ...noticiasUrls];
}