# Hyper Pop | Web Site de Notícias do Brasil
O Hyper Pop é um portal dinâmico de notícias focado em entregar conteúdo em tempo real sobre cultura pop, entretenimento, games e esportes. Desenvolvido para ser o ponto de encontro do público brasileiro que busca informação rápida, visual moderno e uma experiência de leitura fluida.

🚀 O Projeto
Este projeto foi concebido como uma evolução técnica em arquitetura de software, utilizando o que há de mais moderno no ecossistema Web para garantir performance máxima, SEO otimizado para os motores de busca e um sistema de gerenciamento de conteúdo (CMS) que permite atualizações sem a necessidade de novos deploys.

### Tecnologias (Stack)

* **Core:** Next.js (App Router), React, TypeScript.
* **Gestão de Conteúdo:** DatoCMS (Headless CMS) com StructuredText.
* **Estilização:**  Tailwind CSS (Implementação de layouts fluidos e Mobile-First).
* **SEO:** Implementação dinâmica de metadados e OpenGraph.

### Validação

* **Renderização de Blocos Dinâmicos:** Implementação de lógica para inserir anúncios (AdMateria) de forma automática no meio do conteúdo estruturado.
* **Tipagem Avançada de CMS:** Resolução de conflitos de tipagem entre API e Componentes, garantindo Type Safety sem depender de any (onde possível).
* **Sistema de Recomendações:** Algoritmo de filtragem por categoria no frontend para aumentar o tempo de permanência do usuário.
* **Arquitetura de Dados:** Mapeamento de dados do backend (DatoCMS) para componentes de interface.

### Estrutura de páginas
```
src/
 ├── components/    # UI Reutilizável (Navbar, Footer, CardNoticia)
 ├── lib/           # Conexão com APIs (DatoCMS)
 ├── types/         # Onde a mágica da tipagem acontece (PostDato, etc)
 └── app/           # Páginas e roteamento (Next.js App Router)
```

### Desktop
![Preview Desktop](./public/screenshots/desktop-home.png)

### Mobile
<img src="./public/screenshots/mobile-home.png" width="300px" alt="Preview Mobile">