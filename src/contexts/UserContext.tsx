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
  const [id, setId] = useState("");
  const [name, setName] = useState("");

  const setUser = (user: { id: string; name: string }) => {
    setId(user.id);
    setName(user.name);
  };

  return (
    <UserContext.Provider value={{ id, name, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
