import { useState } from "react";
import { ISSUE_META, getWorstSeverity } from "../utils/issuesMeta";

export default function PageBreakdown({ audit, onBack }) {
    const { pages } = audit;
    const [expanded, setExpanded] = useState(null);
    const toggle = (i) => setExpanded(expanded === i ? null : i);

    return (
        <div className="min-h-screen flex flex-col bg-slate-100">

            {/* Navbar */}
            <nav className="bg-slate-900 px-10 py-5">
                <span className="font-syne text-xl font-extrabold text-white tracking-tight">
                    SEO<span className="text-sky-400">Audit</span>
                </span>
            </nav>

            <div className="max-w-4xl mx-auto w-full px-6 py-12 fade-up">

                {/* Header */}
                <button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-slate-700 text-sm font-medium mb-6 transition">
                    ← Back to Overview
                </button>

                <h1 className="font-syne text-3xl font-extrabold text-slate-900 tracking-tight mb-1">
                    Page-Level Breakdown
                </h1>
                <p className="text-slate-400 text-sm mb-8">
                    {pages.length} pages crawled · Click any row to expand
                </p>

                {/* Table */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">

                    {/* Table Head */}
                    <div className="grid grid-cols-[1fr_90px_100px_80px] px-5 py-3 bg-slate-50 border-b border-slate-200">
                        {["Page URL", "Status", "Issues", "Severity"].map((h) => (
                            <span key={h} className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                                {h}
                            </span>
                        ))}
                    </div>

                    {/* Rows */}
                    {pages.map((page, i) => {
                        const severity = getWorstSeverity(page.issues);
                        const isOpen = expanded === i;

                        return (
                            <div key={page.url} className={`${i < pages.length - 1 ? "border-b border-slate-100" : ""}`}>

                                {/* Row */}
                                <div
                                    onClick={() => toggle(i)}
                                    className={`grid grid-cols-[1fr_90px_100px_80px] px-5 py-4 cursor-pointer items-center transition
                    ${isOpen ? "bg-slate-50" : "hover:bg-slate-50"}`}
                                >
                                    {/* URL */}
                                    <div className="flex items-center gap-2 min-w-0">
                                        <span className="text-slate-300 text-xs shrink-0">{isOpen ? "▾" : "▸"}</span>
                                        <span className="font-mono text-sm text-slate-700 truncate">{shortenUrl(page.url)}</span>
                                    </div>

                                    {/* Status */}
                                    <StatusBadge code={page.status_code} />

                                    {/* Issue count */}
                                    <span className={`text-sm font-semibold ${page.issues.length > 0 ? "text-red-500" : "text-emerald-500"}`}>
                                        {page.issues.length === 0 ? "✓ Clean" : `${page.issues.length} issue${page.issues.length > 1 ? "s" : ""}`}
                                    </span>

                                    {/* Severity */}
                                    <SeverityBadge severity={severity} />
                                </div>

                                {/* Expanded Panel */}
                                {isOpen && (
                                    <div className="px-6 pb-6 pt-2 bg-slate-50 border-t border-slate-100">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">

                                            {/* Issues */}
                                            <div>
                                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Issues Found</p>
                                                {page.issues.length === 0 ? (
                                                    <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-600 text-xs font-bold px-3 py-1.5 rounded-full">
                                                        ✓ All checks passed
                                                    </span>
                                                ) : (
                                                    <div className="flex flex-col gap-2">
                                                        {page.issues.map((code) => {
                                                            const meta = ISSUE_META[code] || { label: code, severity: "low", hint: "" };
                                                            return (
                                                                <div key={code} className="bg-white border border-slate-200 rounded-lg p-3">
                                                                    <div className="flex items-center gap-2 mb-1">
                                                                        <SeverityBadge severity={meta.severity} />
                                                                        <span className="text-sm font-semibold text-slate-800">{meta.label}</span>
                                                                    </div>
                                                                    <p className="text-xs text-slate-500">{meta.hint}</p>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Metrics */}
                                            <div>
                                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Metrics</p>
                                                <div className="flex flex-col gap-2">
                                                    <MetricRow label="Title Length" value={`${page.metrics.title_length} chars`} ok={page.metrics.title_length >= 30 && page.metrics.title_length <= 65} />
                                                    <MetricRow label="Meta Desc Length" value={`${page.metrics.meta_description_length} chars`} ok={page.metrics.meta_description_length >= 70 && page.metrics.meta_description_length <= 160} />
                                                    <MetricRow label="H1 Count" value={page.metrics.h1_count} ok={page.metrics.h1_count === 1} />
                                                    <MetricRow label="Page Size" value={`${page.metrics.page_size_kb} KB`} ok={page.metrics.page_size_kb <= 2048} />
                                                </div>
                                            </div>

                                        </div>

                                        {/* Full URL */}
                                        <div className="mt-4 pt-4 border-t border-slate-200">
                                            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wide">URL: </span>
                                            <a href={page.url} target="_blank" rel="noreferrer"
                                                className="text-xs font-mono text-sky-500 hover:underline break-all">
                                                {page.url}
                                            </a>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

/* ── Helpers ── */

function StatusBadge({ code }) {
    const style =
        code === 200 ? "bg-emerald-50 text-emerald-600" :
            code >= 300 && code < 400 ? "bg-orange-50 text-orange-500" :
                "bg-red-50 text-red-500";
    return (
        <span className={`font-mono text-xs font-bold px-2.5 py-1 rounded-md inline-block ${style}`}>
            {code}
        </span>
    );
}

function SeverityBadge({ severity }) {
    const map = {
        high: "bg-red-50 text-red-500",
        medium: "bg-orange-50 text-orange-500",
        low: "bg-yellow-50 text-yellow-600",
        ok: "bg-emerald-50 text-emerald-600",
    };
    const labels = { high: "High", medium: "Medium", low: "Low", ok: "OK" };
    return (
        <span className={`text-xs font-bold px-2.5 py-1 rounded-full inline-block ${map[severity] || map.ok}`}>
            {labels[severity] || "OK"}
        </span>
    );
}

function MetricRow({ label, value, ok }) {
    return (
        <div className="flex items-center justify-between bg-white border border-slate-200 rounded-lg px-3 py-2.5">
            <span className="text-sm text-slate-500">{label}</span>
            <div className="flex items-center gap-2">
                <span className="font-mono text-sm font-semibold text-slate-800">{value}</span>
                <span className="text-sm">{ok ? "✅" : "⚠️"}</span>
            </div>
        </div>
    );
}

function shortenUrl(url) {
    try {
        const u = new URL(url);
        return u.hostname + (u.pathname === "/" ? "/" : u.pathname);
    } catch { return url; }
}