// Maps every backend issue code → human-readable label + severity + fix hint.
// Severity: "high" | "medium" | "low"

export const ISSUE_META = {
    TITLE_MISSING: {
        label: "Title Tag Missing",
        severity: "high",
        hint: "Add a <title> tag between 30–65 characters."
    },
    TITLE_TOO_SHORT: {
        label: "Title Too Short",
        severity: "medium",
        hint: "Title is under 30 characters. Expand it for better relevance."
    },
    TITLE_TOO_LONG: {
        label: "Title Too Long",
        severity: "medium",
        hint: "Title exceeds 65 characters. Search engines may truncate it."
    },
    META_DESCRIPTION_MISSING: {
        label: "Meta Description Missing",
        severity: "high",
        hint: "Add a <meta name='description'> tag between 70–160 characters."
    },
    META_DESCRIPTION_TOO_SHORT: {
        label: "Meta Description Too Short",
        severity: "medium",
        hint: "Meta description is under 70 characters. Add more detail."
    },
    META_DESCRIPTION_TOO_LONG: {
        label: "Meta Description Too Long",
        severity: "medium",
        hint: "Meta description exceeds 160 characters. Trim it down."
    },
    H1_MISSING: {
        label: "H1 Tag Missing",
        severity: "high",
        hint: "Add exactly one <h1> tag describing the page content."
    },
    MULTIPLE_H1: {
        label: "Multiple H1 Tags",
        severity: "medium",
        hint: "Only one <h1> per page. Remove or convert the extras."
    },
    CANONICAL_MISSING: {
        label: "Canonical Tag Missing",
        severity: "medium",
        hint: "Add <link rel='canonical' href='...'> to prevent duplicate content issues."
    },
    NOINDEX_PAGE: {
        label: "Page is Noindexed",
        severity: "high",
        hint: "This page has noindex set. Search engines will not index it."
    },
    NON_200_STATUS: {
        label: "Non-200 HTTP Status",
        severity: "high",
        hint: "Page returned a non-200 status code. Fix redirects or broken links."
    },
    PAGE_TOO_LARGE: {
        label: "Page Size Exceeds 2MB",
        severity: "medium",
        hint: "Large pages load slowly. Compress images and minify assets."
    },
    LOW_INTERNAL_LINKS: {
        label: "Low Internal Links",
        severity: "low",
        hint: "Page has fewer than 3 internal links. Improve internal linking."
    }
};

// Helper: get severity level of a list of issues for color-coding a row
export const getWorstSeverity = (issues) => {
    if (issues.some(i => ISSUE_META[i]?.severity === "high"))   return "high";
    if (issues.some(i => ISSUE_META[i]?.severity === "medium")) return "medium";
    if (issues.some(i => ISSUE_META[i]?.severity === "low"))    return "low";
    return "ok";
};