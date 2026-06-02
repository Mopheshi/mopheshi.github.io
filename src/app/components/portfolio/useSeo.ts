import { useEffect } from "react";
import { portraitImg } from "./decorative";
import faviconImg from "../../../imports/favicon.png";

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

/**
 * Injects SEO meta, Open Graph, Twitter card, canonical, favicon and a
 * JSON-LD Person schema at runtime.
 *
 * NOTE: social scrapers (LinkedIn, Twitter, WhatsApp, Slack) generally do
 * NOT execute JS, so for shared previews to work the same tags must also
 * live in the real index.html once the project is ejected to GitHub Pages.
 */
export function useSeo() {
  useEffect(() => {
    const title = "Ndachimya Edward — AI Engineer & Founder";
    const description =
      "Ndachimya Edward — AI Engineer and Founder building Vancus AI and VaultSplit. M.Sc. AI Engineering at İstanbul Okan University. Open to PhD offers and technical co-founder roles.";
    const url = "https://mopheshi.github.io/";
    const image = `${url}og-image.png`;

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

    setMeta("property", "og:type", "website");
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", url);
    setMeta("property", "og:image", image);
    setMeta("property", "og:locale", "en_GB");
    setMeta("property", "og:site_name", "Ndachimya Edward");

    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", image);

    setLink("canonical", url);
    setLink("icon", faviconImg, "image/jpeg");
    setLink("apple-touch-icon", faviconImg);

    const ldId = "ld-person";
    let ld = document.getElementById(ldId) as HTMLScriptElement | null;
    if (!ld) {
      ld = document.createElement("script");
      ld.id = ldId;
      ld.type = "application/ld+json";
      document.head.appendChild(ld);
    }
    ld.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Ndachimya Edward",
      alternateName: "Edward Ndachimya Magaji",
      jobTitle: "AI Engineer & Founder",
      description,
      url,
      image,
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
    });
  }, []);
}
