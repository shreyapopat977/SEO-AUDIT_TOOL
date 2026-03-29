import Audit from "../models/auditModel.js";
import { v4 as uuidv4 } from "uuid";
import { crawlWebsite } from "../services/crawler.js";
import { analyzeSEO } from "../services/seoAnalyzer.js";

export const startAudit = async (req, res) => {
    try {
        const { url } = req.body;

        // --- Input validation ---
        if (!url || typeof url !== "string" || url.trim() === "") {
            return res.status(400).json({ error: "URL is required." });
        }

        let parsedUrl;
        try {
            parsedUrl = new URL(url.trim());
        } catch (_) {
            return res.status(400).json({ error: "Invalid URL format. Include the protocol (e.g. https://example.com)." });
        }

        if (!["http:", "https:"].includes(parsedUrl.protocol)) {
            return res.status(400).json({ error: "URL must use http or https protocol." });
        }

        const normalizedUrl = parsedUrl.href;
        const audit_id = uuidv4();

        const crawledPages = await crawlWebsite(normalizedUrl);

        if (crawledPages.length === 0) {
            return res.status(422).json({ error: "Could not crawl the provided URL. Please check that the site is accessible." });
        }

        // --- Run SEO analysis on each crawled page ---
        const pages = crawledPages.map((page) => {
            const seo = analyzeSEO(page.html, page.url, page.status_code);
            return {
                url: page.url,
                status_code: page.status_code,
                issues: seo.issues,
                metrics: seo.metrics
            };
        });

        // --- Build summary ---
        const summary = {
            total_pages: pages.length,
            missing_titles: 0,
            multiple_h1: 0,
            noindex_pages: 0,
            non_200_pages: 0
        };

        pages.forEach((page) => {
            if (page.issues.includes("TITLE_MISSING"))   summary.missing_titles++;
            if (page.issues.includes("MULTIPLE_H1"))     summary.multiple_h1++;
            if (page.issues.includes("NOINDEX_PAGE"))    summary.noindex_pages++;
            if (page.issues.includes("NON_200_STATUS"))  summary.non_200_pages++;
        });

        const newAudit = new Audit({
            audit_id,
            url: normalizedUrl,
            summary,
            pages
        });

        await newAudit.save();

        res.status(201).json({ audit_id });

    } catch (error) {
        console.error("startAudit error:", error.message);
        res.status(500).json({ error: "Internal server error." });
    }
};

export const getAudit = async (req, res) => {
    try {
        const { id } = req.params;

        const audit = await Audit.findOne({ audit_id: id }).lean();

        if (!audit) {
            return res.status(404).json({ error: `Audit with id '${id}' not found.` });
        }

        res.json(audit);

    } catch (error) {
        console.error("getAudit error:", error.message);
        res.status(500).json({ error: "Internal server error." });
    }
};