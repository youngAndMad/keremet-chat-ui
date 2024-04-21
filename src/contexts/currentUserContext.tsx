import useLocalStorage from "@/hooks/useLocalStorage";
import api from "@/libs/api";
import { User } from "@/types/user/user";
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

  const { setToStorage } = useLocalStorage();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    console.log(userData);
    if (userData) {
      console.log("User data exists");
      setCurrentUser({
        isExists: true,
        user: JSON.parse(userData),
        setUser: currentUser.setUser,
      });
    } else {
      api
        .get<User>("/api/v1/auth/me")
        .then((user) => {
          setCurrentUser({
            isExists: false,
            user,
            setUser: currentUser.setUser,
          });
          setToStorage("user", JSON.stringify(user));
        })
        .catch(() => {
          setCurrentUser({
            isExists: false,
            user: null,
            setUser: currentUser.setUser,
          });
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
