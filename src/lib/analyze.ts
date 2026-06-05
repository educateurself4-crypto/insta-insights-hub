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
const PRODUCTION_WEBHOOK_URL =
  "https://n8n.srv1012222.hstgr.cloud/webhook/analyze-profile";

function firstObject(value: any): any {
  if (Array.isArray(value)) return firstObject(value[0]);
  if (value?.json) return firstObject(value.json);
  if (value?.body) return firstObject(value.body);
  if (value?.data) return firstObject(value.data);
  if (value?.result) return firstObject(value.result);
  return value;
}

function tryParseJson(value: any): any {
  if (typeof value !== "string") return value;
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}

function mapAnalysisResult(json: any, fallbackUsername: string): AnalysisResult | null {
  const payload = firstObject(tryParseJson(json));
  const report = firstObject(tryParseJson(payload?.analysis_report ?? payload?.analysisReport));

  const niche = String(report?.niche_analysis ?? report?.nicheAnalysis ?? "").trim();
  const strategy = String(report?.content_strategy ?? report?.contentStrategy ?? "").trim();
  const actions = String(report?.engagement_actions ?? report?.engagementActions ?? "").trim();

  if (!niche && !strategy && !actions) return null;

  return {
    handle: payload?.username ?? payload?.handle ?? fallbackUsername,
    niche,
    strategy,
    actions,
  };
}

async function callWebhook(url: string, username: string) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username }),
  });

  return { res, text: await res.text() };
}

export const analyzeHandle = createServerFn({ method: "POST" })
  .inputValidator((data: { username: string }) => data)
  .handler(async ({ data }) => {
    const username = data.username.trim().replace(/^@+/, "");

    try {
      let { res, text } = await callWebhook(WEBHOOK_URL, username);

      if (res.status === 404) {
        const fallback = await callWebhook(PRODUCTION_WEBHOOK_URL, username);
        if (fallback.res.ok || fallback.res.status !== 404) {
          res = fallback.res;
          text = fallback.text;
        }
      }

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

      const result = mapAnalysisResult(json, username);

      if (!result) {
        console.error("Profile analysis webhook returned no report fields", {
          body: text.slice(0, 500),
        });
        return {
          ok: false,
          message: "The analyser finished but returned no report data. Please try again.",
        } satisfies AnalyzeHandleResponse;
      }

      return {
        ok: true,
        result,
      } satisfies AnalyzeHandleResponse;
    } catch (error) {
      console.error("Profile analysis request failed", error);
      return {
        ok: false,
        message: "The analyser is temporarily unavailable. Please try again.",
      } satisfies AnalyzeHandleResponse;
    }
  });
