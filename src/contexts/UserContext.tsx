import { useState, createContext, ReactNode, FC } from "react";

type UserContextType = {
  id: string;
  name: string;
  setUser: (user: { id: string; name: string }) => void;
};

const defaultValue: UserContextType = {
  id: "",
  name: "",
  setUser: () => {},
};

export const UserContext = createContext<UserContextType>(defaultValue);

export const UserProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [id, setId] = useState(() => {
    const savedId = localStorage.getItem("userId");
    return savedId || "";
  });

  const [name, setName] = useState(() => {
    const savedName = localStorage.getItem("userName");
    return savedName || "";
  });

  const setUser = (user: { id: string; name: string }) => {
    setId(user.id);
    setName(user.name);
    localStorage.setItem("userId", user.id);
    localStorage.setItem("userName", user.name);
  };

  return (
    <UserContext.Provider value={{ id, name, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
