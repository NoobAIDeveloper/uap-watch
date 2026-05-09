import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

// robots.txt — explicit allow-list for AI crawlers.
//
// GEO best practice (per github.com/jonradoff/llmopt, geo-seo-claude, and
// awesome-generative-engine-optimization): explicitly allow AI bots so they
// can index and cite this content. Some bots default to "respect existing
// robots.txt" but ambiguous configs can be interpreted as deny — being
// explicit removes that risk.
//
// We name every major LLM crawler so this stays readable; the consolidated
// "*" rule allows everyone else by default.

const AI_CRAWLERS = [
  // OpenAI
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  // Anthropic
  "ClaudeBot",
  "Claude-Web",
  "anthropic-ai",
  "ClaudeBot-User",
  // Perplexity
  "PerplexityBot",
  "Perplexity-User",
  // Google AI Overviews + Gemini
  "Google-Extended",
  "GoogleOther",
  // Meta
  "Meta-ExternalAgent",
  "Meta-ExternalFetcher",
  "FacebookBot",
  // Apple
  "Applebot-Extended",
  "Applebot",
  // Bytedance / xAI / Mistral / Cohere / DuckDuckGo / Common Crawl
  "Bytespider",
  "CCBot",
  "cohere-ai",
  "DuckAssistBot",
  "Mistral-AI",
  "xAI",
  "Grok",
  // Misc indexers used by AI
  "Diffbot",
  "Amazonbot",
  "YouBot",
  "PetalBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      ...AI_CRAWLERS.map((bot) => ({
        userAgent: bot,
        allow: "/",
      })),
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
