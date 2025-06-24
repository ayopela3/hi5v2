import { supabase } from "@/lib/supabaseClient";
import type { User } from "@/types/user.type";

interface SignupInput {
  fullName: string;
  email: string;
  password: string;
  role: "regular";
}

async function signupUser(input: SignupInput) {
  const { fullName, email, password, role = "regular" } = input;

  // 1. Create user in auth
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error || !data.user) {
    return { user: null, error: error?.message || "Signup failed" };
  }

  // 2. Insert into users table
  const { error: userError } = await supabase.from("users").insert([
    {
      id: data.user.id,
      full_name: fullName,
      email,
      role,
    },
  ]);

  if (userError) {
    // Optionally: rollback auth user creation here
    return { user: null, error: userError.message };
  }

  const user: User = {
    id: data.user.id,
    full_name: fullName,
    email,
    role,
  };

  return { user, error: null };
}

export default signupUser;
