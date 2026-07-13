/**
 * deployment.js — GET /api/deployments/latest, POST /api/deployments/trigger
 * Backend: DeploymentController
 *   GET  -> ApiResponse<DeploymentResponse> { version, environment, status, deployedAt }
 *           (placeholder "N/A" / "NO DEPLOYMENTS" values if none exist yet)
 *   POST -> ApiResponse<Deployment> (full entity), OR throws when there is no
 *           build yet ("No build available for deployment.") which arrives
 *           as a plain 400 from GlobalExceptionHandler, not an ApiResponse --
 *           apiRequest() in auth.js already normalizes that into a thrown
 *           Error, so it's handled the same way as any other failure here.
 */

function deployStatusBadge(status) {
    const cls = status === "SUCCESS" ? "success" : status === "NO DEPLOYMENTS" ? "neutral" : "danger";
    return `<span class="badge ${cls}">${status}</span>`;
}

async function loadDeployment() {
    const errorBox = document.getElementById("deployError");
    hideAlert(errorBox);

    try {
        const data = await apiRequest("/api/deployments/latest");

        document.getElementById("deployStatus").innerHTML = deployStatusBadge(data.status);
        document.getElementById("deployEnvironment").textContent = data.environment;
        document.getElementById("deployVersion").textContent = data.version;
        document.getElementById("deployUpdated").textContent = data.deployedAt;
    } catch (error) {
        showAlert(errorBox, error.message);
    }
}

async function triggerDeployment() {
    const button = document.getElementById("triggerDeployBtn");
    const errorBox = document.getElementById("deployError");
    hideAlert(errorBox);
    setButtonLoading(button, true, "Deploying...");

    try {
        await apiRequest("/api/deployments/trigger", { method: "POST" });
        await loadDeployment();
    } catch (error) {
        // e.g. "No build available for deployment." if nothing was built yet.
        showAlert(errorBox, error.message);
    } finally {
        setButtonLoading(button, false);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    requireAuth();
    initShell();
    loadDeployment();
    document.getElementById("triggerDeployBtn").addEventListener("click", triggerDeployment);
});
