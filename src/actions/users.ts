import { supabase } from "@/lib/supabaseClient";

export type SignupInput = {
  fullName: string;
  email: string;
  password: string;
  role?: "staff" | "regular";
};

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

export async function loginUser(email: string, password: string) {
  // Hardcoded admin
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    return {
      user: { email, role: "admin" },
      error: null,
    };
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { user: null, error: error.message };
  }

  const user = data.user
    ? { ...data.user, role: data.user.user_metadata?.role || "regular" }
    : null;

  return {
    user,
    error: null,
  };
}

export async function signupUser(input: SignupInput) {
  if (input.email === ADMIN_EMAIL) {
    return { user: null, error: "Cannot sign up as admin." };
  }

  const { fullName, email, password, role = "regular" } = input;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        role,
      },
    },
  });

  if (error) {
    return { user: null, error: error.message };
  }

  const user = data.user
    ? { ...data.user, role: data.user.user_metadata?.role || role }
    : null;

  return {
    user,
    error: null,
  };
}
