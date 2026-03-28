import mongoose from "mongoose";

const pageSchema = new mongoose.Schema({
    url: String,
    status_code: Number,
    issues: [String],
    metrics: {
        title_length: Number,
        meta_description_length: Number,
        h1_count: Number,
        page_size_kb: Number
    }
});

const auditSchema = new mongoose.Schema({
    audit_id: String,
    url: String,
    summary: {
        missing_titles: Number,
        multiple_h1: Number,
        noindex_pages: Number,
        non_200_pages: Number
    },
    pages: [pageSchema]
});

export default mongoose.model("Audit", auditSchema);