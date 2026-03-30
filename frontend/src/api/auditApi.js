// Docker mein: nginx /audit ko backend:5000 pe forward karega
// Local dev mein: VITE_API_URL=http://localhost:5000 set karo .env mein
const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:5000";

export const startAudit = async (url) => {
    const res = await fetch(`${BASE_URL}/audit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed to start audit.");
    return data;
};

export const getAudit = async (auditId) => {
    const res = await fetch(`${BASE_URL}/audit/${auditId}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed to fetch audit.");
    return data;
};