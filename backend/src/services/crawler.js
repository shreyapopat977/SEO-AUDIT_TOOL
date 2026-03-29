import axios from "axios";
import * as cheerio from "cheerio";
import { URL } from "url";

const MAX_PAGES = 20;
const REQUEST_TIMEOUT_MS = 10000;

const axiosInstance = axios.create({
    timeout: REQUEST_TIMEOUT_MS,
    headers: {
        "User-Agent": "Mozilla/5.0 (compatible; SEOAuditBot/1.0)"
    }
});

export const crawlWebsite = async (startUrl) => {
    try {
        const visited = new Set();
        const pages = [];

        const baseDomain = new URL(startUrl).hostname;

        // --- Fetch and audit the homepage itself ---
        let homepageHtml = "";
        let homepageStatus = 200;

        try {
            const homepageRes = await axiosInstance.get(startUrl);
            homepageHtml = homepageRes.data;
            homepageStatus = homepageRes.status;
        } catch (err) {
            homepageStatus = err.response?.status || 500;
        }

        visited.add(startUrl);

        pages.push({
            url: startUrl,
            status_code: homepageStatus,
            html: homepageHtml
        });

        // --- Extract internal navigation links from homepage ---
        const $ = cheerio.load(homepageHtml);

        const rawLinks = [];

        $("nav a, header a, a").each((i, el) => {
            const href = $(el).attr("href");
            if (!href) return;

            try {
                const fullUrl = new URL(href, startUrl).href;
                const domain = new URL(fullUrl).hostname;

                if (domain === baseDomain) {
                    rawLinks.push(fullUrl);
                }
            } catch (_) {
                // skip malformed hrefs
            }
        });

        // Deduplicate
        const uniqueLinks = [...new Set(rawLinks)];

        // --- Crawl each unique internal page (up to MAX_PAGES) ---
        for (const link of uniqueLinks) {
            if (pages.length >= MAX_PAGES) break;
            if (visited.has(link)) continue;

            visited.add(link);

            try {
                const response = await axiosInstance.get(link);

                pages.push({
                    url: link,
                    status_code: response.status,
                    html: response.data
                });
            } catch (error) {
                pages.push({
                    url: link,
                    status_code: error.response?.status || 500,
                    html: ""
                });
            }
        }

        return pages;

    } catch (error) {
        console.error("Crawler error:", error.message);
        return [];
    }
};