import { link } from 'fs';
import Image from 'next/image';

import Link from '../elements/Link';
import { StoryBlokImageProps } from '../elements/StoryBlokImage';

type NavItemType = { text: string; linkTo: string };

const Nav = ({
  logo,
  items
}: {
  logo: StoryBlokImageProps;
  items: NavItemType[];
}) => {
  return (
    <nav className="max-w-screen-xl mx-auto py-2 flex justify-between items-center ">
      <div>
        {logo?.filename && logo?.alt && (
          <Image
            alt={logo.alt}
            width="141"
            layout="fixed"
            height="42"
            src={logo.filename}
          />
        )}
      </div>

      <ul className="flex space-x-4">
        {items?.map(item => (
          <Link
            className="font-serif text-xl"
            key={item.text}
            linkTo={item.linkTo || ''}
          >
            {item.text}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
