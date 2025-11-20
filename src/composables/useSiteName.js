/**
 * Get site name from environment variable or fallback to root domain
 * 
 * Priority:
 * 1. VITE_SITE_NAME environment variable (if set)
 * 2. Root domain from window.location.hostname (remove 'www.' if present)
 * 3. 'Blog' (fallback for SSR)
 * 
 * @returns {{ siteName: string }} Site name
 * 
 * @example
 * const { siteName } = useSiteName();
 * // If VITE_SITE_NAME is empty and current domain is 'example.com'
 * // siteName will be 'example.com'
 */
export function useSiteName() {
  const getDefaultSiteName = () => {
    if (typeof window !== 'undefined') {
      // Get root domain from current URL
      const hostname = window.location.hostname;
      // Remove 'www.' if present
      return hostname.replace(/^www\./, '');
    }
    // Fallback for SSR
    return 'Blog';
  };

  const envSiteName = import.meta.env.VITE_SITE_NAME;
  const siteName = envSiteName && envSiteName.trim() !== '' 
    ? envSiteName 
    : getDefaultSiteName();

  return {
    siteName,
  };
}

