import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

interface CurrentUser {
  isExists: boolean;
  user: any;
  setUser: (user: any) => void; // Removed the '?' operator
}

const CurrentUserContext = createContext<CurrentUser>({
  isExists: false,
  user: null,
  setUser: () => {}, // Added a default function
});

export const useCurrentUser = () => useContext(CurrentUserContext);

export const CurrentUserContextProvider: React.FC<PropsWithChildren<any>> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<CurrentUser>({
    isExists: false,
    user: null,
    setUser: () => {}, // Added a default function
  });

  useEffect(() => {
    const userData = localStorage.getItem("currentUser");
    console.log(userData);
    if (userData) {
      console.log("User data exists");
      setCurrentUser({
        isExists: true,
        user: JSON.parse(userData),
        setUser: currentUser.setUser,
      });
    } else {
      setCurrentUser({
        isExists: false,
        user: null,
        setUser: currentUser.setUser,
      });
    }
  }, []);

  const setUser = (user: any) => {
    setCurrentUser({ isExists: true, user, setUser });
    localStorage.setItem("currentUser", JSON.stringify(user));
  };

  console.log("currentUser", currentUser);

  return (
    <CurrentUserContext.Provider value={{ ...currentUser, setUser }}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export default CurrentUserContextProvider;
