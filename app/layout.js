import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Hey! Meet AI Interviewer",
  description: "An AI-powered tool that generates custom interview questions based on job title and experience. Simulate real interviews, record answers, and receive AI-driven feedback to improve your skills. Secure, user-friendly, and designed for optimal interview preparation.",
};


export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Toaster />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
