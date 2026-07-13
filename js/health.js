/**
 * health.js — GET /api/health
 * Backend: HealthController returns a RAW map, not wrapped in ApiResponse:
 *   { status: "UP", application: "SpendWise Backend", message: "..." }
 * This is the one endpoint apiRequest() returns as-is (no `.data` to unwrap).
 */

async function loadHealth() {
    const badge = document.getElementById("backendStatus");
    const messageEl = document.getElementById("backendMessage");
    const errorBox = document.getElementById("healthError");
    hideAlert(errorBox);

    try {
        const data = await apiRequest("/api/health");
        const isUp = data.status === "UP";

        badge.textContent = isUp ? "RUNNING" : data.status;
        badge.className = "badge " + (isUp ? "success" : "danger");
        messageEl.textContent = data.message || "";
    } catch (error) {
        badge.textContent = "UNREACHABLE";
        badge.className = "badge danger";
        showAlert(errorBox, error.message);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    requireAuth();
    initShell();
    loadHealth();
});
