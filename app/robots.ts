import { MetadataRoute } from 'next'

// Private app/auth areas. /login and /register are crawlable but served noindex.
const disallow = ['/api/', '/dashboard', '/brand-monitor', '/forgot-password', '/reset-password', '/autumn-verify']

// AI crawlers and AI assistants we explicitly welcome. They get the same
// disallow list, since a bot with its own group ignores the '*' group.
const aiBots = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-SearchBot',
  'Claude-User',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
  'Meta-ExternalAgent',
  'Amazonbot',
  'DuckAssistBot',
  'CCBot',
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow,
      },
      {
        userAgent: aiBots,
        allow: '/',
        disallow,
      },
    ],
    sitemap: 'https://www.aibrandtrack.com/sitemap.xml',
  }
}
