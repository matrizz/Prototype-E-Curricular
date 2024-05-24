'use client'

import { Button } from "./button";

export const LogoutButton = () => {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <Button
      onclick={logout}
      classname="text-xs font-bold absolute right-8 top-2 text-[#0056a6] hover:underline"
    >
      logout
    </Button>
  );
};
