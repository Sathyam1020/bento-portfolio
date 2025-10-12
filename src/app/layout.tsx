import { Providers } from "@/providers/providers";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Bento Portfolio",
  description: "Showcasing my work in style",
  icons: {
    icon: "/images/portfolioImage.webp",
    shortcut: "/images/portfolioImage.webp",
    apple: "/images/portfolioImage.webp",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased font-sans max-w-5xl mx-auto py-4`}>
        <div
          className="fixed inset-0 pointer-events-none bg-gray-50 dark:bg-gray-900"
          style={{
            backgroundImage: `radial-gradient(circle, #d1d5db 1px, transparent 1px)`,
            backgroundSize: '20px 20px',
          }}
        />
        <div
          className="fixed inset-0 pointer-events-none hidden dark:block"
          style={{
            backgroundImage: `radial-gradient(circle, #4b5563 1px, transparent 1px)`,
            backgroundSize: '20px 20px',
            backgroundColor: '#111827',
          }}
        />
        <div className="relative z-10">
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
