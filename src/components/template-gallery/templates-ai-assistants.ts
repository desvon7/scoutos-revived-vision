export interface Template {
  id: string;
  emoji: string;
  title: string;
  description: string;
  category: string;
  backgroundColor: string;
  featured?: boolean;
}

export const aiAssistantsTemplates: Template[] = [
  {
    id: 'ai-bookmark-librarian',
    emoji: '🔖',
    title: 'AI Bookmark Librarian',
    description: 'Effortlessly organize your video bookmarks with the Bookmark Librarian',
    category: 'ai-assistants',
    backgroundColor: '#4f46e5',
  },
  {
    id: 'ai-slack-rag-advanced',
    emoji: '🤖',
    title: 'AI Slack RAG Bot (Advanced)',
    description: 'A powerful AI-powered Slack bot that responds to user queries',
    category: 'ai-assistants',
    backgroundColor: '#7c3aed',
  },
  {
    id: 'ai-slack-rag-simple',
    emoji: '💬',
    title: 'AI Slack RAG Bot (Simple)',
    description: 'Second part of a two-part system for Slack integration',
    category: 'ai-assistants',
    backgroundColor: '#8b5cf6',
  },
  {
    id: 'ai-translation-agent',
    emoji: '🌐',
    title: 'AI Two-Way Translation Agent',
    description: 'Effortlessly translate messages between English and Japanese',
    category: 'ai-assistants',
    backgroundColor: '#0ea5e9',
  },
  {
    id: 'basic-llm',
    emoji: '🚀',
    title: 'Basic LLM Workflow',
    description: 'Enhance your productivity with the Basic LLM Workflow',
    category: 'ai-assistants',
    backgroundColor: '#b91c1c',
  },
  {
    id: 'rag',
    emoji: '📊',
    title: 'Basic RAG Workflow',
    description: "A basic RAG workflow template using Scout's powerful workflow",
    category: 'ai-assistants',
    backgroundColor: '#db2777',
  },
  {
    id: 'scout-copilot',
    emoji: '👨‍💻',
    title: 'Basic Scout Copilot',
    description: 'Create an intelligent AI-powered assistant for your marketing site',
    category: 'ai-assistants',
    backgroundColor: '#10b981',
  },
  {
    id: 'collection-curation-bot',
    emoji: '📚',
    title: 'Collection Curation Slack Bot',
    description: 'Slackbot that stores user messages into a scout collection',
    category: 'ai-assistants',
    backgroundColor: '#0f766e',
  },
  {
    id: 'discord-bot',
    emoji: '🎮',
    title: 'Discord Bot',
    description: 'A powerful AI-powered Discord bot that responds to user queries',
    category: 'ai-assistants',
    backgroundColor: '#5865f2',
  },
  {
    id: 'lead-enrichment-bot',
    emoji: '💼',
    title: 'Lead Enrichment Slack Bot',
    description: 'Workflow that integrates with your Slack channel',
    category: 'ai-assistants',
    backgroundColor: '#059669',
  },
  {
    id: 'shopify-assistant',
    emoji: '🛍️',
    title: 'Shopify AI Help Assistant',
    description: 'Streamline customer support for Shopify stores',
    category: 'ai-assistants',
    backgroundColor: '#16a34a',
  },
  {
    id: 'sms-sales-bot',
    emoji: '📱',
    title: 'Smart SMS Bot for Sales',
    description: 'AI Sales Development Representative for SMS communications',
    category: 'ai-assistants',
    backgroundColor: '#d97706',
  },
  {
    id: 'support-request-classifier',
    emoji: '🔍',
    title: 'Support Request Classifier',
    description: 'Classifies customer support requests as Priority 1, 2, or 3',
    category: 'ai-assistants',
    backgroundColor: '#0891b2',
  },
  {
    id: 'teach-ai-slack-bot',
    emoji: '🧠',
    title: 'Teach the AI Slack Bot',
    description: 'Foundation of a two-part system for Slack integration',
    category: 'ai-assistants',
    backgroundColor: '#6366f1',
  },
];
