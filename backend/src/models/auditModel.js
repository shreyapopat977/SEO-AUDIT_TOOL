import mongoose from "mongoose";

const pageSchema = new mongoose.Schema({
    url: { type: String, required: true },
    status_code: { type: Number, required: true },
    issues: [String],
    metrics: {
        title_length: Number,
        meta_description_length: Number,
        h1_count: Number,
        page_size_kb: Number
    }
});

const auditSchema = new mongoose.Schema(
    {
        audit_id: { type: String, required: true, unique: true, index: true },
        url: { type: String, required: true },
        summary: {
            total_pages: Number,
            missing_titles: Number,
            multiple_h1: Number,
            noindex_pages: Number,
            non_200_pages: Number
        },
        pages: [pageSchema]
    },
    { timestamps: true }
);

export default mongoose.model("Audit", auditSchema);