import { useState, createContext, ReactNode, FC } from "react";

type UserContextType = {
  userId: string;
  nickname: string;
  setUser: (user: { userId: string; nickname: string }) => void;
};

const defaultValue: UserContextType = {
  userId: "",
  nickname: "",
  setUser: () => {},
};

export const UserContext = createContext<UserContextType>(defaultValue);

export const UserProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [userId, setId] = useState(() => {
    const savedId = localStorage.getItem("userId");
    return savedId || "";
  });

  const [nickname, setName] = useState(() => {
    const savedName = localStorage.getItem("userName");
    return savedName || "";
  });

  const setUser = (user: { userId: string; nickname: string }) => {
    setId(user.userId);
    setName(user.nickname);
    localStorage.setItem("userId", user.userId);
    localStorage.setItem("userName", user.nickname);
  };

  return (
    <UserContext.Provider value={{ userId, nickname, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
