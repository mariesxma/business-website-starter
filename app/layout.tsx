import type { Metadata } from "next";
import { site } from "../config/site";
import type { ReactNode } from "react";
import Footer from "./components/footer";
import Header from "./components/header";
import "./diagrams.css";
import "./globals.css";
export const metadata: Metadata = {
  icons: { icon: "/favicon.svg" },
  metadataBase: new URL(site.url),
  title: { default: site.name, template: `%s | ${site.name}` },
  description: site.description,
  openGraph: {
    title: site.name,
    description: site.description,
    type: "website",
  },
  robots: { index: true, follow: true },
};
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
