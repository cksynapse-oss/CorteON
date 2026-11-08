/**
 * Google Forms configuration for Synapse enquiry and application workflows.
 *
 * Source of truth: docs/synapse-handoff/SYNAPSE_ANTIGRAVITY_BUILD_BRIEF.md & Latest Business Brief
 * Form ownership account: cksynapse@gmail.com (canonical Google account)
 * Designated public contact email: cksynapse@gmail.com
 *
 * Provisioned & Verified via Google Apps Script.
 */

export const FORM_URLS = {
  courseGeneral:
    'https://docs.google.com/forms/d/e/1FAIpQLSd7W_keex3DcMpVVBxxCBcwKal0AkGL5n4KXj2EtlKi3q3_cQ/viewform',
  foundationPack:
    'https://docs.google.com/forms/d/e/1FAIpQLSd7W_keex3DcMpVVBxxCBcwKal0AkGL5n4KXj2EtlKi3q3_cQ/viewform?usp=pp_url&entry.1481896774=Foundation+Pack+%E2%80%94+General+Awareness+%2B+Reasoning+%2B+Quantitative+Aptitude',
  questionBank:
    'https://docs.google.com/forms/d/e/1FAIpQLSd7W_keex3DcMpVVBxxCBcwKal0AkGL5n4KXj2EtlKi3q3_cQ/viewform?usp=pp_url&entry.1481896774=Exam+Question+Bank+%26+Performance+Profile',
  subjectClasses:
    'https://docs.google.com/forms/d/e/1FAIpQLSd7W_keex3DcMpVVBxxCBcwKal0AkGL5n4KXj2EtlKi3q3_cQ/viewform?usp=pp_url&entry.1481896774=Class+11%E2%80%9312+Regular+Subject+Classes',
  subjectClassesEntrance:
    'https://docs.google.com/forms/d/e/1FAIpQLSd7W_keex3DcMpVVBxxCBcwKal0AkGL5n4KXj2EtlKi3q3_cQ/viewform?usp=pp_url&entry.1481896774=Class+11%E2%80%9312+JEE+and+NEET+Preparation',
  schoolAiLiteracy:
    'https://docs.google.com/forms/d/e/1FAIpQLSd7W_keex3DcMpVVBxxCBcwKal0AkGL5n4KXj2EtlKi3q3_cQ/viewform?usp=pp_url&entry.1481896774=AI+Literacy+for+School+Students',
  schoolBusiness:
    'https://docs.google.com/forms/d/e/1FAIpQLSd7W_keex3DcMpVVBxxCBcwKal0AkGL5n4KXj2EtlKi3q3_cQ/viewform?usp=pp_url&entry.1481896774=Business+Development+for+School+Students',
  schoolCommunication:
    'https://docs.google.com/forms/d/e/1FAIpQLSd7W_keex3DcMpVVBxxCBcwKal0AkGL5n4KXj2EtlKi3q3_cQ/viewform?usp=pp_url&entry.1481896774=Communication+Skills+for+School+Students',
  cuetPg:
    'https://docs.google.com/forms/d/e/1FAIpQLSd7W_keex3DcMpVVBxxCBcwKal0AkGL5n4KXj2EtlKi3q3_cQ/viewform?usp=pp_url&entry.1481896774=CUET+PG+Subject+Preparation',
  netPrep:
    'https://docs.google.com/forms/d/e/1FAIpQLSd7W_keex3DcMpVVBxxCBcwKal0AkGL5n4KXj2EtlKi3q3_cQ/viewform?usp=pp_url&entry.1481896774=UGC+NET+Subject+Preparation',
  communication:
    'https://docs.google.com/forms/d/e/1FAIpQLSd7W_keex3DcMpVVBxxCBcwKal0AkGL5n4KXj2EtlKi3q3_cQ/viewform?usp=pp_url&entry.1481896774=Communication+%E2%80%94+English+%2B+Hindi',
  businessDevelopment:
    'https://docs.google.com/forms/d/e/1FAIpQLSd7W_keex3DcMpVVBxxCBcwKal0AkGL5n4KXj2EtlKi3q3_cQ/viewform?usp=pp_url&entry.1481896774=Business+Development+%2B+Internship',
  aiLiteracy:
    'https://docs.google.com/forms/d/e/1FAIpQLSd7W_keex3DcMpVVBxxCBcwKal0AkGL5n4KXj2EtlKi3q3_cQ/viewform?usp=pp_url&entry.1481896774=Applied+AI+Literacy',
  aiBusinessCombo:
    'https://docs.google.com/forms/d/e/1FAIpQLSd7W_keex3DcMpVVBxxCBcwKal0AkGL5n4KXj2EtlKi3q3_cQ/viewform?usp=pp_url&entry.1481896774=AI+Literacy+%2B+Business+Development+Combo',
  internshipApplication:
    'https://docs.google.com/forms/d/e/1FAIpQLScCT6CChxlhYIocN-KA-kZkR-OJm5VTVgeR6pHPK_rmRgMKyg/viewform',
  institutionEnquiry:
    'https://docs.google.com/forms/d/e/1FAIpQLSfwlWCs5KyxWrjGzO3mB8iHGjCrbgKGAIcMlJWwRKKP5Q1oVg/viewform',
} as const;

export type FormKey = keyof typeof FORM_URLS;

/**
 * Returns true if a form URL has been configured with an active external URL.
 */
export function isFormConfigured(key: FormKey): boolean {
  const url = FORM_URLS[key];
  return typeof url === 'string' && url.startsWith('http');
}

/**
 * Resolves the destination URL for a given enquiry intent.
 * If a live Google Forms URL is provided, returns that URL.
 * If still a placeholder, safely falls back to /contact with intent query parameter
 * so that links are never broken or dead.
 */
export function getFormUrl(key: FormKey): string {
  if (isFormConfigured(key)) {
    return FORM_URLS[key];
  }
  // Safe internal fallback while Google Forms are being populated
  return `/contact?enquiry=${encodeURIComponent(key)}`;
}
