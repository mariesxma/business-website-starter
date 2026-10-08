import type { ReactNode } from "react";
import Footer from "./components/footer";
import Header from "./components/header";
import "./globals.css";
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
