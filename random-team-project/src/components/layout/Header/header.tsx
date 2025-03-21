
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const Header = () => {
  const pathname = usePathname();
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  // Hide/reveal header on scroll

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollTop = window.scrollY;
      const scrollThreshold = 10; // Adjust this value for sensitivity

      if (currentScrollTop > lastScrollTop + scrollThreshold) {
        // Scrolling down
        setIsHeaderVisible(false);
      } else if (currentScrollTop < lastScrollTop - scrollThreshold) {
        // Scrolling up
        setIsHeaderVisible(true);
      }

      setLastScrollTop(currentScrollTop <= 0 ? 0 : currentScrollTop);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollTop]);

  return (
    
    <>
       {/* Navigation */}
       <nav className={`bg-white shadow-sm w-full fixed top-0 left-0 right-0 z-[50] transition-transform duration-300 ${ isHeaderVisible ? 'translate-y-0' : '-translate-y-full'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-20 items-center">
              <div className="flex items-center">
              <Link
                    href="/"
                    className="text-gray-400 hover:text-gray-600"
                    aria-label="Visit our Instagram profile"
                  >
                    <span className="ml-2 sm:text-xl text-[11px] font-semibold text-gray-900">Random Team Generator</span>
                  </Link>
                
              </div>
              <div className="flex space-x-4">
                <Link href="/" className={`text-gray-700  sm:px-3 px-1 py-2  sm:text-base text-sm font-medium hover:border-b-2 hover:border-primary ${pathname === '/' ? 'border-b-2 border-primary' : ''}`}>Home</Link>
                <Link href="/players" className={` text-gray-700  sm:px-3 px-1 py-2  sm:text-base text-sm font-medium hover:border-b-2 hover:border-primary ${pathname.includes('/players') ? 'border-b-2 border-primary' : ''}`}>Players</Link>
                <Link href="/teams" className={` text-gray-700  sm:px-3 px-1 py-2  sm:text-base text-sm font-medium hover:border-b-2 hover:border-primary ${pathname.includes('/teams') ? 'border-b-2 border-primary' : ''}`}>Teams</Link>

              </div>
            </div>
          </div>
        </nav>
    </>
  )
}

export default Header;