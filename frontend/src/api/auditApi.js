// All backend communication lives here.
// Change BASE_URL if your backend runs on a different port.

const BASE_URL = "http://localhost:5000";

/**
 * POST /audit
 * Starts a new audit for the given URL.
 * Returns { audit_id }
 */
export const startAudit = async (url) => {
    const res = await fetch(`${BASE_URL}/audit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url })
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.error || "Failed to start audit.");
    }

    return data; // { audit_id }
};

/**
 * GET /audit/:id
 * Fetches the full audit result by audit_id.
 * Returns the full audit object.
 */
export const getAudit = async (auditId) => {
    const res = await fetch(`${BASE_URL}/audit/${auditId}`);

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.error || "Failed to fetch audit.");
    }

    return data;
};