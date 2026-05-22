export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://fengshui-liuyao-web.vercel.app";

export function absoluteUrl(path = "/") {
  return new URL(path, siteUrl).toString();
}

export function jsonLdScript(data: Record<string, unknown>) {
  return {
    __html: JSON.stringify(data).replace(/</g, "\\u003c"),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "SY Metaphysics",
    url: siteUrl,
    inLanguage: ["en", "zh-Hans"],
    description:
      "Bilingual Feng Shui, Liu Yao, and Taoist consultation for overseas users.",
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/services?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "SY Metaphysics",
    url: siteUrl,
    logo: absoluteUrl("/favicon.ico"),
    areaServed: "Worldwide",
    knowsAbout: [
      "Feng Shui",
      "Liu Yao divination",
      "I Ching",
      "Chinese metaphysics",
      "Taoist ritual consultation",
    ],
  };
}

export function serviceJsonLd({
  name,
  description,
  url,
  serviceType,
}: {
  name: string;
  description: string;
  url: string;
  serviceType: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    serviceType,
    url: absoluteUrl(url),
    provider: {
      "@type": "Organization",
      name: "SY Metaphysics",
      url: siteUrl,
    },
    areaServed: "Worldwide",
    availableLanguage: ["English", "Chinese"],
  };
}

export function articleJsonLd({
  headline,
  description,
  url,
}: {
  headline: string;
  description: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    url: absoluteUrl(url),
    author: {
      "@type": "Organization",
      name: "SY Metaphysics",
    },
    publisher: {
      "@type": "Organization",
      name: "SY Metaphysics",
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/favicon.ico"),
      },
    },
  };
}

export function faqJsonLd(
  questions: Array<{
    question: string;
    answer: string;
  }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
