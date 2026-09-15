"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import posthog from "posthog-js";

export default function PostHogAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    const host = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";

    // Do not initialize PostHog on admin routes or if key is missing/dummy
    if (!key || key.includes("dummy") || pathname.startsWith("/admin")) {
      return;
    }

    if (typeof window !== "undefined" && !posthog.__loaded) {
      posthog.init(key, {
        api_host: host,
        capture_pageview: false, // Track manually below
        mask_all_text: false,
        mask_all_element_attributes: false,
        autocapture: {
          dom_event_allowlist: ["click", "submit"],
          css_selector_allowlist: ["button", "a", "[data-ph-capture]"],
        },
        session_recording: {
          maskAllInputs: true,
          maskTextSelector: "input, textarea, .ph-no-capture",
        },
      });
    }
  }, [pathname]);

  useEffect(() => {
    if (posthog.__loaded && !pathname.startsWith("/admin")) {
      posthog.capture("$pageview", {
        $current_url: window.location.href,
        path: pathname,
      });
    }
  }, [pathname]);

  return null;
}
