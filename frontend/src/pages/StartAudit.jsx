import { useState } from "react";
import { startAudit, getAudit } from "../api/auditApi";

export default function StartAudit({ onAuditComplete }) {
    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const isValidUrl = (val) => {
        try {
            const u = new URL(val);
            return u.protocol === "http:" || u.protocol === "https:";
        } catch { return false; }
    };

    const handleSubmit = async () => {
        setError("");
        if (!url.trim()) return setError("Please enter a URL.");
        if (!isValidUrl(url.trim())) return setError("Enter a valid URL including https://");

        setLoading(true);
        try {
            const { audit_id } = await startAudit(url.trim());
            const auditData = await getAudit(audit_id);
            onAuditComplete(auditData);
        } catch (err) {
            setError(err.message || "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !loading) handleSubmit();
    };

    const checks = [
        "✓ Title & Meta checks",
        "✓ H1 validation",
        "✓ Canonical tags",
        "✓ Noindex detection",
        "✓ Page size",
        "✓ HTTP status",
    ];

    return (
        <div className="min-h-screen flex flex-col bg-slate-100">

            {/* Navbar */}
            <nav className="bg-slate-900 px-10 py-5">
                <span className="font-syne text-xl  text-white ">
                    SEO<span className="text-sky-400">Audit</span>
                </span>
            </nav>

            {/* Hero */}
            <div className="flex-1 flex flex-col items-center justify-center px-6 py-20 fade-up">

                {/* Pill */}
                <div className="mb-5 inline-flex items-center gap-2 bg-sky-100 text-sky-700 rounded-full px-4 py-1.5 text-sm font-semibold">
                    ⚡ Navigation-based crawling
                </div>

                {/* Heading */}
                <h1 className="font-syne text-5xl  text-slate-900 text-center leading-tight  mb-4">
                    Technical SEO Audit
                </h1>

                <p className="text-slate-500 text-lg text-center max-w-md leading-relaxed mb-12">
                    Enter your website URL. We'll crawl your navigation pages and surface every SEO issue clearly.
                </p>

                {/* Card */}
                <div className="w-full max-w-lg bg-white rounded-xl shadow-md border border-slate-200 p-8">

                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                        Website URL
                    </label>

                    <input
                        type="url"
                        placeholder="https://example.com"
                        value={url}
                        onChange={(e) => { setUrl(e.target.value); setError(""); }}
                        onKeyDown={handleKeyDown}
                        disabled={loading}
                        className={`w-full px-4 py-3.5 rounded-lg border-2 text-slate-900 font-mono text-sm outline-none transition mb-4 disabled:opacity-50
              ${error ? "border-red-300 bg-red-50" : "border-slate-200 bg-white focus:border-sky-400"}`}
                    />

                    {/* Error */}
                    {error && (
                        <div className="bg-red-50 text-red-700 border border-red-200 rounded-lg px-4 py-3 text-sm mb-4">
                            ⚠ {error}
                        </div>
                    )}

                    {/* Button */}
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg py-4 text-base transition"
                    >
                        {loading ? (
                            <><span className="spinner" /> Crawling pages...</>
                        ) : (
                            "Run SEO Audit →"
                        )}
                    </button>

                    {loading && (
                        <p className="text-center text-slate-400 text-xs mt-3">
                            This may take 20–60 seconds depending on the site size.
                        </p>
                    )}
                </div>

                {/* Check pills */}
                <div className="flex flex-wrap justify-center gap-2 mt-10">
                    {checks.map((c) => (
                        <span key={c} className="bg-white border border-slate-200 rounded-full px-4 py-1.5 text-sm text-slate-500 font-medium shadow-sm">
                            {c}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}