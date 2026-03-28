import * as cheerio from "cheerio";

export const analyzeSEO = (html, url, status) => {

    const $ = cheerio.load(html);

    const issues = [];

    // Title
    const title = $("title").text().trim();
    const title_length = title.length;

    if (!title) issues.push("TITLE_MISSING");
    if (title_length < 30 || title_length > 65)
        issues.push("TITLE_LENGTH_INVALID");


    // Meta Description
    const meta = $('meta[name="description"]').attr("content") || "";
    const meta_description_length = meta.length;

    if (!meta) issues.push("META_DESCRIPTION_MISSING");
    if (meta_description_length < 70 || meta_description_length > 160)
        issues.push("META_DESCRIPTION_LENGTH_INVALID");


    // H1
    const h1_count = $("h1").length;

    if (h1_count === 0) issues.push("H1_MISSING");
    if (h1_count > 1) issues.push("MULTIPLE_H1");


    // Canonical
    const canonical = $('link[rel="canonical"]').attr("href");
    if (!canonical) issues.push("CANONICAL_MISSING");


    // Noindex
    const robots = $('meta[name="robots"]').attr("content") || "";
    if (robots.includes("noindex"))
        issues.push("NOINDEX_PAGE");


    // HTTP Status
    if (status !== 200)
        issues.push("NON_200_STATUS");


    // Page Size
    const page_size_kb = Buffer.byteLength(html, 'utf8') / 1024;

    if (page_size_kb > 2048)
        issues.push("PAGE_TOO_LARGE");


    // Internal Links
    const internal_links = $("a").length;

    if (internal_links < 3)
        issues.push("LOW_INTERNAL_LINKS");


    return {
        issues,
        metrics: {
            title_length,
            meta_description_length,
            h1_count,
            page_size_kb
        }
    };

};