export default function AuditOverview({ audit, onViewPages, onNewAudit }) {
    const { url, summary, pages } = audit;

    const totalIssues = pages.reduce((sum, p) => sum + p.issues.length, 0);

    const cards = [
        { label: "Total Pages", value: summary.total_pages, icon: "🔍", note: "Pages crawled", good: true },
        { label: "Missing Titles", value: summary.missing_titles, icon: "📄", note: "Pages with no <title>", good: summary.missing_titles === 0 },
        { label: "Multiple H1s", value: summary.multiple_h1, icon: "🔤", note: "More than one H1 tag", good: summary.multiple_h1 === 0 },
        { label: "Noindex Pages", value: summary.noindex_pages, icon: "🚫", note: "Hidden from search engines", good: summary.noindex_pages === 0 },
        { label: "Non-200 Pages", value: summary.non_200_pages, icon: "⚠️", note: "Broken or redirect pages", good: summary.non_200_pages === 0 },
    ];

    return (
        <div className="min-h-screen flex flex-col bg-slate-100">

            {/* Navbar */}
            <nav className="bg-slate-900 px-10 py-5">
                <span className="font-syne text-xl  text-white ">
                    SEO<span className="text-sky-400">Audit</span>
                </span>
            </nav>

            <div className="max-w-4xl mx-auto w-full px-6 py-12 fade-up">

                {/* Header */}
                <button onClick={onNewAudit} className="flex items-center gap-2 text-slate-400 hover:text-slate-700 text-sm font-medium mb-6 transition">
                    ← New Audit
                </button>

                <h1 className="font-syne text-3xl  text-slate-900  mb-2">
                    Audit Overview
                </h1>

                <div className="flex flex-wrap items-center gap-3 mb-10">
                    <span className="font-mono text-sm text-slate-500 bg-slate-200 px-3 py-1 rounded-md border border-slate-300">
                        {url}
                    </span>
                    <span className="text-slate-400 text-sm">
                        {totalIssues} issue{totalIssues !== 1 ? "s" : ""} across {summary.total_pages} page{summary.total_pages !== 1 ? "s" : ""}
                    </span>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
                    {cards.map((card) => (
                        <div key={card.label} className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
                            <div className="text-2xl mb-3">{card.icon}</div>
                            <div className={`text-4xl  font-syne leading-none mb-1 ${card.good ? "text-emerald-500" : "text-red-500"}`}>
                                {card.value}
                            </div>
                            <div className="text-sm font-semibold text-slate-700 mt-1">{card.label}</div>
                            <div className="text-xs text-slate-400 mt-0.5">{card.note}</div>
                        </div>
                    ))}
                </div>

                {/* Issue Breakdown */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 mb-6">
                    <h2 className="text-base font-bold text-slate-800 mb-5">Issues by Type</h2>
                    <IssueBreakdown pages={pages} />
                </div>

                {/* CTA */}
                <div className="flex justify-end">
                    <button
                        onClick={onViewPages}
                        className="bg-slate-900 hover:bg-slate-700 text-white font-semibold rounded-lg px-8 py-3.5 text-sm transition"
                    >
                        View Page-Level Details →
                    </button>
                </div>
            </div>
        </div>
    );
}

/* ── Issue breakdown bar chart ── */
function IssueBreakdown({ pages }) {
    const LABELS = {
        TITLE_MISSING: "Title Tag Missing",
        TITLE_TOO_SHORT: "Title Too Short",
        TITLE_TOO_LONG: "Title Too Long",
        META_DESCRIPTION_MISSING: "Meta Description Missing",
        META_DESCRIPTION_TOO_SHORT: "Meta Description Too Short",
        META_DESCRIPTION_TOO_LONG: "Meta Description Too Long",
        H1_MISSING: "H1 Tag Missing",
        MULTIPLE_H1: "Multiple H1 Tags",
        CANONICAL_MISSING: "Canonical Tag Missing",
        NOINDEX_PAGE: "Page is Noindexed",
        NON_200_STATUS: "Non-200 HTTP Status",
        PAGE_TOO_LARGE: "Page Size > 2MB",
        LOW_INTERNAL_LINKS: "Low Internal Links",
    };

    const SEV = {
        TITLE_MISSING: "high", H1_MISSING: "high", NON_200_STATUS: "high",
        META_DESCRIPTION_MISSING: "high", NOINDEX_PAGE: "high",
        TITLE_TOO_SHORT: "medium", TITLE_TOO_LONG: "medium",
        META_DESCRIPTION_TOO_SHORT: "medium", META_DESCRIPTION_TOO_LONG: "medium",
        MULTIPLE_H1: "medium", CANONICAL_MISSING: "medium", PAGE_TOO_LARGE: "medium",
        LOW_INTERNAL_LINKS: "low",
    };

    const BAR_COLOR = { high: "bg-red-400", medium: "bg-orange-400", low: "bg-yellow-400" };
    const NUM_COLOR = { high: "text-red-500", medium: "text-orange-500", low: "text-yellow-600" };

    const counts = {};
    pages.forEach(p => p.issues.forEach(i => { counts[i] = (counts[i] || 0) + 1; }));

    const entries = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    if (entries.length === 0) {
        return <p className="text-emerald-500 font-semibold">🎉 No issues found!</p>;
    }

    const max = Math.max(...entries.map(([, c]) => c));

    return (
        <div className="flex flex-col gap-3">
            {entries.map(([code, count]) => {
                const sev = SEV[code] || "low";
                const barW = Math.round((count / max) * 100);
                return (
                    <div key={code} className="flex items-center gap-3">
                        <span className="w-52 text-sm text-slate-600 font-medium shrink-0">
                            {LABELS[code] || code}
                        </span>
                        <div className="flex-1 bg-slate-100 rounded-full h-2 overflow-hidden">
                            <div
                                className={`${BAR_COLOR[sev]} h-2 rounded-full transition-all duration-500`}
                                style={{ width: `${barW}%` }}
                            />
                        </div>
                        <span className={`text-sm font-bold w-6 text-right shrink-0 ${NUM_COLOR[sev]}`}>
                            {count}
                        </span>
                    </div>
                );
            })}
        </div>
    );
}