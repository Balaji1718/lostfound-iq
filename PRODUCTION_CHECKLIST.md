# FindBack Production Deployment Checklist

This checklist tracks the deployment-readiness audit across Firebase configurations, error states, SEO compliance, accessibility rules, web performance, mobile responsiveness, and release download workflows.

---

## 1. Firebase Integration Verification
*   [x] **Collections Defined:** Validated Firestore collection paths:
    *   `institutions` (read-only for listing verified colleges/universities).
    *   `app_config/mobile_app` (read-only for release notes and APK download link).
    *   `waitlist` (write-only for waitlist registrations).
    *   `contact_requests` (write-only for user feedback and message forms).
*   [x] **Client SDK Initialization:** Initializer uses public Firebase config values safely, restricting sensitive access using Firestore rules.

## 2. Firestore Error Handling
*   [x] **Loading States:** Implemented Tailwind/CSS pulse loaders for the institutions grid and the APK download section to handle loading indicators.
*   [x] **Empty States:** The system displays search feedback if search parameters return no institutions.
*   [x] **Network Failures:** Submitting forms (Waitlist/Contact) throws meaningful, catch-handled errors that output clean error toasts to the client. The APK release notes include a manual "Try again" trigger on download configuration fetch failures.

## 3. Production SEO Audit
*   [x] **Descriptive Titles:** Unique, keyword-rich header tags configured in `frontend/src/routes/index.tsx`.
*   [x] **Meta Descriptions:** Search engine description tags configured in routing metadata.
*   [x] **Open Graph & Twitter Cards:** Configured `og:title`, `og:description`, `og:url`, `og:type`, and Twitter card styles.
*   [x] **robots.txt & sitemap.xml:** Integrated robots file and dynamic sitemap routes to help Google indexing crawlers navigate page hierarchies.

## 4. Accessibility (WCAG 2.1 Compliance)
*   [x] **Aria Labels:** Action elements (e.g. Hamburger menu icon, theme toggle, search inputs, modal zoom triggers) include explicit `aria-label` or description tags.
*   [x] **Keyboard Navigation:** Forms, sliders, links, and lightbox close targets support interactive tab-selection and key press triggers.
*   [x] **Alt Text:** Every image asset in the screenshot carousel has descriptive, meaningful alt text for screen-reader users.
*   [x] **Contrast:** Restructured transparent navbar styles in light mode (`text-zinc-200` on dark backgrounds, automatically transitioning to high contrast `text-muted-foreground` when scrolled). Adjusted primary text gradient colors (`oklch(0.45 0.2 280)`) for WCAG AA readability scores on white backgrounds.

## 5. Web Performance
*   [x] **Lazy Loading:** Enabled `loading="lazy"` on all screenshot images in the slider to avoid blocking initial load times.
*   [x] **Optimized Assets:** Resized real mobile mockups to a maximum width of `480px` to keep loading speeds fast on high-density Retina devices.
*   [x] **Bundle Sizes:** Optimized compilation chunks. Final index bundles compile down to ~350 kB.

## 6. Mobile Responsiveness
*   [x] **Viewport Adaptation:** Renders seamlessly across Android, tablets, and wide desktop containers using responsive Tailwind utilities.
*   [x] **Responsive Mobile Carousel:** Displays a single mockup frame on mobile, transitioning to 2 columns on tablets and 3 columns on desktops.
*   [x] **Drawer Drawer Menu:** Mobile users get a slide-out menu panel for links.

## 7. APK Download Workflow
*   [x] **Dynamic Fetch:** Fetches versions and release logs directly from Firestore document path `app_config/mobile_app`.
*   [x] **Fallback Protection:** Defaults version to `1.0.0` and fallback notes on query failures.
*   [x] **Graceful URL Validation:** Disables buttons and emits a clear error toast if the APK download URL is missing or unset.
