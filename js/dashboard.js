/**
 * dashboard.js — GET /api/dashboard, POST /api/builds/trigger
 * Backend: DashboardController / DashboardResponse
 *   { totalBuilds, successfulBuilds, failedBuilds, latestDeploymentStatus }
 */

async function loadDashboard() {
    const errorBox = document.getElementById("dashboardError");
    hideAlert(errorBox);

    try {
        const data = await apiRequest("/api/dashboard");

        document.getElementById("totalBuilds").textContent = data.totalBuilds;
        document.getElementById("successfulBuilds").textContent = data.successfulBuilds;
        document.getElementById("failedBuilds").textContent = data.failedBuilds;

        const latest = document.getElementById("latestDeployment");
        latest.textContent = data.latestDeploymentStatus;
    } catch (error) {
        showAlert(errorBox, error.message);
    }
}

async function triggerBuildFromDashboard() {
    const button = document.getElementById("triggerBuildBtn");
    const errorBox = document.getElementById("dashboardError");
    hideAlert(errorBox);
    setButtonLoading(button, true, "Triggering...");

    try {
        await apiRequest("/api/builds/trigger", { method: "POST" });
        await loadDashboard();
    } catch (error) {
        showAlert(errorBox, error.message);
    } finally {
        setButtonLoading(button, false);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    requireAuth();
    initShell();
    loadDashboard();
    document.getElementById("triggerBuildBtn").addEventListener("click", triggerBuildFromDashboard);
});
