/* eslint-disable jsx-a11y/anchor-is-valid */
import NextLink from 'next/link';
import React from 'react';

const Link = ({ children, linkTo, ...restProperties }) => {
  const regex = new RegExp('https?|wwww');
  const mailRegex = new RegExp('mailto');
  const phoneRegex = new RegExp('tel');
  const outward = regex.test(linkTo);
  const mail = mailRegex.test(linkTo);
  const tel = phoneRegex.test(linkTo);

  if (outward || mail || tel)
    return (
      <a
        href={linkTo}
        target="_blank"
        rel="noopener noreferrer"
        className={restProperties.className}
        style={restProperties.style}
      >
        {children}
      </a>
    );

  return (
    <NextLink {...restProperties} href={linkTo}>
      <a className={restProperties.className} style={restProperties.style}>
        {children}
      </a>
    </NextLink>
  );
};

export default Link;
