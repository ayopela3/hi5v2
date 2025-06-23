import { supabase } from "@/lib/supabaseClient";
import type { User } from "@/types/user.type";

async function loginUser(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error || !data.user) {
    return { user: null, error: error?.message || "Login failed" };
  }

  // Fetch user data from users table
  const { data: userData, error: userError } = await supabase
    .from("users")
    .select("*")
    .eq("id", data.user.id)
    .single();

  if (userError || !userData) {
    return { user: null, error: userError?.message || "User not found" };
  }

  return { user: userData as User, error: null };
}

export default loginUser;
