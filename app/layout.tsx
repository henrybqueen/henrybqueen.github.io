import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};



import Nav from "./Nav"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-white flex flex-col">
          <Nav />
          <div className="container justify-normal mx-auto max-w-6xl pt-16 h-screen max-h-screen px-4">
            {children}
          </div>
        </div>

      </body>
    </html>
  );
}
