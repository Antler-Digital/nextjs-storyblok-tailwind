import Image from 'next/image';

const Nav = ({ logo }) => {
  return (
    <nav>
      <div>
        {logo?.filename && logo?.alt && (
          <Image
            alt={logo.alt}
            width="300"
            layout="fixed"
            height="100"
            src={logo.filename}
          />
        )}
      </div>
    </nav>
  );
};

export default Nav;
