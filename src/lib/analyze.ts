export type AnalysisResult = {
  handle: string;
  niche: {
    primary: string;
    summary: string;
    metrics: { label: string; value: string }[];
  };
  strategy: {
    pillars: { title: string; description: string }[];
  };
  actions: {
    title: string;
    description: string;
  }[];
};

const niches = [
  "Lifestyle & Wellness",
  "Tech & Productivity",
  "Travel & Adventure",
  "Food & Culinary Arts",
  "Fashion & Streetwear",
  "Fitness & Performance",
];

function pick<T>(arr: T[], seed: number) {
  return arr[seed % arr.length];
}

function hash(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

export async function analyzeHandle(handle: string): Promise<AnalysisResult> {
  // Simulated analysis — replace with real backend later.
  await new Promise((r) => setTimeout(r, 600));
  const clean = handle.replace(/^@/, "");
  const seed = hash(clean);
  const niche = pick(niches, seed);

  return {
    handle: clean,
    niche: {
      primary: niche,
      summary: `@${clean} operates in the ${niche.toLowerCase()} space with a consistent visual identity and a clear point of view. The account leans on a balance of aspirational imagery and educational captions, attracting an audience that values both inspiration and practical takeaways.`,
      metrics: [
        { label: "Posting Frequency", value: `${3 + (seed % 4)}× / week` },
        { label: "Content Mix", value: "Reels 55% · Carousel 30% · Static 15%" },
        { label: "Avg. Engagement", value: `${(2 + (seed % 50) / 10).toFixed(1)}%` },
        { label: "Tone of Voice", value: "Warm, authoritative, concise" },
      ],
    },
    strategy: {
      pillars: [
        { title: "Signature Series", description: "Build a recurring weekly format (e.g. 'Monday Mindset') so followers anticipate and re-share content." },
        { title: "Educational Carousels", description: "Translate one pillar topic into 7-slide carousels — these drive the highest saves and shares." },
        { title: "Behind-the-Scenes Reels", description: "Short vertical clips humanizing the brand. Hook in 1.5s, payoff under 12s." },
        { title: "Community Spotlights", description: "Repost UGC and quote followers in stories to deepen loyalty and lower acquisition cost." },
        { title: "Cross-platform Hooks", description: "Repurpose top Reels to TikTok and YouTube Shorts within 48 hours to compound reach." },
      ],
    },
    actions: [
      { title: "Refresh the bio in the next 24h", description: "Lead with a clear value proposition + a single CTA link. Remove emojis that dilute clarity." },
      { title: "Pin three best-performing posts", description: "Curate the top of the grid so first-time visitors immediately understand the niche." },
      { title: "Ship one Reel daily for 14 days", description: "Use the same hook formula. Track watch-through rate, not just likes." },
      { title: "Reply to every comment for 7 days", description: "Algorithm rewards early engagement. Use questions to extend comment threads." },
      { title: "Run a story poll twice a week", description: "Surface audience preferences and feed insights back into the content calendar." },
      { title: "Audit hashtag set on Friday", description: "Drop low-performing tags. Test 3 new niche-specific tags per post." },
    ],
  };
}
