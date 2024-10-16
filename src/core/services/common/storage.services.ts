const setItem = (key: string, value: any): void => {
  localStorage.setItem(key, JSON.stringify(value));
};

const getItem = <T>(key: string): T | null => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) as T : null;
};

const getItemGeneric = (key: string): string | null => {
  return localStorage.getItem(key);
};

const setItemGeneric = (key: string, value: string): void => {
  localStorage.setItem(key, value);
};

const removeItem = (key: string): boolean => {
  if (!localStorage.getItem(key)) return false;
  localStorage.removeItem(key);
  return true;
};

const clearStorage = (): void => {
  localStorage.clear();
};

export {
  setItem,
  getItem,
  removeItem,
  clearStorage,
  setItemGeneric,
  getItemGeneric,
};
