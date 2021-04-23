import { useRouter } from 'next/router';

const Layout = ({ children, preview }) => {
  const router = useRouter();
  const path = router?.query?.slug || false;

  return (
    <main className="relative">
      {children}

      {/* Handles existing StoryBlok preview environment */}
      {preview && (
        <a
          href={`/api/exit-preview${path ? `?slug=${path}` : ''}`}
          className="fixed px-4 py-2 text-white bg-black rounded hover:bg-red-400 bottom-5 left-5"
        >
          EXIT PREVIEW
        </a>
      )}
    </main>
  );
};

export default Layout;
