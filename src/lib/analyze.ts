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

    const text = await res.text();

    if (!res.ok) {
      throw new Error(`Webhook responded with ${res.status}: ${text.slice(0, 200)}`);
    }

    if (!text.trim()) {
      throw new Error(
        "Webhook returned an empty response. In n8n, add a 'Respond to Webhook' node (or set the Webhook node's 'Respond' option to 'When Last Node Finishes') so the workflow returns the analysis JSON."
      );
    }

    let json: any;
    try {
      json = JSON.parse(text);
    } catch {
      throw new Error(`Webhook returned non-JSON response: ${text.slice(0, 200)}`);
    }

    const report = json?.analysis_report ?? {};

    return {
      handle: json?.username ?? username,
      niche: report.niche_analysis ?? "",
      strategy: report.content_strategy ?? "",
      actions: report.engagement_actions ?? "",
    } satisfies AnalysisResult;
  });
