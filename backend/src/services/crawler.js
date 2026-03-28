import axios from "axios";
import * as cheerio from "cheerio";
import { URL } from "url";

export const crawlWebsite = async (startUrl) => {
    try {
        const visited = new Set();
        const pages = [];

        const baseDomain = new URL(startUrl).hostname;

        // fetch homepage
        const { data } = await axios.get(startUrl);

        const $ = cheerio.load(data);

        // get navigation links
        const links = [];

        $("nav a, header a, a").each((i, el) => {
            const href = $(el).attr("href");

            if (!href) return;

            try {
                const fullUrl = new URL(href, startUrl).href;
                const domain = new URL(fullUrl).hostname;

                if (domain === baseDomain) {
                    links.push(fullUrl);
                }

            } catch (err) { }
        });

        // remove duplicates
        const uniqueLinks = [...new Set(links)];

        // crawl each page
        for (const link of uniqueLinks) {

            if (visited.has(link)) continue;

            visited.add(link);

            try {
                const response = await axios.get(link);

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
        console.error(error);
        return [];
    }
};