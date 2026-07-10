import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

const FAQ_ITEMS = [
  {
    question: "How do I get a custom iPhone lock screen wallpaper that updates daily?",
    answer:
      "Use Dynamic Wallpapers to generate a URL for your year tracker, goal countdown, or progress wallpaper. Then set up an iOS Shortcut that downloads the image from that URL every morning and applies it as your lock screen. No app install or account required.",
  },
  {
    question: "Does this work on Android phones?",
    answer:
      "Yes. Dynamic Wallpapers supports Samsung Galaxy, Google Pixel, OnePlus, Xiaomi, and dozens of other Android devices at exact screen resolutions. Use MacroDroid or a similar automation app to fetch the wallpaper URL daily and set it as your lock screen.",
  },
  {
    question: "What is a goal setting wallpaper?",
    answer:
      "A goal setting wallpaper displays a visual countdown to a date that matters — a product launch, exam, race day, or personal milestone. Each morning the ring updates so you always see how many days remain.",
  },
  {
    question: "Is Dynamic Wallpapers free?",
    answer:
      "Completely free. There are no accounts, subscriptions, or in-app purchases. The wallpapers are generated from a simple URL you configure once.",
  },
  {
    question: "What wallpaper types are available?",
    answer:
      "Four types: a year grid (every day of the year as a dot), life in weeks (one square per week of your life), a goal countdown ring, and a custom progress bar for any date range.",
  },
  {
    question: "Can I use a custom screen resolution?",
    answer:
      "Yes. Choose your exact iPhone, iPad, or Android model from the device list, or enter a custom width and height for any screen size.",
  },
];

export function JsonLd() {
  const webApp = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web, iOS, Android",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "Custom iPhone lock screen wallpapers",
      "Custom Android lock screen wallpapers",
      "Daily auto-updating year progress grid",
      "Life in weeks visualization",
      "Goal countdown wallpaper",
      "Custom progress bar wallpaper",
      "iOS Shortcuts integration",
      "MacroDroid integration",
      "No account required",
    ],
    author: {
      "@type": "Person",
      name: "Ali Rad",
      url: "https://alirad.dev",
    },
  };

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const webSite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSite) }}
      />
    </>
  );
}

export { FAQ_ITEMS };
