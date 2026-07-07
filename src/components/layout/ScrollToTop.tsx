'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const ScrollToTop: React.FC = () => {
  const pathname = usePathname();

  useEffect(() => {
    const htmlElement = document.documentElement;
    const originalScrollBehavior = htmlElement.style.scrollBehavior;

    // Temporarily force instant scroll behavior
    htmlElement.style.scrollBehavior = 'auto';

    const performScroll = () => {
      const scrollOptions: ScrollToOptions = {
        top: 0,
        left: 0,
        behavior: 'instant' as ScrollBehavior,
      };
      window.scrollTo(scrollOptions);
      htmlElement.scrollTo(scrollOptions);
      document.body.scrollTo(scrollOptions);
    };

    // 1. Run scroll reset immediately
    performScroll();

    // 2. Run scroll reset after 100ms to handle initial layout calculations
    const t1 = setTimeout(performScroll, 100);

    // 3. Run scroll reset after 320ms to execute after the snappier 280ms Framer Motion exit animation completes
    const t2 = setTimeout(() => {
      performScroll();
      htmlElement.style.scrollBehavior = originalScrollBehavior;
    }, 320);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      htmlElement.style.scrollBehavior = originalScrollBehavior;
    };
  }, [pathname]);

  return null;
};

export default ScrollToTop;
