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
  hero: z
    .object({
      eyebrow: z.string().min(1),
      title: z.string().min(1),
      sub: z.string().min(1),
      strip: z.string().min(1),
      primaryCta: z.object({
        label: z.string().min(1),
        href: z.string().min(1),
      }),
      secondaryCta: z.object({
        label: z.string().min(1),
        href: z.string().min(1),
      }),
    })
    .optional(),
  schedule: z.object({
    days: z.string().min(1),
    hours: z.string().min(1),
    attendance: z.string().min(1),
    attendanceRule: z.string().optional(),
    table: z
      .array(
        z.object({
          day: z.string().min(1),
          window: z.string().min(1),
          activity: z.string().min(1),
          detail: z.string().min(1),
        })
      )
      .optional(),
  }),
  classStructure: z.object({
    groupSize: z.string().min(1),
    dailyPracticeTest: z.string().min(1),
    doubtClinics: z.string().min(1),
    steps: z
      .array(
        z.object({
          number: z.string().min(1),
          name: z.string().min(1),
          summary: z.string().min(1),
        })
      )
      .optional(),
  }),
  tracks: z.array(programmeTrackSchema).min(1),
  baseline: z.object({
    name: z.string().min(1),
    description: z.string().min(1),
    status: z.literal('LIVE NOW'),
    source: z.literal('owner-confirmed'),
  }),
  feePolicy: z
    .object({
      heading: z.string().min(1),
      statement: z.literal('Fees are shared when you enquire.'),
      detail: z.string().min(1),
      cta: z.object({ label: z.string().min(1), href: z.string().min(1) }),
    })
    .optional(),
  tutorIntro: z
    .object({
      eyebrow: z.string().min(1),
      title: z.string().min(1),
      sub: z.string().min(1),
      rules: z.array(
        z.object({
          number: z.string().min(1),
          title: z.string().min(1),
          detail: z.string().min(1),
        })
      ),
    })
    .optional(),
});
export type ProgrammesContent = z.infer<typeof programmesSchema>;

export const faqItemSchema = z.object({
  id: z.string().min(1),
  question: z.string().min(1),
  answer: z.string().min(1),
});

export const faqSchema = z.object({
  status: z.literal('LIVE NOW'),
  source: z.literal('owner-confirmed'),
  heading: z.string().min(1),
  sub: z.string().min(1),
  items: z.array(faqItemSchema).min(1),
});
export type FaqItem = z.infer<typeof faqItemSchema>;
export type FaqContent = z.infer<typeof faqSchema>;

export const tutorHintSchema = z.object({
  step: z.string().min(1),
  label: z.string().min(1),
  title: z.string().min(1),
  content: z.string().min(1),
});

export const tutorProblemSchema = z.object({
  isIllustrative: z.literal(true),
  name: z.string().min(1),
  status: z.literal('DIRECTION'),
  source: z.literal('illustrative'),
  domain: z.string().min(1),
  problemTitle: z.string().min(1),
  problemStatement: z.string().min(1),
  hints: z.array(tutorHintSchema).min(1),
  calibration: z.object({
    label: z.string().min(1),
    sub: z.string().min(1),
  }),
  humanRule: z.string().min(1),
});
export type TutorHint = z.infer<typeof tutorHintSchema>;
export type TutorProblemContent = z.infer<typeof tutorProblemSchema>;

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

export const principleItemSchema = z.object({
  number: z.string().min(1),
  title: z.string().min(1),
  detail: z.string().min(1),
});

export const principlesSchema = z.object({
  status: z.literal('LIVE NOW'),
  source: z.literal('owner-confirmed'),
  heading: z.string().min(1),
  sub: z.string().min(1),
  items: z.array(principleItemSchema).length(8),
  boundary: z.object({
    label: z.string().min(1),
    text: z.string().min(1),
  }),
  unsolved: z.object({
    label: z.string().min(1),
    href: z.string().min(1),
  }),
});
export type PrinciplesContent = z.infer<typeof principlesSchema>;

export const doorItemSchema = z.object({
  id: z.enum(['parent', 'fellow', 'reader', 'founder', 'partner']),
  number: z.string().min(1),
  title: z.string().min(1),
  summary: z.string().min(1),
  action: z.string().min(1),
  href: z.string().min(1),
  status: z.enum(['LIVE NOW', 'OPENING NEXT', 'DIRECTION']),
  source: z.literal('owner-confirmed'),
});

export const doorsSchema = z.array(doorItemSchema).length(5);
export type DoorItem = z.infer<typeof doorItemSchema>;
export type DoorsContent = z.infer<typeof doorsSchema>;

export const homeSchema = z.object({
  status: z.literal('LIVE NOW'),
  source: z.literal('owner-confirmed'),
  hero: z.object({
    eyebrow: z.string().min(1),
    title: z.string().min(1),
    sub: z.string().min(1),
    stripLabel: z.string().min(1),
    strip: z.string().min(1),
    primaryCta: z.object({ label: z.string().min(1), href: z.string().min(1) }),
    secondaryCta: z.object({
      label: z.string().min(1),
      href: z.string().min(1),
    }),
  }),
  openNow: z.object({
    number: z.string().min(1),
    label: z.string().min(1),
    title: z.string().min(1),
    sub: z.string().min(1),
    fee: z.literal('Fees are shared when you enquire.'),
    lead: z.string().min(1),
    cta: z.object({ label: z.string().min(1), href: z.string().min(1) }),
  }),
  theIdea: z.object({
    number: z.string().min(1),
    label: z.string().min(1),
    title: z.string().min(1),
    problem: z.string().min(1),
    solution: z.string().min(1),
    analogy: z.string().min(1),
    cta: z.object({ label: z.string().min(1), href: z.string().min(1) }),
  }),
  theBuilding: z.object({
    number: z.string().min(1),
    label: z.string().min(1),
    title: z.string().min(1),
    sub: z.string().min(1),
    cta: z.object({ label: z.string().min(1), href: z.string().min(1) }),
  }),
  fellowshipAndTools: z.object({
    number: z.string().min(1),
    label: z.string().min(1),
    title: z.string().min(1),
    fellowship: z.object({
      title: z.string().min(1),
      summary: z.string().min(1),
      action: z.string().min(1),
      href: z.string().min(1),
    }),
    tutor: z.object({
      title: z.string().min(1),
      summary: z.string().min(1),
    }),
    passport: z.object({
      title: z.string().min(1),
      summary: z.string().min(1),
      action: z.string().min(1),
      href: z.string().min(1),
    }),
  }),
  principles: z.object({
    number: z.string().min(1),
    label: z.string().min(1),
    title: z.string().min(1),
    sub: z.string().min(1),
  }),
  chooseDoor: z.object({
    number: z.string().min(1),
    label: z.string().min(1),
    title: z.string().min(1),
    sub: z.string().min(1),
  }),
});
export type HomeContent = z.infer<typeof homeSchema>;

export const selectOptionSchema = z.object({
  value: z.string().min(1),
  label: z.string().min(1),
});

export const enquiryDoorSchema = z.object({
  id: z.enum(['parent', 'fellow', 'reader', 'founder', 'partner']),
  number: z.string().min(1),
  title: z.string().min(1),
  status: z.enum(['LIVE NOW', 'OPENING NEXT', 'DIRECTION']),
  summary: z.string().min(1),
  doorNote: z.string().min(1),
  stageLabel: z.string().optional(),
  stagePlaceholder: z.string().optional(),
  stageOptions: z.array(selectOptionSchema).optional(),
  interestLabel: z.string().optional(),
  interestPlaceholder: z.string().optional(),
  interestOptions: z.array(selectOptionSchema).optional(),
  subjectLabel: z.string().optional(),
  subjectPlaceholder: z.string().optional(),
  examLabel: z.string().optional(),
  examPlaceholder: z.string().optional(),
  cardOptionLabel: z.string().optional(),
  projectLabel: z.string().optional(),
  projectPlaceholder: z.string().optional(),
  mentorLabel: z.string().optional(),
  mentorPlaceholder: z.string().optional(),
  districtLabel: z.string().optional(),
  districtPlaceholder: z.string().optional(),
  spaceLabel: z.string().optional(),
  spacePlaceholder: z.string().optional(),
});

export const enquirySchema = z.object({
  status: z.literal('LIVE NOW'),
  source: z.literal('owner-confirmed'),
  hero: z.object({
    eyebrow: z.string().min(1),
    title: z.string().min(1),
    sub: z.string().min(1),
    strip: z.string().min(1),
  }),
  notices: z.object({
    under18: z.string().min(1),
    fees: z.literal('Fees are shared when you enquire.'),
    callback: z.string().min(1),
  }),
  doors: z.array(enquiryDoorSchema).length(5),
  commonFields: z.object({
    name: z.object({
      label: z.string().min(1),
      placeholder: z.string().min(1),
    }),
    phone: z.object({
      label: z.string().min(1),
      placeholder: z.string().min(1),
      helpText: z.string().min(1),
    }),
    email: z.object({
      label: z.string().min(1),
      placeholder: z.string().min(1),
    }),
    message: z.object({
      label: z.string().min(1),
      placeholder: z.string().min(1),
    }),
    consent: z.object({
      label: z.string().min(1),
    }),
  }),
  buttons: z.object({
    submit: z.string().min(1),
    submitting: z.string().min(1),
    submitted: z.string().min(1),
  }),
  success: z.object({
    title: z.string().min(1),
    lead: z.string().min(1),
    urgentPrompt: z.string().min(1),
    whatsappAction: z.string().min(1),
    anotherAction: z.string().min(1),
  }),
  error: z.object({
    title: z.string().min(1),
    message: z.string().min(1),
    whatsappAction: z.string().min(1),
  }),
  directContact: z.object({
    heading: z.string().min(1),
    sub: z.string().min(1),
    phoneLabel: z.string().min(1),
    emailLabel: z.string().min(1),
    placeLabel: z.string().min(1),
    hoursLabel: z.string().min(1),
  }),
});
export type EnquiryDoor = z.infer<typeof enquiryDoorSchema>;
export type EnquiryContent = z.infer<typeof enquirySchema>;

export const buildingFloorSchema = z.object({
  id: z.enum(['g', '1', '2']),
  shortName: z.enum(['G', '1', '2']),
  number: z.string().min(1),
  name: z.string().min(1),
  status: z.enum(['LIVE NOW', 'OPENING NEXT', 'DIRECTION']),
  tenseNote: z.string().min(1),
  condition: z.string().min(1),
  summary: z.string().min(1),
  description: z.string().min(1),
  items: z.array(z.string().min(1)),
  feeNotice: z.literal('Fees are shared when you enquire.'),
  primaryCta: z.object({
    label: z.string().min(1),
    href: z.string().min(1),
  }),
  secondaryCta: z.object({
    label: z.string().min(1),
    href: z.string().min(1),
  }),
});

export const buildingSchema = z.object({
  status: z.literal('LIVE NOW'),
  source: z.literal('owner-confirmed'),
  hero: z.object({
    eyebrow: z.string().min(1),
    title: z.string().min(1),
    sub: z.string().min(1),
    strip: z.string().min(1),
  }),
  switcher: z.object({
    allLabel: z.string().min(1),
    prompt: z.string().min(1),
  }),
  floors: z.array(buildingFloorSchema).length(3),
  growthRule: z.object({
    label: z.string().min(1),
    title: z.string().min(1),
    description: z.string().min(1),
    cta: z.object({
      label: z.string().min(1),
      href: z.string().min(1),
    }),
  }),
  illustrationLegend: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
  }),
});
export type BuildingFloor = z.infer<typeof buildingFloorSchema>;
export type BuildingContent = z.infer<typeof buildingSchema>;
