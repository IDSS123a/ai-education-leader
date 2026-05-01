/**
 * Lightweight client-side analytics helper.
 *
 * Events are emitted via:
 *  1. `console.info("[analytics]", ...)` — captured by Lovable's project
 *     analytics dashboard (built on console + network logs).
 *  2. A custom `window` event "lovable:analytics" so any listener
 *     (e.g. future Plausible / GA / Umami integration) can subscribe
 *     without changing call-sites.
 *
 * Zero external dependencies, zero cost, zero PII by default.
 */

export type AnalyticsEvent =
  // CTA / navigation
  | "cta_book_consultation_click"
  | "cta_view_experience_click"
  | "cta_download_cv_click"
  // Dialog lifecycle
  | "dialog_cv_request_open"
  | "dialog_cv_request_submit_success"
  | "dialog_cv_request_submit_error"
  | "dialog_cv_request_rate_limited"
  | "dialog_consultation_open"
  | "dialog_consultation_submit_success"
  | "dialog_consultation_submit_error"
  | "dialog_consultation_rate_limited"
  // Contact form
  | "contact_form_submit_success"
  | "contact_form_submit_error"
  // CV file download (after approval)
  | "cv_file_download"
  // Status check
  | "cv_status_check_success"
  | "cv_status_check_not_found"
  | "cv_status_check_error";

export interface AnalyticsPayload {
  [key: string]: string | number | boolean | null | undefined;
}

/**
 * Emit an analytics event. Safe to call from any component.
 * Never throws — analytics must never break user flow.
 */
export function track(event: AnalyticsEvent, payload: AnalyticsPayload = {}): void {
  try {
    const enriched = {
      event,
      timestamp: new Date().toISOString(),
      path: typeof window !== "undefined" ? window.location.pathname : "",
      ...payload,
    };

    // Primary sink: console.info → visible in Lovable analytics + dev console
    // eslint-disable-next-line no-console
    console.info("[analytics]", event, enriched);

    // Secondary sink: custom DOM event for future integrations
    if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("lovable:analytics", { detail: enriched })
      );
    }
  } catch {
    // Swallow — analytics must never break UX
  }
}
