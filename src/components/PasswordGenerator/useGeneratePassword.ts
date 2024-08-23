import { generate } from "generate-password-ts";
import { useCallback } from "react";

/**
 * This hook is used to wrap the passowrd generation logic.
 * It's currently using the `generate-password-ts` package,
 * but it could be easily replaced at any time.
 */

/**
 * Hook to generate a password.
 * @returns A function to generate a password.
 */
export function useGeneratePassword() {
  const generatePassword = useCallback(
    (
      length: number,
      lowercase: boolean,
      uppercase: boolean,
      numbers: boolean,
      symbols: boolean
    ) => generate({ length, lowercase, uppercase, numbers, symbols }),
    []
  );

  return generatePassword;
}
