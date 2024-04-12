import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  PropsWithChildren,
} from "react";

interface CurrentUser {
  isExists: boolean;
  user: any;
  setUser?: (user: any) => void;
}

const CurrentUserContext = createContext<CurrentUser>({
  isExists: false,
  user: null,
});

export const useCurrentUser = () => useContext(CurrentUserContext);

export const CurrentUserContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<CurrentUser>({
    isExists: false,
    user: null,
  });

  useEffect(() => {
    const userData = localStorage.getItem("currentUser");
    if (userData && typeof userData !== "string") {
      setCurrentUser({ isExists: true, user: JSON.parse(userData) });
    } else {
      setCurrentUser({ isExists: false, user: null });
    }
  }, []);

  const setUser = (user: any) => {
    setCurrentUser({ ...currentUser, user });
    localStorage.setItem("currentUser", JSON.stringify(user));
  };

  return (
    <CurrentUserContext.Provider value={{ ...currentUser, setUser }}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export default CurrentUserContextProvider;
