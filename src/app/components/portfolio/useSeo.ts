import { useEffect } from "react";
import faviconImg from "../../../imports/favicon.png";

const SITE_URL = "https://mopheshi.github.io";
const SITE_NAME = "Ndachimya Edward";
const DEFAULT_TITLE = "Ndachimya Edward — AI Engineer & Founder";
const DEFAULT_DESCRIPTION =
  "Ndachimya Edward — AI Engineer and Founder building Vancus AI and VaultSplit. M.Sc. AI Engineering at İstanbul Okan University. Open to PhD offers and technical co-founder roles.";

function setMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(
    `meta[${attr}="${key}"]`,
  );
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setLink(rel: string, href: string, type?: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.rel = rel;
    document.head.appendChild(el);
  }
  if (type) el.type = type;
  el.href = href;
}

function setJsonLd(id: string, data: unknown) {
  let el = document.getElementById(id) as HTMLScriptElement | null;
  if (!el) {
    el = document.createElement("script");
    el.id = id;
    el.type = "application/ld+json";
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

function clearJsonLd(id: string) {
  document.getElementById(id)?.remove();
}

const PERSON_LD = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ndachimya Edward",
  alternateName: "Edward Ndachimya Magaji",
  jobTitle: "AI Engineer & Founder",
  description: DEFAULT_DESCRIPTION,
  url: SITE_URL + "/",
  image: SITE_URL + "/og-image.png",
  email: "mailto:ndachimya@gmail.com",
  sameAs: [
    "https://linkedin.com/in/ndachimyaedward",
    "https://github.com/Mopheshi",
    "https://vancus.app",
    "https://vaultsplit.co",
  ],
  worksFor: { "@type": "Organization", name: "Vancus AI" },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "İstanbul Okan University",
  },
};

type SeoConfig = {
  /** Page title. Defaults to the brand title. */
  title?: string;
  /** Meta description. Defaults to the brand description. */
  description?: string;
  /** Route path including leading slash, e.g. "/projects". Defaults to "/". */
  path?: string;
  /** Extra JSON-LD blocks for this route. The id is used to upsert and cleanup. */
  extraJsonLd?: { id: string; data: unknown }[];
};

/**
 * Injects SEO meta, Open Graph, Twitter card, canonical, favicon and JSON-LD
 * for the current route. Pass overrides for per-route titles/descriptions
 * and route-specific structured data.
 *
 * NOTE: social scrapers (LinkedIn, Twitter, WhatsApp, Slack) generally do
 * NOT execute JS. Static fallbacks live in index.html for the home route.
 */
export function useSeo(config: SeoConfig = {}) {
  const title = config.title ?? DEFAULT_TITLE;
  const description = config.description ?? DEFAULT_DESCRIPTION;
  const path = config.path ?? "/";
  const extraIds = (config.extraJsonLd ?? []).map((e) => e.id).join(",");
  const extraData = JSON.stringify(config.extraJsonLd ?? []);

  useEffect(() => {
    const url = SITE_URL + path;
    const image = SITE_URL + "/og-image.png";

    document.title = title;
    document.documentElement.lang = "en-GB";

    setMeta("name", "description", description);
    setMeta(
      "name",
      "keywords",
      "Ndachimya Edward, AI Engineer, AI Founder, Vancus AI, VaultSplit, applied AI, deep learning, PhD candidate, technical co-founder, İstanbul, Nigeria",
    );
    setMeta("name", "author", "Ndachimya Edward");
    setMeta("name", "robots", "index, follow");
    setMeta(
      "name",
      "viewport",
      "width=device-width, initial-scale=1, viewport-fit=cover",
    );
    setMeta("name", "theme-color", "#fdf6b2");
    setMeta("name", "referrer", "strict-origin-when-cross-origin");

    setMeta("property", "og:type", "website");
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", url);
    setMeta("property", "og:image", image);
    setMeta("property", "og:locale", "en_GB");
    setMeta("property", "og:site_name", SITE_NAME);

    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", image);

    setLink("canonical", url);
    setLink("icon", faviconImg, "image/png");
    setLink("apple-touch-icon", faviconImg);

    setJsonLd("ld-person", PERSON_LD);

    const extras = config.extraJsonLd ?? [];
    for (const e of extras) setJsonLd(e.id, e.data);

    return () => {
      for (const e of extras) clearJsonLd(e.id);
    };
  }, [title, description, path, extraIds, extraData, config.extraJsonLd]);
}
