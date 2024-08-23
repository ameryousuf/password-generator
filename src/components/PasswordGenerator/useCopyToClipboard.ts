import { useCallback } from "react";

type CopyFn = (value: string) => Promise<boolean>;

/**
 * Hook to copy a string to the clipboard.
 * @returns A function to copy a string to the clipboard.
 */
export function useCopyToClipboard(): CopyFn {
  const copy = useCallback(async (value: string) => {
    if (!navigator?.clipboard) {
      console.warn("Clipboard not supported");
      return false;
    }

    try {
      await navigator.clipboard.writeText(value);
      return true;
    } catch (error) {
      console.warn("Copy to clipboard failed", error);
      return false;
    }
  }, []);

  return copy;
}
