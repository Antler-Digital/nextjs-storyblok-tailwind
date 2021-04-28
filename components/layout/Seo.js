import Head from 'next/head';
import React from 'react';

import siteSettings from '../../lib/SiteSettings';

export const Seo = ({
  title,
  description,
  image,
  article,
  logo // placeholder
}) => {
  const metaTitle = title
    ? `${title} | ${siteSettings.title}`
    : siteSettings.title;
  const metaDescription = description || siteSettings.description;
  const metaImage = `${siteSettings.siteUrl}${image ? `${image}` : logo}`; // placeholder logo here

  return (
    <Head>
      <noscript>
        Your browser does not support JavaScript! This site works best with
        javascript ( and by best only ).{' '}
      </noscript>
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />

      <link rel="icon" href="/favicon.ico" />

      {/* Facebook */}
      <meta property="og:url" content={siteSettings.siteUrl} />
      <meta property="og:type" content={article ? `article` : `website`} />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={siteSettings.siteUrl} />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />

      {siteSettings.twitterUsername && (
        <meta name="twitter:creator" content={siteSettings.twitterUsername} />
      )}

      <meta charSet="UTF-8" />
    </Head>
  );
};
