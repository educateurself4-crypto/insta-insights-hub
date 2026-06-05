export type AnalysisResult = {
  handle: string;
  niche: string;
  strategy: string;
  actions: string;
};

const WEBHOOK_URL =
  "https://n8n.srv1012222.hstgr.cloud/webhook-test/analyze-profile";

export async function analyzeHandle(handle: string): Promise<AnalysisResult> {
  const username = handle.trim().replace(/^@/, "");

  const res = await fetch(WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username }),
  });

  if (!res.ok) {
    throw new Error(`Webhook responded with ${res.status}`);
  }

  const data = await res.json();
  const report = data?.analysis_report ?? {};

  return {
    handle: data?.username ?? username,
    niche: report.niche_analysis ?? "",
    strategy: report.content_strategy ?? "",
    actions: report.engagement_actions ?? "",
  };
}
