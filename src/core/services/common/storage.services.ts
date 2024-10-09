const setItem = (key: string, value: unknown): void => {
    localStorage.setItem(key, JSON.stringify(value));
  };
  
  const getItem = <T>(key: string): T | null => {
    const item = localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : null; // Returning null for better type alignment
  };
  
  const setItemGeneric = (key: string, value: string): void => {
    localStorage.setItem(key, value);
  };
  
  const removeItem = (key: string): boolean => {
    const exists = getItem(key);
    if (exists === null) return false; // Check for null instead of false
    localStorage.removeItem(key);
    return true;
  };
  
  const clearStorage = (): void => {
    localStorage.clear();
  };
  
  export { setItem, getItem, removeItem, clearStorage, setItemGeneric };