"use client"
import 'bootstrap/dist/css/bootstrap.css';
import { Inter } from "next/font/google";
import "./globals.css";

import CustomNavbar from "../components/layouts/Navbar";
import CustomSidebar from '../components/layouts/Sidebar';

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ display: 'flex', flexDirection: 'column', height: '100vh',backgroundColor:"black" }}>
        <div style={{ display: 'flex', flex: 1 }}>
          <CustomSidebar />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <CustomNavbar />
            <div className='child-container' style={{ flex: 1, padding: '20px', paddingBottom: "100px"}}>
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
