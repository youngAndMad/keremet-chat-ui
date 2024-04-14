type LocalStorageKey = "user" | "accessToken" | "refreshToken" | "theme";

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

  return { getFromStorage: get, setToStorage: set, removeFromStorage: remove };
};

export default useLocalStorage;
