import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, Playfair_Display, Poppins, Raleway } from "next/font/google"; // Changed from Open_Sans to Raleway
import "./globals.css";
import Layout from "@/components/Layout";
import Providers from "./providers";
import { ThemeProvider } from "./theme-provider";
import { Toaster } from "@/components/ui/toaster";
import Footer from "../components/Footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // adjust as needed
  variable: "--font-poppins",           // exposes a CSS variable
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${poppins.variable}`}>
      <body className="font-serif bg-background text-foreground">
        <Providers>
          <ThemeProvider
            attribute="class"
            disableTransitionOnChange
          >
            <Layout>{children}</Layout>
          </ThemeProvider>
          <Toaster />
        </Providers>
        <Footer />
      </body>
    </html>
  );
}
