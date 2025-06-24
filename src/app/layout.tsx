import type React from "react";
import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "HiFive Coworking",
  description: "A vibrant coworking community in Iloilo City",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
          <Toaster
            position="bottom-right"
            richColors={true}
            closeButton={true}
            expand={false}
            visibleToasts={3}
          />
        </AuthProvider>
      </body>
    </html>
  );
}
