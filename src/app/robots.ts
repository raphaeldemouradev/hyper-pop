// src/app/robots.ts
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      // 1. User Agent: '*' significa que a regra vale para TODOS os robôs da internet.
      userAgent: '*', 

      // 2. Allow: '/' diz que o Google pode "entrar" e ler todas as páginas públicas.
      allow: '/',

      // 3. Disallow: Aqui você proíbe o Google de entrar em pastas privadas.
      disallow: [
        '/api/',       // Não precisa indexar suas rotas de dados/backend
        '/admin/',     // Se você tiver uma área de login no futuro
        '/*?*',        // Bloqueia URLs com parâmetros de busca (evita conteúdo duplicado)
        '/private/',   // Qualquer pasta de rascunhos ou testes
        '/studio/'
      ],
    },
    
    // 4. Sitemap: Essa é a linha mais importante! 
    // Ela aponta o caminho do mapa que acabamos de criar.
    sitemap: 'https://hyper-pop.vercel.app/sitemap.xml',
  };
}