import React from "react";
// import { UserProvider } from '@auth0/nextjs-auth0/client';
import AuthProvider from "@/components/AuthProvider";
import "@/assets/styles/globals.scss";
// import { redirect } from 'next/navigation';
// import { useUser } from '@auth0/nextjs-auth0';


export const metadata = {
  title: 'Casa Chirilagua | Nonprofit in Alexandria, VA',
  descrtiption: "Casa Chirilagua is a local nonprofit located in Alexandria, VA. We are a community of families, staff, and volunteers who are committed to investing in our neighborhood, one life at a time.",
}

const MainLayout = ({ children }) => {

  return (
    <AuthProvider>
      <html lang="en">
        {/* <UserProvider> */}
        <body>
          <div>{children}</div>
        </body>
        {/* </UserProvider> */}
      </html>
    </AuthProvider>

  );
};

export default MainLayout;
