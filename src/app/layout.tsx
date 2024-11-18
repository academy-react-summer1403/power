import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Power",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        <Toaster
          toastOptions={{ duration: 3000 }}
          reverseOrder={true}
          containerClassName="toaster"
          containerStyle={{ direction: "rtl"}}
          position="top-center"
        />
      </body>
    </html>
  );
}
