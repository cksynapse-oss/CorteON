import { z } from 'zod';

export const StatusChipEnum = z.enum([
  'LIVE NOW',
  'OPENING NEXT',
  'DIRECTION',
  'OPEN',
]);
export type StatusChip = z.infer<typeof StatusChipEnum>;

export const SourceEnum = z.enum(['owner-confirmed', 'illustrative']);
export type Source = z.infer<typeof SourceEnum>;

export const siteSchema = z.object({
  name: z.literal('Synapse'),
  tagline: z.string().min(1),
  subline: z.string().min(1),
  domain: z.literal('corteon.in'),
  place: z.string().min(1),
  phone: z.string().regex(/^\d{10}$/),
  phoneDisplay: z.string().min(1),
  email: z.string().email(),
  hours: z.string().min(1),
  hoursDetail: z.string().min(1),
  callbackWindow: z.string().min(1),
  status: z.literal('LIVE NOW'),
  source: z.literal('owner-confirmed'),
});
export type SiteContent = z.infer<typeof siteSchema>;

export const programmeTrackSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  exams: z.array(z.string().min(1)),
  status: z.literal('LIVE NOW'),
  source: z.literal('owner-confirmed'),
});

export const programmesSchema = z.object({
  status: z.literal('LIVE NOW'),
  source: z.literal('owner-confirmed'),
  fee: z.literal('Fees are shared when you enquire.'),
  schedule: z.object({
    days: z.string().min(1),
    hours: z.string().min(1),
    attendance: z.string().min(1),
  }),
  classStructure: z.object({
    groupSize: z.string().min(1),
    dailyPracticeTest: z.string().min(1),
    doubtClinics: z.string().min(1),
  }),
  tracks: z.array(programmeTrackSchema).min(1),
  baseline: z.object({
    name: z.string().min(1),
    description: z.string().min(1),
    status: z.literal('LIVE NOW'),
    source: z.literal('owner-confirmed'),
  }),
});
export type ProgrammesContent = z.infer<typeof programmesSchema>;

export const floorItemSchema = z.object({
  id: z.enum(['g', '1', '2']),
  shortName: z.enum(['G', '1', '2']),
  name: z.string().min(1),
  status: z.enum(['LIVE NOW', 'OPENING NEXT', 'DIRECTION']),
  summary: z.string().min(1),
  liveItems: z.array(z.string()),
  plannedItems: z.array(z.string()),
  source: z.literal('owner-confirmed'),
});

export const floorsSchema = z.array(floorItemSchema).length(3);
export type FloorItem = z.infer<typeof floorItemSchema>;
export type FloorsContent = z.infer<typeof floorsSchema>;
