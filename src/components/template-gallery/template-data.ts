
import { 
  Brain, 
  MessageSquare, 
  Database, 
  Cpu, 
  Code, 
  FileText,
  FileOutput,
  BarChart,
  BookOpen,
  Mail,
  Globe,
  Search,
  Zap,
  Layers,
  Star,
  Users,
  DollarSign,
  Bot,
  BookMarked,
  Languages,
  Scroll,
  LineChart,
  Newspaper,
  BarChartHorizontal,
  Share2,
  CloudRain,
  FileSpreadsheet
} from 'lucide-react';
import React from 'react';

export interface Template {
  id: string;
  emoji: string;
  title: string;
  description: string;
  category: string;
  backgroundColor: string;
  featured?: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
}

export const categories: Category[] = [
  { id: 'all', name: 'All Templates', icon: Layers },
  { id: 'ai-assistants', name: 'AI Assistants & Bots', icon: Bot },
  { id: 'content-generation', name: 'Content Generation', icon: FileText },
  { id: 'data-analysis', name: 'Data Analysis & Research', icon: LineChart },
  { id: 'seo', name: 'SEO & Metadata', icon: Search },
  { id: 'social-media', name: 'Social Media & Integration', icon: Share2 },
  { id: 'specialized-tools', name: 'Specialized Tools', icon: Zap },
  { id: 'marketing', name: 'Marketing', icon: Mail },
  { id: 'customer-support', name: 'Customer Support', icon: MessageSquare },
  { id: 'engineering', name: 'Engineering', icon: Code },
  { id: 'ai', name: 'AI & Machine Learning', icon: Brain },
  { id: 'popular', name: 'Popular', icon: Star },
  { id: 'sales', name: 'Sales', icon: DollarSign },
  { id: 'product', name: 'Product', icon: Cpu },
  { id: 'personal', name: 'Personal', icon: Users },
];

export const templates: Template[] = [
  // AI Assistants and Bots
  {
    id: 'ai-bookmark-librarian',
    emoji: '🔖',
    title: 'AI Bookmark Librarian',
    description: 'Effortlessly organize your video bookmarks with the Bookmark Librarian',
    category: 'ai-assistants',
    backgroundColor: '#4f46e5'
  },
  {
    id: 'ai-slack-rag-advanced',
    emoji: '🤖',
    title: 'AI Slack RAG Bot (Advanced)',
    description: 'A powerful AI-powered Slack bot that responds to user queries',
    category: 'ai-assistants',
    backgroundColor: '#7c3aed'
  },
  {
    id: 'ai-slack-rag-simple',
    emoji: '💬',
    title: 'AI Slack RAG Bot (Simple)',
    description: 'Second part of a two-part system for Slack integration',
    category: 'ai-assistants',
    backgroundColor: '#8b5cf6'
  },
  {
    id: 'ai-translation-agent',
    emoji: '🌐',
    title: 'AI Two-Way Translation Agent',
    description: 'Effortlessly translate messages between English and Japanese',
    category: 'ai-assistants',
    backgroundColor: '#0ea5e9'
  },
  {
    id: 'basic-llm',
    emoji: '🚀',
    title: 'Basic LLM Workflow',
    description: 'Enhance your productivity with the Basic LLM Workflow',
    category: 'ai-assistants',
    backgroundColor: '#b91c1c'
  },
  {
    id: 'rag',
    emoji: '📊',
    title: 'Basic RAG Workflow',
    description: "A basic RAG workflow template using Scout's powerful workflow",
    category: 'ai-assistants',
    backgroundColor: '#db2777'
  },
  {
    id: 'scout-copilot',
    emoji: '👨‍💻',
    title: 'Basic Scout Copilot',
    description: 'Create an intelligent AI-powered assistant for your marketing site',
    category: 'ai-assistants',
    backgroundColor: '#10b981'
  },
  {
    id: 'collection-curation-bot',
    emoji: '📚',
    title: 'Collection Curation Slack Bot',
    description: 'Slackbot that stores user messages into a scout collection',
    category: 'ai-assistants',
    backgroundColor: '#0f766e'
  },
  {
    id: 'discord-bot',
    emoji: '🎮',
    title: 'Discord Bot',
    description: 'A powerful AI-powered Discord bot that responds to user queries',
    category: 'ai-assistants',
    backgroundColor: '#5865f2'
  },
  {
    id: 'lead-enrichment-bot',
    emoji: '💼',
    title: 'Lead Enrichment Slack Bot',
    description: 'Workflow that integrates with your Slack channel',
    category: 'ai-assistants',
    backgroundColor: '#059669'
  },
  {
    id: 'shopify-assistant',
    emoji: '🛍️',
    title: 'Shopify AI Help Assistant',
    description: 'Streamline customer support for Shopify stores',
    category: 'ai-assistants',
    backgroundColor: '#16a34a'
  },
  {
    id: 'sms-sales-bot',
    emoji: '📱',
    title: 'Smart SMS Bot for Sales',
    description: 'AI Sales Development Representative for SMS communications',
    category: 'ai-assistants',
    backgroundColor: '#d97706'
  },
  {
    id: 'support-request-classifier',
    emoji: '🔍',
    title: 'Support Request Classifier',
    description: 'Classifies customer support requests as Priority 1, 2, or 3',
    category: 'ai-assistants',
    backgroundColor: '#0891b2'
  },
  {
    id: 'teach-ai-slack-bot',
    emoji: '🧠',
    title: 'Teach the AI Slack Bot',
    description: 'Foundation of a two-part system for Slack integration',
    category: 'ai-assistants',
    backgroundColor: '#6366f1'
  },
  
  // Content Generation
  {
    id: 'ai-newsletter',
    emoji: '📧',
    title: 'AI-Powered Newsletter Generator',
    description: 'Automate your newsletter creation process with AI',
    category: 'content-generation',
    backgroundColor: '#ec4899'
  },
  {
    id: 'seo-blog',
    emoji: '📝',
    title: 'AI-Powered SEO Blog Generator',
    description: 'Automate the creation of SEO-optimized blog posts using AI and NLP',
    category: 'content-generation',
    backgroundColor: '#10b981',
    featured: true
  },
  {
    id: 'blog-summarizer',
    emoji: '📑',
    title: 'Blog Post Summarizer',
    description: 'Automatically generate concise summaries of web pages',
    category: 'content-generation',
    backgroundColor: '#0369a1'
  },
  {
    id: 'blog-translator',
    emoji: '🌍',
    title: 'Blog Post Translator',
    description: 'Translates the content from a blog post to a new language',
    category: 'content-generation',
    backgroundColor: '#2563eb'
  },
  {
    id: 'content-redundancy',
    emoji: '🔄',
    title: 'Content Redundancy Checker',
    description: 'Reviews published content and identifies portions that are redundant',
    category: 'content-generation',
    backgroundColor: '#9333ea'
  },
  {
    id: 'economic-insights',
    emoji: '📈',
    title: 'Economic Insights Generator',
    description: 'Leverage AI to analyze economic data and market trends',
    category: 'content-generation',
    backgroundColor: '#15803d'
  },
  {
    id: 'email-subject-generator',
    emoji: '✉️',
    title: 'Email Subject Line Generator',
    description: 'Craft the perfect email subject line with AI assistance',
    category: 'content-generation',
    backgroundColor: '#7e22ce'
  },
  {
    id: 'gtm-blog-generator',
    emoji: '📗',
    title: 'GTM Engineering - AI Blog Generator',
    description: 'Part 3 of the GTM Engineering series',
    category: 'content-generation',
    backgroundColor: '#047857'
  },
  {
    id: 'gtm-competitive-research',
    emoji: '🔎',
    title: 'GTM Engineering - Competitive Research',
    description: 'Part 2 of the GTM Engineering series',
    category: 'content-generation',
    backgroundColor: '#0d9488'
  },
  {
    id: 'gtm-icp-generator',
    emoji: '🎯',
    title: 'GTM Engineering - ICP Generator',
    description: 'Part 1 of the GTM Engineering series',
    category: 'content-generation',
    backgroundColor: '#0284c7'
  },
  {
    id: 'humanize-language',
    emoji: '🗣️',
    title: 'Humanize Language',
    description: 'Refines user messages or AI-generated content',
    category: 'content-generation',
    backgroundColor: '#f59e0b'
  },
  {
    id: 'job-description-generator',
    emoji: '👔',
    title: 'Job Description Generator',
    description: 'Finds examples of similar jobs online and generates descriptions',
    category: 'content-generation',
    backgroundColor: '#6d28d9'
  },
  {
    id: 'news-summarizer',
    emoji: '📰',
    title: 'News Article Summarizer with AI',
    description: 'Quickly generate concise summaries of news articles',
    category: 'content-generation',
    backgroundColor: '#0f766e'
  },
  {
    id: 'product-announcement',
    emoji: '📢',
    title: 'Product Announcement',
    description: 'Workflow template for creating compelling product announcements',
    category: 'content-generation',
    backgroundColor: '#ea580c'
  },
  {
    id: 'product-description',
    emoji: '📦',
    title: 'Product Description',
    description: 'Extracts key information from product descriptions',
    category: 'content-generation',
    backgroundColor: '#c026d3'
  },
  {
    id: 'seo-blog-slack',
    emoji: '📋',
    title: 'SEO Blog Generator with Slack Integration',
    description: 'Creates SEO-optimized blog posts',
    category: 'content-generation',
    backgroundColor: '#0d9488'
  },
  
  // Data Analysis & Research
  {
    id: 'brand-voice-analyzer',
    emoji: '🔊',
    title: 'Brand Voice Analyzer',
    description: 'Analyzes content and determines the brand voice',
    category: 'data-analysis',
    backgroundColor: '#9333ea'
  },
  {
    id: 'company-researcher',
    emoji: '🏢',
    title: 'Company Researcher',
    description: "Research a company's funding, business model, pricing, and more",
    category: 'data-analysis',
    backgroundColor: '#4f46e5'
  },
  {
    id: 'competition-analyzer',
    emoji: '⚔️',
    title: 'Competition Analyzer',
    description: 'Researches funding, business model, pricing for companies',
    category: 'data-analysis',
    backgroundColor: '#7c3aed'
  },
  {
    id: 'daily-news-digest',
    emoji: '📅',
    title: 'Daily News Digest',
    description: "Fetch today's news from multiple sources",
    category: 'data-analysis',
    backgroundColor: '#0ea5e9'
  },
  {
    id: 'external-link-finder',
    emoji: '🔗',
    title: 'External Link Finder',
    description: "Creates search terms based on a page's content",
    category: 'data-analysis',
    backgroundColor: '#0891b2'
  },
  {
    id: 'investor-sentiment',
    emoji: '📊',
    title: 'Investor Sentiment Analysis',
    description: 'Leverage AI to analyze investor releases and stock trends',
    category: 'data-analysis',
    backgroundColor: '#059669'
  },
  {
    id: 'job-applicant-analyzer',
    emoji: '👩‍💼',
    title: 'Job Applicant Analyzer',
    description: "Evaluates an applicant's suitability for a specific job",
    category: 'data-analysis',
    backgroundColor: '#65a30d'
  },
  {
    id: 'model-comparison',
    emoji: '⚖️',
    title: 'LLM Model Comparison Tool',
    description: 'Compare performance, cost, and output of multiple AI language models',
    category: 'data-analysis',
    backgroundColor: '#059669'
  },
  {
    id: 'sentiment-analyzer',
    emoji: '😊',
    title: 'Sentiment Analyzer',
    description: 'Provides general sentiment analysis of the provided text',
    category: 'data-analysis',
    backgroundColor: '#f59e0b'
  },
  {
    id: 'stock-analysis',
    emoji: '📉',
    title: 'Stock Analysis with Exa and AI',
    description: 'Generate expert stock analysis reports using AI',
    category: 'data-analysis',
    backgroundColor: '#0284c7'
  },
  {
    id: 'stock-market-news',
    emoji: '💹',
    title: 'Stock Market News Analyzer',
    description: 'Stay ahead of market trends with AI-driven stock market news',
    category: 'data-analysis',
    backgroundColor: '#047857'
  },
  
  // SEO & Metadata
  {
    id: 'seo-smart-metadata',
    emoji: '🏷️',
    title: 'Boost SEO with Smart Metadata',
    description: 'Automatically generate SEO-optimized metadata page titles',
    category: 'seo',
    backgroundColor: '#10b981'
  },
  {
    id: 'metadata-description',
    emoji: '📝',
    title: 'Improve Metadata Description',
    description: 'Generates metadata descriptions based on a URL',
    category: 'seo',
    backgroundColor: '#0284c7'
  },
  {
    id: 'webpage-metadata',
    emoji: '🔖',
    title: 'Improve Webpage Metadata',
    description: 'Generates metadata page titles and descriptions based on a URL',
    category: 'seo',
    backgroundColor: '#7c3aed'
  },
  {
    id: 'multi-language-seo',
    emoji: '🌍',
    title: 'Multi-Language SEO Keyword',
    description: 'Reviews keywords and adapts them to multiple languages',
    category: 'seo',
    backgroundColor: '#0ea5e9'
  },
  {
    id: 'seo-keyword-enhancer',
    emoji: '🔍',
    title: 'SEO Keyword Enhancer',
    description: 'Reviews and enriches blog articles with desired keywords',
    category: 'seo',
    backgroundColor: '#059669'
  },
  {
    id: 'single-page-crawl',
    emoji: '🕸️',
    title: 'Single Page Crawl',
    description: 'Crawls and returns content for a single web page',
    category: 'seo',
    backgroundColor: '#6366f1'
  },
  
  // Social Media & Integration
  {
    id: 'blog-to-facebook',
    emoji: '📘',
    title: 'Blog to Facebook Post',
    description: 'Generate Facebook Posts with customizable tones',
    category: 'social-media',
    backgroundColor: '#1877f2'
  },
  {
    id: 'blog-to-linkedin',
    emoji: '💼',
    title: 'Blog to LinkedIn Post',
    description: 'Generate LinkedIn Posts with customizable tones',
    category: 'social-media',
    backgroundColor: '#0a66c2'
  },
  {
    id: 'blog-to-social',
    emoji: '📱',
    title: 'Blog to Social Posts',
    description: 'Convert blog articles into social media posts',
    category: 'social-media',
    backgroundColor: '#7c3aed'
  },
  {
    id: 'blog-to-tweet',
    emoji: '🐦',
    title: 'Blog to Tweet',
    description: 'Generate Tweets (X Posts) with customizable tones',
    category: 'social-media',
    backgroundColor: '#1da1f2'
  },
  {
    id: 'search-results-crawler',
    emoji: '🔎',
    title: 'Search Results Crawler',
    description: 'Crawls top search results and returns content',
    category: 'social-media',
    backgroundColor: '#0ea5e9'
  },
  {
    id: 'simple-api-endpoint',
    emoji: '🔌',
    title: 'Simple API Endpoint',
    description: 'A simple workflow that takes an input and inspects the payload',
    category: 'social-media',
    backgroundColor: '#6366f1'
  },
  {
    id: 'webpage-to-facebook',
    emoji: '🌐',
    title: 'Webpage to Facebook Post',
    description: 'Generate Facebook posts from webpage content',
    category: 'social-media',
    backgroundColor: '#1877f2'
  },
  {
    id: 'webpage-to-linkedin',
    emoji: '🔗',
    title: 'Webpage to LinkedIn Post',
    description: 'Generate LinkedIn posts from webpage content',
    category: 'social-media',
    backgroundColor: '#0a66c2'
  },
  {
    id: 'webpage-to-tweet',
    emoji: '📢',
    title: 'Webpage to Tweet',
    description: 'Generate Tweets (X Posts) from webpage content',
    category: 'social-media',
    backgroundColor: '#1da1f2'
  },
  {
    id: 'weather-report',
    emoji: '☁️',
    title: 'Weather Report',
    description: 'Provides comprehensive weather reports',
    category: 'social-media',
    backgroundColor: '#0891b2'
  },
  
  // Specialized Tools
  {
    id: 'blog-to-press-release',
    emoji: '📰',
    title: 'Blog to Press Release',
    description: 'Convert a blog article into a press release with an About section',
    category: 'specialized-tools',
    backgroundColor: '#4f46e5'
  },
  {
    id: 'perplexity',
    emoji: '🔮',
    title: 'Perplexity Clone',
    description: 'Searches the web and uses an LLM to format responses',
    category: 'specialized-tools',
    backgroundColor: '#4f46e5'
  },
  {
    id: 'prompt-comparison',
    emoji: '⚖️',
    title: 'Prompt Comparison',
    description: 'Compare cost, latency, and output quality of different AI prompts',
    category: 'specialized-tools',
    backgroundColor: '#7c3aed'
  },
  {
    id: 'resume-reviewer',
    emoji: '📄',
    title: 'Resume Reviewer with AI Insights',
    description: 'Enhance job applications with AI-powered resume analysis',
    category: 'specialized-tools',
    backgroundColor: '#0ea5e9'
  },
  {
    id: 'review-responder',
    emoji: '💬',
    title: 'Review Responder',
    description: 'Automatically generate personalized responses to reviews',
    category: 'specialized-tools',
    backgroundColor: '#10b981'
  },
  
  // Original templates that don't fit in new categories
  {
    id: 'customer-service',
    emoji: '🎭',
    title: 'Customer Service Agent',
    description: 'AI-powered customer service agent workflow',
    category: 'customer-support',
    backgroundColor: '#8b5cf6'
  },
  {
    id: 'newsletter',
    emoji: '📰',
    title: 'Newsletter Generator',
    description: 'Create engaging newsletters with AI assistance',
    category: 'marketing',
    backgroundColor: '#ec4899'
  },
  {
    id: 'code-review',
    emoji: '🔍',
    title: 'AI Code Reviewer',
    description: 'Automated code reviews using AI',
    category: 'engineering',
    backgroundColor: '#6366f1'
  },
  {
    id: 'knowledge-base',
    emoji: '📚',
    title: 'Knowledge Base Builder',
    description: 'Build and organize your knowledge base efficiently',
    category: 'data',
    backgroundColor: '#0f766e'
  },
  {
    id: 'data-analysis',
    emoji: '📈',
    title: 'Data Analysis Pipeline',
    description: 'Process and analyze data from multiple sources',
    category: 'data',
    backgroundColor: '#0ea5e9'
  },
  {
    id: 'email-generator',
    emoji: '📧',
    title: 'AI Email Generator',
    description: 'Generate professional emails with customizable templates and tone',
    category: 'marketing',
    backgroundColor: '#d97706'
  }
];
