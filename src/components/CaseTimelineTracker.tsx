import { caseTimeline, type TimelineCategory } from "@/data/civicData";

const categoryStyles: Record<
  TimelineCategory,
  { dot: string; badge: string; label: string }
> = {
  encounter: {
    dot: "bg-red-500",
    badge: "border-red-900/50 bg-red-950/40 text-red-300",
    label: "Incident",
  },
  judicial: {
    dot: "bg-blue-500",
    badge: "border-blue-900/50 bg-blue-950/40 text-blue-300",
    label: "Judicial",
  },
  administrative: {
    dot: "bg-amber-500",
    badge: "border-amber-900/50 bg-amber-950/40 text-amber-300",
    label: "Administrative",
  },
};

function formatDate(isoDate: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  }).format(new Date(`${isoDate}T00:00:00`));
}

export default function CaseTimelineTracker() {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5 sm:p-6">
      <div className="mb-6">
        <h3 className="text-base font-semibold text-zinc-50 sm:text-lg">
          Case Timeline Tracker
        </h3>
        <p className="mt-1 text-sm text-zinc-400">
          Verified milestones from the Bhojpur encounter and subsequent
          administrative actions.
        </p>
      </div>

      <ol className="relative space-y-0">
        {caseTimeline.map((event, index) => {
          const styles = categoryStyles[event.category];
          const isLast = index === caseTimeline.length - 1;

          return (
            <li key={event.id} className="relative flex gap-4 pb-8 last:pb-0">
              {!isLast && (
                <span
                  aria-hidden="true"
                  className="absolute left-[7px] top-3 h-[calc(100%-0.25rem)] w-px bg-zinc-800"
                />
              )}

              <span
                aria-hidden="true"
                className={`relative z-10 mt-1.5 h-3.5 w-3.5 shrink-0 rounded-full ring-4 ring-zinc-900/50 ${styles.dot}`}
              />

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <time
                    dateTime={event.date}
                    className="text-xs font-medium uppercase tracking-wide text-zinc-500"
                  >
                    {formatDate(event.date)}
                  </time>
                  <span
                    className={`rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide ${styles.badge}`}
                  >
                    {styles.label}
                  </span>
                </div>

                <h4 className="mt-1.5 text-sm font-semibold text-zinc-50 sm:text-base">
                  {event.title}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  {event.description}
                </p>
                <p className="mt-2 text-xs text-zinc-600">
                  Source: {event.source}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
