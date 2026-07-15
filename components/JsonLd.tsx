import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

export function JsonLd() {
  const webApp = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web, iOS, Android",
    browserRequirements: "Requires JavaScript",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "Year calendar wallpaper",
      "Life in weeks wallpaper",
      "Goal countdown wallpaper",
      "Progress bar wallpaper",
      "iOS Shortcuts and Android automation",
      "No account required",
    ],
    author: {
      "@type": "Person",
      name: "Ali Rad",
      url: "https://alirad.dev",
    },
  };

  const webSite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    publisher: {
      "@type": "Person",
      name: "Ali Rad",
      url: "https://alirad.dev",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webApp) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSite) }}
      />
    </>
  );
}
