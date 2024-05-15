
import React from "react";
import SessionProvider from "@/components/SessionProvider";
import StoreProvider from "./StoreProvider";

import { getServerSession } from "next-auth";

//Toast
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';

//Components
import MainNavigationBar from "@/components/navigation_bar/MainNavigationBar";
import SecondaryNavigationBar from "@/components/navigation_bar/SecondaryNavigationBar";
import Footer from "@/components/footer/Footer";

import "@/assets/styles/globals.scss";
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
})

export const metadata = {
  title: 'Casa Chirilagua | Nonprofit in Alexandria, VA',
  descrtiption: "Casa Chirilagua is a local nonprofit located in Alexandria, VA. We are a community of families, staff, and volunteers who are committed to investing in our neighborhood, one life at a time.",
}

const MainLayout = async ({ children }) => {

  const session = await getServerSession();

  return (
    <StoreProvider>
      <html lang="en">
        <body className={inter.className}>
          <SessionProvider session={session}>
            <main>
              <MainNavigationBar />
              <SecondaryNavigationBar />
              {children}
              <ToastContainer />
              <Footer />
            </main>
          </SessionProvider>
        </body>
      </html>
    </StoreProvider>
  );
};

export default MainLayout;
