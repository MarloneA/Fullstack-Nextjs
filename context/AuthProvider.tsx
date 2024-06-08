"use client";

import { createContext, useState } from "react";

type UserState = {
  id: string;
  name: string;
  email: string;
  role: string;
};

type UserContext = {
  isAuthenticated: boolean;
  user: UserState;
  setUser: () => void;
};

// const useAuthContext = () => {
//   const [user, setUser] = useState<UserState>({
//     id: "",
//     name: "",
//     email: "",
//     role: "",
//   });

//   return { user, setUser };
// };

// export const AuthContext = createContext<UserContext>();
