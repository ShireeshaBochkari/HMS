// BACKEND CONFIGURATION
// The frontend is served by the same Railway service as the API, so it talks to its own origin.
// Optional override: set window.HOSTEL_BACKEND_URL before this script, or edit OVERRIDE below
// (only needed if you host the frontend on a different domain).
(function () {
    var OVERRIDE = "";
    var host = window.location.hostname;
    var isLocalStatic = (host === "localhost" || host === "127.0.0.1" || host === "") &&
                        window.location.port !== "8080" && window.location.port !== "";
    var base = window.HOSTEL_BACKEND_URL || OVERRIDE ||
               (window.location.protocol === "file:" || isLocalStatic
                   ? "http://localhost:8080"
                   : window.location.origin);
    base = base.replace(/\/+$/, "");

    window.HOSTEL_CONFIG = {
        BACKEND_URL: base,
        get AUTH_API() { return this.BACKEND_URL + "/api/auth"; },
        get ROOMS_API() { return this.BACKEND_URL + "/api/rooms"; },
        get HOSTELLERS_API() { return this.BACKEND_URL + "/api/hostellers"; },
        get MESSAGES_API() { return this.BACKEND_URL + "/api/messages"; },
        get NOTICES_API() { return this.BACKEND_URL + "/api/notices"; },
        get COMPLAINTS_API() { return this.BACKEND_URL + "/api/complaints"; },
        get PAYMENTS_API() { return this.BACKEND_URL + "/api/payments"; },
        get VISITORS_API() { return this.BACKEND_URL + "/api/visitors"; }
    };
})();
