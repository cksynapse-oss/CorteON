import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'zod';
import {
  tutorProblemSchema,
  questionBoardSchema,
  ventureProblemBoardSchema,
  passportCardSchema,
  laneBoardSchema,
  centresModelSchema,
} from './content/schemas';

const illustrative = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/illustrative' }),
  schema: z.union([
    tutorProblemSchema,
    questionBoardSchema,
    ventureProblemBoardSchema,
    passportCardSchema,
    laneBoardSchema,
    centresModelSchema,
  ]),
});

export const collections = { illustrative };
