import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { tutorProblemSchema } from './content/schemas';

const illustrative = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/illustrative' }),
  schema: tutorProblemSchema,
});

export const collections = { illustrative };
