import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  ogUrl?: string;
  schema?: object | object[];
  noindex?: boolean;
}

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://example.com';

export default function SEO({
  title,
  description,
  keywords,
  ogImage,
  ogType = 'website',
  ogUrl,
  schema,
  noindex = false,
}: SEOProps) {
  useEffect(() => {
    document.title = title;

    const setMeta = (name: string, content: string, attr = 'name') => {
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('description', description);
    if (keywords) setMeta('keywords', keywords);
    setMeta(
      'robots',
      noindex ? 'noindex, nofollow' : 'index, follow'
    );

    // Canonical link
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', ogUrl || SITE_URL);

    // Last modified
    setMeta('last-modified', new Date().toISOString().split('T')[0]);

    setMeta('og:title', title, 'property');
    setMeta('og:description', description, 'property');
    setMeta('og:type', ogType, 'property');
    setMeta('og:url', ogUrl || SITE_URL, 'property');
    if (ogImage) setMeta('og:image', ogImage, 'property');

    setMeta('twitter:title', title);
    setMeta('twitter:description', description);
    if (ogImage) setMeta('twitter:image', ogImage);

    if (schema) {
      const existing = document.getElementById('page-schema');
      if (existing) existing.remove();
      const script = document.createElement('script');
      script.id = 'page-schema';
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    }

    return () => {
      const existing = document.getElementById('page-schema');
      if (existing) existing.remove();
    };
  }, [title, description, keywords, ogImage, ogType, ogUrl, schema, noindex]);

  return null;
}