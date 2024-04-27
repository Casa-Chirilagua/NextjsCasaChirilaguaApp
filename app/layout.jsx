
import React from "react";
import AuthProvider from "@/components/AuthProvider";
import StoreProvider from "./StoreProvider";

//User Session



//Components
import MainNavigationBar from "@/components/navigation_bar/MainNavigationBar";
import SecondaryNavigationBar from "@/components/navigation_bar/SecondaryNavigationBar";

import "@/assets/styles/globals.scss";
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
})

export const metadata = {
  title: 'Casa Chirilagua | Nonprofit in Alexandria, VA',
  descrtiption: "Casa Chirilagua is a local nonprofit located in Alexandria, VA. We are a community of families, staff, and volunteers who are committed to investing in our neighborhood, one life at a time.",
}

const MainLayout = ({ children }) => {

  return (
    <AuthProvider>
      <StoreProvider>
        <html lang="en">
         <body className={inter.className}>
            <MainNavigationBar />
            <SecondaryNavigationBar />
            <main>{children}</main>
          </body>
        </html>
      </StoreProvider>
    </AuthProvider>

  );
};

export default MainLayout;
