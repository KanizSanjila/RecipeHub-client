import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
// 🎯 ১. থিম প্রোভাইডার ইম্পোর্ট করো (পাথটি তোমার প্রজেক্ট অনুযায়ী চেক করে নিও)
import { ThemeProvider } from "@/providers/ThemeProvider"; 

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "RecipeHub",
  description: "Recipe Sharing Platform",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning // 👈 ২. নেক্সট জেএস-এর হাইড্রেশন এরর এড়াতে এটি অত্যন্ত জরুরি
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      {/* 🎯 ৩. এখানে bg-white এবং dark:bg-zinc-950 দিয়ে গ্লোবাল ব্যাকগ্রাউন্ড সেট করা হলো */}
      <body className="min-h-full flex flex-col bg-white dark:bg-zinc-950 text-gray-900 dark:text-zinc-50 transition-colors duration-300">
        
        {/* 🎯 ৪. পুরো বডি কন্টেন্টকে ThemeProvider দিয়ে র্যাপ (Wrap) করে দেওয়া হলো */}
        <ThemeProvider>
          <main className="flex-grow flex flex-col">{children}</main>
          <Toaster />
        </ThemeProvider>

      </body>
    </html>
  );
}
