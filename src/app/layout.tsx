import { Providers } from "@/providers/providers";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

const siteUrl = "https://www.sathyam.xyz";

const description =
  "Portfolio of Sathyam Sahu, showcasing projects, skills, and experience in web development.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Sathyam Sahu | Web Developer Portfolio",
    template: "%s | Sathyam Sahu",
  },
  description,
  applicationName: "Sathyam Sahu Portfolio",
  keywords: [
    "Sathyam Sahu",
    "Sathyam",
    "Sahu",
    "portfolio",
    "web developer",
    "frontend developer",
    "full stack developer",
    "projects",
  ],
  authors: [{ name: "Sathyam Sahu", url: siteUrl }],
  creator: "Sathyam Sahu",
  publisher: "Sathyam Sahu",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/images/portfolioImage.webp",
    shortcut: "/images/portfolioImage.webp",
    apple: "/images/portfolioImage.webp",
  },
  openGraph: {
    type: "website",
    url: "/",
    title: "Sathyam Sahu | Web Developer Portfolio",
    description,
    siteName: "Sathyam Sahu",
    images: [
      {
        url: "/images/portfolioImage.webp",
        width: 1200,
        height: 630,
        alt: "Sathyam Sahu",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sathyam Sahu | Web Developer Portfolio",
    description,
    images: ["/images/portfolioImage.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
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
        <Script
          id="ld-person"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "@id": `${siteUrl}/#sathyam-sahu`,
              name: "Sathyam Sahu",
              url: siteUrl,
              description,
              jobTitle: "Web Developer",
            }),
          }}
        />
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
