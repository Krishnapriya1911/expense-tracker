/**
 * build.js — GET /api/builds, POST /api/builds/trigger
 * Backend: BuildController
 *   GET  -> ApiResponse<List<BuildResponse>>  { buildNumber, status, duration, triggeredBy }
 *   POST -> ApiResponse<Build> (full entity; we only read the fields we need)
 */

function buildStatusBadge(status) {
    const cls = status === "SUCCESS" ? "success" : status === "FAILED" ? "danger" : "neutral";
    return `<span class="badge ${cls}">${status}</span>`;
}

async function loadBuilds() {
    const tableBody = document.getElementById("buildTable");
    const errorBox = document.getElementById("buildError");
    hideAlert(errorBox);
    tableBody.innerHTML = `<tr class="loading-row"><td colspan="4"><span class="spinner dark"></span> Loading builds...</td></tr>`;

    try {
        const builds = await apiRequest("/api/builds");

        if (!builds.length) {
            tableBody.innerHTML = `<tr class="loading-row"><td colspan="4">No builds yet. Trigger one below.</td></tr>`;
            return;
        }

        tableBody.innerHTML = builds
            .map(
                (b) => `
                <tr>
                    <td>${b.buildNumber}</td>
                    <td>${buildStatusBadge(b.status)}</td>
                    <td>${b.triggeredBy}</td>
                    <td>${b.duration}</td>
                </tr>`
            )
            .join("");
    } catch (error) {
        tableBody.innerHTML = "";
        showAlert(errorBox, error.message);
    }
}

async function triggerBuild() {
    const button = document.getElementById("triggerBuildBtn");
    const errorBox = document.getElementById("buildError");
    hideAlert(errorBox);
    setButtonLoading(button, true, "Triggering...");

    try {
        await apiRequest("/api/builds/trigger", { method: "POST" });
        await loadBuilds();
    } catch (error) {
        showAlert(errorBox, error.message);
    } finally {
        setButtonLoading(button, false);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    requireAuth();
    initShell();
    loadBuilds();
    document.getElementById("triggerBuildBtn").addEventListener("click", triggerBuild);
});
