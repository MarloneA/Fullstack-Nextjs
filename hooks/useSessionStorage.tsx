"use client";

import { useState } from "react";

/**
 * Hook for accessing session storage
 * Adventageous as an async operation
 * Use when you need to store sensitive data in session
 */
function useSessionStorage(
  key: string,
  initialValue: string | number | boolean
) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get from session storage by key
      const item = window?.sessionStorage?.getItem(key);
      // Parse stored json or if none return initialValue
      return item || initialValue;
    } catch (error) {
      // If error also return initialValue
      // console.error(error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to sessionStorage.
  const setValue = (value: any) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to session storage
      window?.sessionStorage?.setItem(key, valueToStore);
    } catch (error) {
      // A more advanced implementation would handle the error case
      // console.error(error);
    }
  };

  return [storedValue, setValue];
}

export default useSessionStorage;
