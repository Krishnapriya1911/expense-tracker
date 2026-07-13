/**
 * auth.js
 *
 * Handles the login page itself, plus session storage and shared request
 * helpers used by every other page (dashboard.js, build.js, deployment.js,
 * health.js all load this file first).
 *
 * IMPORTANT — read this before assuming this is "real" security:
 * The backend (AuthController) does NOT issue any token. /api/auth/login
 * only returns { username, role } on success. There is no Spring Security,
 * no filter, no JWT anywhere in the backend, and every API endpoint
 * (/api/builds, /api/deployments, /api/dashboard, including the trigger
 * POSTs) is reachable with or without logging in first.
 *
 * Per instructions, the backend is NOT being modified to add real auth.
 * So what follows is a client-side "session flag" purely for UX/navigation
 * (redirecting to login.html if you haven't logged in, showing who's
 * logged in, letting you log out). It does NOT protect the API. Anyone
 * who calls the API endpoints directly, logged in or not, gets the same
 * access. If real protection is ever needed, the backend has to issue and
 * verify a token — that's a backend change, not something JS alone can do.
 */

const SESSION_KEY = "spendwise_session";

function setSession(username, role) {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify({ username, role }));
}

function getSession() {
    const raw = sessionStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
}

function clearSession() {
    sessionStorage.removeItem(SESSION_KEY);
}

// Call at the top of every protected page.
function requireAuth() {
    if (!getSession()) {
        window.location.href = "login.html";
    }
}

function logout() {
    clearSession();
    window.location.href = "login.html";
}

// Renders the "logged in as ..." badge + wires the logout button.
// Every protected page has a <span id="userBadge"> and a
// <button id="logoutBtn"> in its sidebar.
function initShell() {
    const session = getSession();
    const badge = document.getElementById("userBadge");
    if (badge && session) {
        badge.textContent = `${session.username} (${session.role})`;
    }
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", logout);
    }
}

// ---------- Shared request helper ----------
//
// The backend uses three different response shapes depending on what
// happens, and every page needs to handle all three the same way:
//   1. Success:            ApiResponse { success: true,  data: {...} }
//   2. Handled failure:     ApiResponse { success: false, message: "..." }
//      (e.g. bad login credentials)
//   3. Unhandled exception: GlobalExceptionHandler's shape, NOT wrapped in
//      ApiResponse: { timestamp, status, error, message } or, for
//      validation errors, { timestamp, status, error, errors: {field: msg} }
//      (e.g. POST /api/deployments/trigger with no builds yet -> 400)
//
// apiRequest() normalizes all three into either a resolved `data` payload
// or a thrown Error with a human-readable message, so page-level code
// never has to think about which shape it got back.
async function apiRequest(url, options = {}) {
    let response;
    try {
        response = await fetch(url, {
            ...options,
            headers: { "Content-Type": "application/json", ...(options.headers || {}) },
        });
    } catch (networkError) {
        throw new Error("Could not reach the backend. Is it running?");
    }

    let body = null;
    try {
        body = await response.json();
    } catch (parseError) {
        // No JSON body at all (rare, but don't crash the page over it).
    }

    if (!response.ok) {
        if (body && body.errors) {
            // Validation error shape: { errors: { field: message } }
            const first = Object.values(body.errors)[0];
            throw new Error(first || "Invalid request.");
        }
        if (body && body.message) {
            throw new Error(body.message);
        }
        throw new Error(`Request failed (HTTP ${response.status}).`);
    }

    // ApiResponse-wrapped success/failure.
    if (body && Object.prototype.hasOwnProperty.call(body, "success")) {
        if (!body.success) {
            throw new Error(body.message || "Request was not successful.");
        }
        return body.data;
    }

    // Unwrapped payload (only /api/health today).
    return body;
}

// ---------- Small UI helpers shared by every page ----------

function showAlert(el, message) {
    if (!el) return;
    el.textContent = message;
    el.classList.add("show");
}

function hideAlert(el) {
    if (!el) return;
    el.textContent = "";
    el.classList.remove("show");
}

function setButtonLoading(button, isLoading, loadingLabel = "Working...") {
    if (!button) return;
    if (isLoading) {
        button.dataset.originalText = button.innerHTML;
        button.disabled = true;
        button.innerHTML = `<span class="spinner"></span> ${loadingLabel}`;
    } else {
        button.disabled = false;
        button.innerHTML = button.dataset.originalText || button.innerHTML;
    }
}

// ---------- Login page ----------

async function loginUser(event) {
    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
    const errorBox = document.getElementById("loginError");
    const submitBtn = document.getElementById("loginBtn");

    hideAlert(errorBox);
    setButtonLoading(submitBtn, true, "Signing in...");

    try {
        const data = await apiRequest("/api/auth/login", {
            method: "POST",
            body: JSON.stringify({ username, password }),
        });

        setSession(data.username, data.role);
        window.location.href = "dashboard.html";
    } catch (error) {
        showAlert(errorBox, error.message);
    } finally {
        setButtonLoading(submitBtn, false);
    }
}
