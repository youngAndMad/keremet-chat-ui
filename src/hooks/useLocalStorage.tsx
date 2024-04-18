type LocalStorageKey = "user" | "theme" | "cookie-consent";

const useLocalStorage = () => {
  const get = (key: LocalStorageKey) => {
    const value = localStorage.getItem(key);
    return value !== null ? JSON.parse(value) : null;
  };

  const set = (key: LocalStorageKey, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  const remove = (key: LocalStorageKey) => {
    localStorage.removeItem(key);
  };

  const getString = (key: LocalStorageKey) => {
    return localStorage.getItem(key) || "";
  };

  return {
    getFromStorage: get,
    setToStorage: set,
    removeFromStorage: remove,
    getStringFromStorage: getString,
  };
};

export default useLocalStorage;
