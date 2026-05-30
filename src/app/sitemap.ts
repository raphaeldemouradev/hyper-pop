// src/app/sitemap.ts
import { MetadataRoute } from 'next';
import { performRequest } from '../lib/datocms';
import { PostDato } from '../types';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 1. Defina a URL base do seu site
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
    // ATIVADO: O Google ama ver a data exata da última modificação do post para indexar notícias rápidas
    lastModified: post._updatedAt ? new Date(post._updatedAt) : new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.7,
  }));

  // 4. Definimos as páginas fixas (Home e Categorias)
  const paginasEstaticas = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'hourly' as const, // Mudado de 'always' para 'hourly' (padrão aceito por crawlers)
      priority: 1.0, 
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
    {
      url: `${baseUrl}/sobre`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5, 
    },
    {
      url: `${baseUrl}/privacidade`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/termos`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    },
  ];

  return [...paginasEstaticas, ...noticiasUrls];
}