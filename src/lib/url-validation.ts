/**
 * Validates that a URL uses a safe protocol (http or https).
 * Prevents javascript: and other dangerous protocol injection.
 */
export const isSafeUrl = (url: string): boolean => {
  const trimmed = url.trim();
  if (trimmed === '' || trimmed === '#') return true; // allow empty or placeholder
  return /^https?:\/\//i.test(trimmed);
};

/**
 * Sanitizes a URL by rejecting unsafe protocols.
 * Returns the URL if safe, or empty string if not.
 */
export const sanitizeUrl = (url: string): string => {
  return isSafeUrl(url) ? url.trim() : '';
};
