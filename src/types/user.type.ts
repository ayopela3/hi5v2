export type User = {
  id: string;
  full_name: string;
  email: string;
  role: "admin" | "staff" | "regular";
};
