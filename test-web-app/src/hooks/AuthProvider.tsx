import React, { createContext } from "react";

interface AuthContextValue {
  token: string;
  fullName: string;
  email: string;
  login: (token: string, fullName: string, email: string) => void;
  logout: () => void;
  isAuth: () => boolean;
}

const AuthContext = createContext<AuthContextValue>({
  token: "",
  fullName: "",
  email: "",
  login: () => {},
  logout: () => {},
  isAuth: () => false,
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = React.useState(localStorage.getItem("token") || "");
  const [fullName, setFullName] = React.useState(
    localStorage.getItem("fullName") || ""
  );
  const [email, setEmail] = React.useState(localStorage.getItem("email") || "");

  const login = (token: string, fullName: string, email: string) => {
    setToken(token);
    setFullName(fullName);
    setEmail(email);
    localStorage.setItem("token", token);
    localStorage.setItem("fullName", fullName);
    localStorage.setItem("email", email);

    console.log("Logged in", token, fullName, email);
  };
  const logout = () => {
    setToken("");
    localStorage.removeItem("token");
  };
  const isAuth = () => {
    return token !== "" && token !== null;
  };

  return (
    <AuthContext.Provider
      value={{ token, fullName, email, login, logout, isAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
export { AuthContext };
