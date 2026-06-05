import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Sparkles, Target, ListChecks } from "lucide-react";
import type { AnalysisResult } from "@/lib/analyze";

function FormattedText({ text }: { text: string }) {
  const blocks = text
    .split(/\n\s*\n/)
    .map((b) => b.trim())
    .filter(Boolean);

  return (
    <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
      {blocks.map((block, i) => {
        const lines = block.split("\n").map((l) => l.trim()).filter(Boolean);
        const isList = lines.every((l) => /^([-*•]|\d+[.)])\s+/.test(l));
        if (isList) {
          return (
            <ul key={i} className="space-y-2 list-disc pl-5 marker:text-primary">
              {lines.map((l, j) => (
                <li key={j} className="text-foreground/90">
                  {l.replace(/^([-*•]|\d+[.)])\s+/, "")}
                </li>
              ))}
            </ul>
          );
        }
        return <p key={i}>{block}</p>;
      })}
    </div>
  );
}

export function ResultDashboard({
  result,
  onReset,
}: {
  result: AnalysisResult;
  onReset: () => void;
}) {
  const cards = [
    {
      icon: Sparkles,
      label: "Niche & Frequency",
      title: "Niche Analysis",
      content: result.niche,
    },
    {
      icon: Target,
      label: "Content Strategy",
      title: "Strategic Pillars",
      content: result.strategy,
    },
    {
      icon: ListChecks,
      label: "Engagement Actions",
      title: "Your Action Plan",
      content: result.actions,
    },
  ];

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-12">
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
        <div>
          <p className="text-sm text-muted-foreground">Strategy Report</p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
            @{result.handle}
          </h1>
        </div>
        <Button variant="outline" onClick={onReset} className="gap-2 self-start md:self-auto">
          <ArrowLeft className="h-4 w-4" /> Analyze Another Profile
        </Button>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cards.map(({ icon: Icon, label, title, content }) => (
          <Card
            key={label}
            className="border-border/60 shadow-[var(--shadow-card)] bg-[var(--gradient-card)]"
          >
            <CardHeader>
              <div className="flex items-center gap-2 text-primary">
                <Icon className="h-4 w-4" />
                <span className="text-xs uppercase tracking-wider font-medium">
                  {label}
                </span>
              </div>
              <CardTitle className="text-xl mt-2">{title}</CardTitle>
            </CardHeader>
            <CardContent>
              {content ? (
                <FormattedText text={content} />
              ) : (
                <p className="text-sm text-muted-foreground italic">
                  No content returned.
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
