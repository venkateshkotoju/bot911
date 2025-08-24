import Head from 'next/head';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  structuredData?: object;
  noIndex?: boolean;
  canonicalUrl?: string;
}

const defaultSEOData = {
  title: 'ModBot 911 - Expert Porsche 911 Modification Advice & Parts',
  description: 'Get expert advice on Porsche 911 modifications from 996 to 992. AI-powered recommendations for performance parts, tuning, suspension, exhaust systems, and more. Find the best mods for your 911.',
  keywords: [
    'Porsche 911 modifications',
    'Porsche 911 tuning',
    'Porsche performance parts',
    '996 997 991 992 mods',
    'Porsche turbo upgrades',
    'Porsche exhaust systems',
    'Porsche suspension',
    'Porsche ECU tuning',
    'Cobb Accessport Porsche',
    'Porsche modding advice'
  ],
  image: '/og-image.jpg',
  url: 'https://modbot911.com',
  siteName: 'ModBot 911'
};

export default function SEO({
  title,
  description,
  keywords = [],
  image,
  url,
  type = 'website',
  structuredData,
  noIndex = false,
  canonicalUrl
}: SEOProps) {
  const seoTitle = title ? `${title} | ModBot 911` : defaultSEOData.title;
  const seoDescription = description || defaultSEOData.description;
  const seoKeywords = [...defaultSEOData.keywords, ...keywords];
  const seoImage = image || defaultSEOData.image;
  const seoUrl = url || defaultSEOData.url;

  // Generate structured data for website
  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${seoUrl}/#website`,
        "url": seoUrl,
        "name": defaultSEOData.siteName,
        "description": seoDescription,
        "potentialAction": [
          {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": `${seoUrl}/search?q={search_term_string}`
            },
            "query-input": "required name=search_term_string"
          }
        ],
        "inLanguage": "en-US"
      },
      {
        "@type": "Organization",
        "@id": `${seoUrl}/#organization`,
        "name": defaultSEOData.siteName,
        "url": seoUrl,
        "logo": {
          "@type": "ImageObject",
          "url": `${seoUrl}/modbot-logo.png`,
          "contentUrl": `${seoUrl}/modbot-logo.png`,
          "width": 512,
          "height": 512,
          "caption": "ModBot 911 Logo"
        },
        "description": seoDescription,
        "sameAs": [
          "https://github.com/venkatesxhkotoju/bot911"
        ]
      }
    ]
  };

  // FAQ structured data
  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How much power can I gain from tuning my 996 Turbo?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "With a proper ECU tune like the Cobb Accessport V3, you can expect 60-80HP and 80-100TQ gains on a stock 996 Turbo. Combined with supporting mods like intake and exhaust, gains can reach 100+ HP."
        }
      },
      {
        "@type": "Question", 
        "name": "What's the best first modification for my 911?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "For most 911s, start with an ECU tune or piggyback system. It's the most cost-effective way to unlock power while maintaining reliability. For naturally aspirated models, consider a cold air intake and exhaust system."
        }
      },
      {
        "@type": "Question",
        "name": "Should I get coilovers or lowering springs for my 911?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Coilovers like Bilstein B16 PSS10 offer adjustable damping and height, making them ideal for track use. Lowering springs like H&R Sport Springs are more affordable and maintain OEM dampers."
        }
      }
    ]
  };

  // Product structured data template
  const productStructuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": title,
    "description": description,
    "image": seoImage,
    "brand": {
      "@type": "Brand",
      "name": "ModBot 911"
    },
    "category": "Automotive Parts & Accessories",
    "additionalProperty": [
      {
        "@type": "PropertyValue",
        "name": "Vehicle Compatibility",
        "value": "Porsche 911 (996, 997, 991, 992)"
      }
    ]
  };

  const finalStructuredData = structuredData || 
    (type === 'product' ? productStructuredData : 
     url?.includes('/faq') ? faqStructuredData : websiteStructuredData);

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      <meta name="keywords" content={seoKeywords.join(', ')} />
      <meta name="author" content="ModBot 911" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Language" content="en-US" />

      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* Robots */}
      <meta name="robots" content={noIndex ? 'noindex,nofollow' : 'index,follow'} />

      {/* Open Graph Meta Tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:image" content={seoImage} />
      <meta property="og:url" content={seoUrl} />
      <meta property="og:site_name" content={defaultSEOData.siteName} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="twitter:image" content={seoImage} />

      {/* Additional SEO Meta Tags */}
      <meta name="theme-color" content="#dc2626" />
      <meta name="msapplication-TileColor" content="#dc2626" />
      <meta name="application-name" content="ModBot 911" />

      {/* Preconnect to improve performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link rel="preconnect" href="https://api.openai.com" />

      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(finalStructuredData)
        }}
      />

      {/* Additional Mobile Optimization */}
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="HandheldFriendly" content="true" />
      <meta name="MobileOptimized" content="width" />

      {/* Performance optimization */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//api.openai.com" />
      <link rel="preload" href="/modbot-logo.png" as="image" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(finalStructuredData)
        }}
      />

      {/* Additional Performance & SEO Meta Tags */}
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      
      {/* Geo tags for local SEO (if applicable) */}
      <meta name="geo.region" content="US" />
      <meta name="geo.placename" content="United States" />

      {/* Additional automotive-specific tags */}
      <meta name="category" content="Automotive" />
      <meta name="coverage" content="Worldwide" />
      <meta name="distribution" content="Global" />
      <meta name="rating" content="General" />
    </Head>
  );
}

// Export additional SEO utilities
export const generateProductSEO = (product: any) => ({
  title: `${product.name} - ${product.brand} | Porsche 911 Parts`,
  description: `${product.description} Compatible with Porsche 911 models. Expert reviews, installation guides, and best prices.`,
  keywords: [
    product.name,
    product.brand,
    product.category,
    'Porsche 911 parts',
    'performance upgrade',
    ...product.keywords
  ],
  structuredData: {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.description,
    "image": product.image,
    "brand": {
      "@type": "Brand", 
      "name": product.brand
    },
    "offers": {
      "@type": "Offer",
      "price": product.price,
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "url": product.affiliateUrl
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": product.rating,
      "bestRating": 5,
      "worstRating": 1,
      "ratingCount": 100
    },
    "category": product.category,
    "additionalProperty": [
      {
        "@type": "PropertyValue",
        "name": "Vehicle Compatibility",
        "value": product.specifications?.compatibility || "Porsche 911"
      },
      {
        "@type": "PropertyValue", 
        "name": "Installation Difficulty",
        "value": product.installationDifficulty || "Moderate"
      }
    ]
  }
});

export const generateBreadcrumbSEO = (breadcrumbs: Array<{name: string, url: string}>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": breadcrumbs.map((crumb, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": crumb.name,
    "item": crumb.url
  }))
});