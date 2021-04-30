import React from 'react';
import { render } from 'storyblok-rich-text-react-renderer';
const RichText = ({ document }) => {
  return <div>{render(document)}</div>;
};

export default RichText;
