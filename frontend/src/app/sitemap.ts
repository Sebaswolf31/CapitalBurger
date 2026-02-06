import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  // RECUERDA: Cambia esto por tu link real de Vercel o tu dominio .com
  const baseUrl = 'https://capital-burger.vercel.app';

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly', // Le dice a Google que actualizas precios o promos semanalmente
      priority: 1, // Prioridad máxima porque es la única página y la más importante
    },
  ];
}
