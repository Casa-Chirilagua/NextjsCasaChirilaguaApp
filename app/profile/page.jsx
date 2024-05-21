'use client';
import { useSession } from "next-auth/react";

export default function ProfileClient() {
  const { data: session} = useSession();
  const profileImage = session?.user?.image;
  //profileImage);
  //session);

  return (
    session && (
      <div>
        {/* <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p> */}
      </div>
    )
  );
}