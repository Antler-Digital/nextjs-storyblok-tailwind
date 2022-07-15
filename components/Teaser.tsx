import React from 'react';

const Teaser = ({ blok }: { blok: { headline: string } }) => {
  return <h2 className="text-xl text-black">{blok.headline}</h2>;
};

export default Teaser;
