"use client";
import "bootstrap-icons/font/bootstrap-icons.css";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "react-toastify/dist/ReactToastify.css"; // ✅ Toastify CSS
import "../styles/globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { SessionProvider } from "next-auth/react";
import { config } from "@fortawesome/fontawesome-svg-core";
import { ToastContainer } from "react-toastify"; // ✅ Toast Container
import Header from "./components/header/header";
import AuthStatus from "../app/components/authstatus";

config.autoAddCss = false;

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body>
        <SessionProvider>
          <Header />
          {/* <AuthStatus /> */}
          <main className="min-h-screen">{children}</main>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </SessionProvider>
      </body>
    </html>
  );
}
