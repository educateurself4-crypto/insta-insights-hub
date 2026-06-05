import { createServerFn } from "@tanstack/react-start";

export type AnalysisResult = {
  handle: string;
  niche: string;
  strategy: string;
  actions: string;
};

export type AnalyzeHandleResponse =
  | { ok: true; result: AnalysisResult }
  | { ok: false; message: string };

const WEBHOOK_URL =
  "https://n8n.srv1012222.hstgr.cloud/webhook-test/analyze-profile";

export const analyzeHandle = createServerFn({ method: "POST" })
  .inputValidator((data: { username: string }) => data)
  .handler(async ({ data }) => {
    const username = data.username.trim().replace(/^@+/, "");

    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      });

      const text = await res.text();

      if (!res.ok) {
        console.error("Profile analysis webhook failed", {
          status: res.status,
          body: text.slice(0, 500),
        });

        return {
          ok: false,
          message:
            res.status === 404
              ? "The analyser is not ready yet. Start the workflow in n8n, then try again."
              : "The analyser could not complete the request. Please try again.",
        } satisfies AnalyzeHandleResponse;
      }

      if (!text.trim()) {
        console.error("Profile analysis webhook returned an empty response");
        return {
          ok: false,
          message: "The analyser returned no data. Please try again.",
        } satisfies AnalyzeHandleResponse;
      }

      let json: any;
      try {
        json = JSON.parse(text);
      } catch {
        console.error("Profile analysis webhook returned non-JSON response", {
          body: text.slice(0, 500),
        });
        return {
          ok: false,
          message: "The analyser returned an unexpected response. Please try again.",
        } satisfies AnalyzeHandleResponse;
      }

      const report = json?.analysis_report ?? {};

      return {
        ok: true,
        result: {
          handle: json?.username ?? username,
          niche: report.niche_analysis ?? "",
          strategy: report.content_strategy ?? "",
          actions: report.engagement_actions ?? "",
        },
      } satisfies AnalyzeHandleResponse;
    } catch (error) {
      console.error("Profile analysis request failed", error);
      return {
        ok: false,
        message: "The analyser is temporarily unavailable. Please try again.",
      } satisfies AnalyzeHandleResponse;
    }
  });
