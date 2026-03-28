import Audit from "../models/auditModel.js";
import { v4 as uuidv4 } from "uuid";
import { crawlWebsite } from "../services/crawler.js";
import { analyzeSEO } from "../services/seoAnalyzer.js";

export const startAudit = async (req, res) => {
    try {

        const { url } = req.body;
        const audit_id = uuidv4();

        const crawledPages = await crawlWebsite(url);

        const pages = [];

        for (const page of crawledPages) {

            const seo = analyzeSEO(
                page.html,
                page.url,
                page.status_code
            );

            pages.push({
                url: page.url,
                status_code: page.status_code,
                issues: seo.issues,
                metrics: seo.metrics
            });

        }

        // summary calculation
        const summary = {
            missing_titles: 0,
            multiple_h1: 0,
            noindex_pages: 0,
            non_200_pages: 0
        };

        pages.forEach((page) => {

            if (page.issues.includes("TITLE_MISSING"))
                summary.missing_titles++;

            if (page.issues.includes("MULTIPLE_H1"))
                summary.multiple_h1++;

            if (page.issues.includes("NOINDEX_PAGE"))
                summary.noindex_pages++;

            if (page.issues.includes("NON_200_STATUS"))
                summary.non_200_pages++;

        });

        const newAudit = new Audit({
            audit_id,
            url,
            summary,
            pages
        });

        await newAudit.save();

        res.json({
            audit_id
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

export const getAudit = async (req, res) => {
    try {
        const { id } = req.params;

        const audit = await Audit.findOne({
            audit_id: id
        });

        res.json(audit);

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};