import { categories } from './categories';
import { aiAssistantsTemplates } from './templates-ai-assistants';
import { contentTemplates } from './templates-content';
import { dataAnalysisTemplates } from './templates-data';
import { seoTemplates } from './templates-seo';
import { socialMediaTemplates } from './templates-social';
import { specializedToolsTemplates } from './templates-specialized';
import { otherTemplates } from './templates-other';

// Export categories
export { categories };
export type { Category } from './categories';

// Export Template interface
export type { Template } from './templates-ai-assistants';

// Combine all templates
export const templates = [
  ...aiAssistantsTemplates,
  ...contentTemplates,
  ...dataAnalysisTemplates,
  ...seoTemplates,
  ...socialMediaTemplates,
  ...specializedToolsTemplates,
  ...otherTemplates,
];
