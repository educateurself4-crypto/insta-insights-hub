import { useEffect, useState } from "react";
import { Check, Loader2 } from "lucide-react";

const STAGES = [
  "Scraping Profile Data...",
  "Structuring AI Context...",
  "Generating Strategy Report...",
];

export function LoadingStages() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setStage((s) => (s < STAGES.length - 1 ? s + 1 : s));
    }, 1400);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="mt-10 mx-auto max-w-md rounded-2xl border bg-card/70 backdrop-blur p-6 shadow-[var(--shadow-card)]">
      <ul className="space-y-4">
        {STAGES.map((label, i) => {
          const done = i < stage;
          const active = i === stage;
          return (
            <li key={label} className="flex items-center gap-3">
              <span
                className={`flex h-7 w-7 items-center justify-center rounded-full border transition-all ${
                  done
                    ? "bg-success text-success-foreground border-transparent"
                    : active
                    ? "bg-primary/10 border-primary text-primary"
                    : "bg-muted border-border text-muted-foreground"
                }`}
              >
                {done ? (
                  <Check className="h-4 w-4" />
                ) : active ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <span className="text-xs">{i + 1}</span>
                )}
              </span>
              <span
                className={`text-sm transition-colors ${
                  active ? "text-foreground font-medium" : done ? "text-muted-foreground line-through" : "text-muted-foreground"
                }`}
              >
                {label}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
