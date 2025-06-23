"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { supabase } from "@/lib/supabaseClient";
import { User } from "@/types/user.type";
import { loginUser, signupUser } from "@/actions/auth";

interface SignupInput {
  fullName: string;
  email: string;
  password: string;
  role: "regular";
}

interface AuthContextType {
  user: User | null;
  role: User["role"] | null;
  login: (
    email: string,
    password: string
  ) => Promise<{ user: User | null; error: string | null }>;
  signup: (
    input: SignupInput
  ) => Promise<{ user: User | null; error: string | null }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<User["role"] | null>(null);

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session?.user) {
        // Fetch user data from users table
        const { data: userData } = await supabase
          .from("users")
          .select("*")
          .eq("id", session.user.id)
          .single();
        if (userData) {
          setUser(userData as User);
          setRole(userData.role);
        } else {
          setUser(null);
          setRole(null);
        }
      } else {
        setUser(null);
        setRole(null);
      }
    };
    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      getSession();
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    const result = await loginUser(email, password);
    if (result.user) {
      setUser(result.user);
      setRole(result.user.role);
    }
    return result;
  };

  const signup = async (input: SignupInput) => {
    const result = await signupUser(input);
    if (result.user) {
      setUser(result.user);
      setRole(result.user.role);
    }
    return result;
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ user, role, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
