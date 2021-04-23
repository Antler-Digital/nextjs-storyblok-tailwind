import SbEditable from 'storyblok-react';

import Teaser from './Teaser';

// resolve Storyblok components to Next.js components
const Components = {
  teaser: Teaser
};

const DynamicComponent = ({ blok }) => {
  // check if component is defined above
  if (typeof Components[blok.component] !== 'undefined') {
    const Component = Components[blok.component];
    // wrap with SbEditable for visual editing manually add to different components if you want to change which are editable
    return (
      <SbEditable content={blok} key={blok._uid}>
        <Component {...blok} />
      </SbEditable>
    );
  }

  return (
    <p>
      The component <strong>{blok.component}</strong> has not been created yet.
    </p>
  );
};

export default DynamicComponent;
