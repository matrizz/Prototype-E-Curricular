'use client'
import Avatar from "@mui/joy/Avatar";
import { LogoutButton } from "./components/logoutButton";
import { SearchInput } from "./components/searchInput";
import { CardOption } from "./components/cardOption";
import { lexend } from "./components/lexend";
import useProtectedRoute from "./hooks/useProtectedRoute";
import Loading from "./components/loading";
import { useEffect, useState } from "react";
import { auth, db } from "@/firebase/firebase";
import { doc, DocumentData, DocumentSnapshot, getDoc } from "firebase/firestore";

const course = "Tecnico em Informatica para Internet";

export default function Home() {
  const { isLoading, role, UID } = useProtectedRoute(['user', 'admin'], '/login')

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className="w-full h-full flex flex-col gap-40 md:gap-20 items-center p-6">
      <header className="flex justify-center w-full">
        <div className="flex flex-row-reverse right-4 top-6">
          <div className="flex w-auto max-w-80 gap-2 border-[#3636362e] border-[1px] rounded-md p-2 px-4">
            {
              auth.currentUser?.photoURL ?
                <img src={auth.currentUser.photoURL} className="size-10 rounded-full" alt="profile" /> :
                <Avatar variant="solid" color="primary" />
            } 
            <div className="flex flex-col p-1">
              <LogoutButton styles="border border-slate-200 bg-[#0056a6] text-white rounded-md p-2 hover:opacity-95 transition-colors duration-300 ease-in-out" />
              <p className="text-xs font-bold">{auth.currentUser?.displayName}</p>
              <p className="text-xs">

                {course.length > 25 ? course.slice(0, 30) + "..." : course}
              </p>
            </div>
          </div>

          {/* <div className="sm:flex-none flex w-52 gap-6 items-center border-[#3636362e] border-[1px] rounded-md p-2 px-4">
            <div className="flex flex-col">
              <p className="text-[8px]">by</p>
              <p className="text-xs font-bold">Matrizz</p>
            </div>
            <div className="flex flex-col">
              <p className="text-[8px]">powered by</p>
              <p className="text-xs font-bold"> Etec - Itanhaém</p>
            </div>
          </div> */}
        </div>
      </header>

      <p
        className={`${lexend.className} text-3xl text-[#0056a6] font-bold text-center justify-center`}
      >
        e-CurricuLar
      </p>
      <main className="w-full h-full flex flex-col items-center gap-20 rounded-md p-5">
        {
          role === 'admin' && <SearchInput />
        }
        <div className="flex items-center justify-center flex-col md:flex-row gap-8 w-full">
          <CardOption redirect="/upload">
            <h1 className="text-center text-lg font-bold">Upload</h1>
            <p className="text-slate-700 text-sm text-center">
              Upload resume file from your computer
              <p>(soon)</p>
            </p>
          </CardOption>
        <CardOption redirect="/form">
          <h1 className="text-center text-lg font-bold">Criar</h1>
          <p className="text-slate-700 text-sm text-center">Crie seus currículos</p>
        </CardOption>
        <CardOption redirect="/resumes">
          <h1 className="text-center text-lg font-bold">Download</h1>
          <p className="text-slate-700 text-sm text-center">
            Faça download de deus currículos
          </p>
        </CardOption> 
        </div>
        {/* <CardOption redirect="/upload">
            <h1 className="text-center text-lg font-bold">Upload</h1>
            <p className="text-slate-700 text-sm text-center">
              Upload resume file from your computer
              <p>(soon)</p>
            </p>
          </CardOption> */}
      </main>
      {/* <footer className="flex flex-col items-center justify-center">
        <p className="text-xs text-slate-500">© 2024 <a className="hover:text-blue-400" href="/about">e-CurricuLar</a></p>
      </footer> */}
    </div>
  );
}



// color palette

// #0056a6
// #ffffff
// #0070d9
// #003c73
// #e6e6e6
// #0d8aff
