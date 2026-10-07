import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      tag: z.string().optional().default(''),
      url: z.string().url(),
      image: image(),
      order: z.number().default(99),
      hidden: z.boolean().optional().default(false),
      service: z.string().optional(),
      summary_ar: z.string().optional(),
      summary_en: z.string().optional(),
    }),
});

export const collections = { projects };
