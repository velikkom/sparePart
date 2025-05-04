"use client";
import "bootstrap-icons/font/bootstrap-icons.css";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { SessionProvider } from "next-auth/react";
import AuthStatus from "../app/components/authstatus";
import "../styles/globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faGoogle,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import Header from "./components/header/header";
config.autoAddCss = false;

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body>
        <SessionProvider>
          <Header />
          <div>{children}</div>
        </SessionProvider>
      </body>
    </html>
  );
}
