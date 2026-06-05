import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Sparkles, Target, ListChecks, CheckCircle2 } from "lucide-react";
import type { AnalysisResult } from "@/lib/analyze";

export function ResultDashboard({ result, onReset }: { result: AnalysisResult; onReset: () => void }) {
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
        {/* Niche & Frequency */}
        <Card className="lg:col-span-1 border-border/60 shadow-[var(--shadow-card)] bg-[var(--gradient-card)]">
          <CardHeader>
            <div className="flex items-center gap-2 text-primary">
              <Sparkles className="h-4 w-4" />
              <span className="text-xs uppercase tracking-wider font-medium">Niche & Frequency</span>
            </div>
            <CardTitle className="text-xl mt-2">{result.niche.primary}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <p className="text-sm leading-relaxed text-muted-foreground">{result.niche.summary}</p>
            <div className="grid grid-cols-2 gap-3 pt-2">
              {result.niche.metrics.map((m) => (
                <div key={m.label} className="rounded-lg border bg-background/60 p-3">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{m.label}</p>
                  <p className="mt-1 text-sm font-medium">{m.value}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Content Strategy */}
        <Card className="lg:col-span-1 border-border/60 shadow-[var(--shadow-card)] bg-[var(--gradient-card)]">
          <CardHeader>
            <div className="flex items-center gap-2 text-primary">
              <Target className="h-4 w-4" />
              <span className="text-xs uppercase tracking-wider font-medium">Content Strategy</span>
            </div>
            <CardTitle className="text-xl mt-2">Strategic Pillars</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {result.strategy.pillars.map((p, i) => (
                <li key={p.title} className="flex gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-semibold">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-sm font-medium">{p.title}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{p.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Engagement Actions */}
        <Card className="lg:col-span-1 border-border/60 shadow-[var(--shadow-card)] bg-[var(--gradient-card)]">
          <CardHeader>
            <div className="flex items-center gap-2 text-primary">
              <ListChecks className="h-4 w-4" />
              <span className="text-xs uppercase tracking-wider font-medium">Engagement Actions</span>
            </div>
            <CardTitle className="text-xl mt-2">Your Action Plan</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-3">
              {result.actions.map((a, i) => (
                <li
                  key={a.title}
                  className="group flex gap-3 rounded-lg border border-transparent p-2 -mx-2 hover:border-border hover:bg-background/60 transition-colors"
                >
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-muted-foreground group-hover:text-success transition-colors mt-0.5" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium">{a.title}</p>
                      <Badge variant="secondary" className="text-[10px]">Step {i + 1}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{a.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
