import { ReactNode } from "react";

export interface User {
  id: number | string;
  name: string;
  email: string;
  token: string;
  // Add any other user properties that exist in your user object
  [key: string]: any;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (responseData: {
    user: Omit<User, "token">;
    access_token: string;
  }) => Promise<boolean>;
  logout: () => boolean;
}

export declare const AuthProvider: ({
  children,
}: {
  children: ReactNode;
}) => JSX.Element;
export declare const useAuth: () => AuthContextType;
