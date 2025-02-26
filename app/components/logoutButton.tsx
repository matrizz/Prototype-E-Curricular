'use client'

import { auth, signOut } from "@/firebase/firebase";
import { Button } from "./button";

export const LogoutButton = ({styles}:{styles?: string}) => {
  const logout = () => {
    signOut(auth)
  };

  return (
    <Button
      onclick={logout}
      classname={`text-xs font-bold absolute right-4 top-11 md:right-8 md:top-6 text-[#0056a6] ${styles}`}
    >
      logout
    </Button>
  );
};
