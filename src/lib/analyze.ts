import { createServerFn } from "@tanstack/react-start";

export type AnalysisResult = {
  handle: string;
  niche: string;
  strategy: string;
  actions: string;
};

const WEBHOOK_URL =
  "https://n8n.srv1012222.hstgr.cloud/webhook-test/analyze-profile";

export const analyzeHandle = createServerFn({ method: "POST" })
  .inputValidator((data: { username: string }) => data)
  .handler(async ({ data }) => {
    const username = data.username.trim().replace(/^@/, "");

    const res = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username }),
    });

    if (!res.ok) {
      throw new Error(`Webhook responded with ${res.status}`);
    }

    const json = await res.json();
    const report = json?.analysis_report ?? {};

    return {
      handle: json?.username ?? username,
      niche: report.niche_analysis ?? "",
      strategy: report.content_strategy ?? "",
      actions: report.engagement_actions ?? "",
    } satisfies AnalysisResult;
  });
