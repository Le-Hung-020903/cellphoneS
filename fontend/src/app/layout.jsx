import { Inter } from "next/font/google";
// import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Toaster } from "react-hot-toast";
import BootstrapProvider from "./providers/bootstrapProvider";
import Providers from "../redux/provider";
import Header from "./components/header";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <BootstrapProvider>
          <Providers>
            {children}
            <Toaster position="top-center" />
          </Providers>
        </BootstrapProvider>
      </body>
    </html>
  );
}