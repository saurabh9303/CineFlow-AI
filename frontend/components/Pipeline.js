"use client";

import { useEffect, useRef } from "react";

export default function Pipeline({
    steps = [],
    loading = false,
    error = false,
}) {
    const containerRef = useRef(null);
    const prevLengthRef = useRef(steps.length);

    const completed = steps.filter((s) => s.status === "completed").length;
    const total = steps.length;
    const pct = total ? Math.round((completed / total) * 100) : 0;
    const allDone = total > 0 && steps.every((s) => s.status === "completed");

    // Auto-scroll when a new step is added
    useEffect(() => {
        if (!containerRef.current) return;
        if (steps.length > prevLengthRef.current) {
            const rows = containerRef.current.querySelectorAll("[data-step-row]");
            const last = rows[rows.length - 1];
            last?.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
        prevLengthRef.current = steps.length;
    }, [steps.length]);

    return (
        <section className="font-sans">
            <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] overflow-hidden">

                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]">
                    <div>
                        <p className="text-sm font-medium text-white leading-none">
                            Workflow engine
                        </p>
                        <p className="text-xs text-zinc-500 mt-1">
                            Real-time execution graph
                        </p>
                    </div>

                    {allDone ? (
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                                <path d="M2 5l2.5 2.5L8 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            Done
                        </span>
                    ) : loading ? (
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                            Running
                        </span>
                    ) : null}
                </div>

                {/* Steps */}
                <div
                    ref={containerRef}
                    className="flex flex-col px-4 py-3 max-h-[380px] overflow-y-auto scroll-smooth
                        [scrollbar-width:thin] [scrollbar-color:rgba(255,255,255,0.1)_transparent]"
                >
                    {steps.map((step, index) => {
                        const isCompleted = step.status === "completed";
                        const isRunning   = step.status === "running";
                        const isFailed    = step.status === "failed";
                        const isPending   = !isCompleted && !isRunning && !isFailed;
                        const isLast      = index === steps.length - 1;

                        return (
                            <div
                                key={index}
                                data-step-row
                                className="flex items-stretch
                                    animate-in fade-in slide-in-from-bottom-2 duration-300"
                                style={{ animationDelay: `${index * 40}ms`, animationFillMode: "both" }}
                            >
                                {/* Index column */}
                                <div className="flex flex-col items-center w-9 shrink-0">
                                    <div className={`
                                        w-7 h-7 rounded-full flex items-center justify-center shrink-0
                                        text-[11px] font-medium transition-all duration-300
                                        ${isCompleted ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/25"
                                        : isRunning   ? "bg-blue-500/15 text-blue-400 border border-blue-500/25"
                                        : isFailed    ? "bg-red-500/15 text-red-400 border border-red-500/25"
                                        : "bg-white/5 text-zinc-600 border border-white/8"}
                                    `}>
                                        {isCompleted && (
                                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                                                <path d="M2 5l2.5 2.5L8 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        )}
                                        {isRunning && (
                                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true" className="animate-spin">
                                                <path d="M5 1a4 4 0 1 1-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                                            </svg>
                                        )}
                                        {isFailed && "✕"}
                                        {isPending && <span className="text-[10px]">{index + 1}</span>}
                                    </div>

                                    {!isLast && (
                                        <div className="w-px flex-1 bg-white/[0.06] my-0.5" />
                                    )}
                                </div>

                                {/* Card */}
                                <div className={`
                                    flex-1 ml-3 mb-2.5 rounded-lg border px-3.5 py-2.5
                                    flex items-center justify-between
                                    transition-all duration-300
                                    ${isCompleted ? "border-emerald-500/15 bg-emerald-500/[0.04]"
                                    : isRunning   ? "border-blue-500/15 bg-blue-500/[0.04]"
                                    : isFailed    ? "border-red-500/15 bg-red-500/[0.04]"
                                    : "border-white/[0.06] bg-white/[0.01]"}
                                `}>
                                    <div>
                                        <p className="text-[13px] font-medium text-white leading-none">
                                            {step.name}
                                        </p>
                                        <p className={`
                                            text-[11px] mt-1
                                            ${isCompleted ? "text-emerald-400"
                                            : isRunning   ? "text-blue-400"
                                            : isFailed    ? "text-red-400"
                                            : "text-zinc-600"}
                                        `}>
                                            {isCompleted && "Completed"}
                                            {isRunning   && "Processing…"}
                                            {isFailed    && "Failed"}
                                            {isPending   && "Waiting"}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        {step.duration && (
                                            <span className="text-[11px] text-zinc-600 tabular-nums">
                                                {step.duration}
                                            </span>
                                        )}
                                        <div className={`
                                            w-6 h-6 rounded-md flex items-center justify-center
                                            ${isCompleted ? "bg-emerald-500/15"
                                            : isRunning   ? "bg-blue-500/15"
                                            : isFailed    ? "bg-red-500/15"
                                            : "bg-white/5"}
                                        `}>
                                            {isCompleted && (
                                                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true" className="text-emerald-400">
                                                    <path d="M2 5l2.5 2.5L8 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                </svg>
                                            )}
                                            {isRunning && (
                                                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true" className="animate-spin text-blue-400">
                                                    <path d="M5 1a4 4 0 1 1-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                                                </svg>
                                            )}
                                            {isFailed && (
                                                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true" className="text-red-400">
                                                    <path d="M3 3l4 4M7 3l-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                                                </svg>
                                            )}
                                            {isPending && (
                                                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true" className="text-zinc-600">
                                                    <circle cx="5" cy="5" r="3.5" stroke="currentColor" strokeWidth="1.2"/>
                                                </svg>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Footer progress */}
                {total > 0 && (
                    <div className="flex items-center justify-between px-4 py-2.5 border-t border-white/[0.06]">
                        <span className="text-[11px] text-zinc-600">
                            {completed} / {total} completed
                        </span>
                        <div className="w-28 h-[3px] rounded-full bg-white/[0.06] overflow-hidden">
                            <div
                                className="h-full rounded-full bg-emerald-500/60 transition-all duration-500"
                                style={{ width: `${pct}%` }}
                            />
                        </div>
                    </div>
                )}

            </div>
        </section>
    );
}