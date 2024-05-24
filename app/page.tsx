import Avatar from "@mui/joy/Avatar";
import { LogoutButton } from "./components/logoutButton";
import { SearchInput } from "./components/searchInput";
import { CardOption } from "./components/cardOption";
import { lexend } from "./components/lexend";
const course = "Tecnico em Informatica para Internet";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex flex-col items-center justify-center p-24">
        <div className="flex absolute gap-5 flex-row-reverse right-4 top-6">
          <div className="flex w-auto max-w-80 gap-2 border-[#3636362e] border-[1px] rounded-md p-2 px-4">
            <Avatar variant="solid" color="primary" />
            <div className="flex flex-col p-1">
              <LogoutButton />
              <p className="text-xs font-bold">Matrizz</p>
              <p className="text-xs">
                course:{" "}
                {course.length > 20 ? course.slice(0, 20) + "..." : course}
              </p>
            </div>
          </div>
          <div className="sm:flex-none flex w-52 gap-6 items-center border-[#3636362e] border-[1px] rounded-md p-2 px-4">
            <div className="flex flex-col">
              <p className="text-[8px]">by</p>
              <p className="text-xs font-bold">Matrizz</p>
            </div>
            <div className="flex flex-col">
              <p className="text-[8px]">powered by</p>
              <p className="text-xs font-bold"> Etec - Itanhaém</p>
            </div>
          </div>
        </div>
        <h1
          className={`${lexend.className} title text-3xl text-[#0056a6] font-bold text-center justify-center`}
        >
          e-CurricuLar
        </h1>
      </header>

      <main className="flex flex-col items-center rounded-md">
        <SearchInput />
        <div className="flex w-86 items-center justify-evenly gap-8 p-24">
          <CardOption redirect="/upload">
            <h1 className="text-center text-lg font-bold">Upload</h1>
            <p className="text-slate-700 text-sm text-center">
              Upload a new resume file from your computer
            </p>
          </CardOption>
          <CardOption redirect="/create">
            <h1 className="text-center text-lg font-bold">Create</h1>
            <p className="text-slate-700 text-sm text-center">( soon )</p>
          </CardOption>
          <CardOption redirect="/resumes">
            <h1 className="text-center text-lg font-bold">Download</h1>
            <p className="text-slate-700 text-sm text-center">
              Download your resumes
            </p>
          </CardOption>
        </div>
      </main>
      <footer className="flex flex-1 flex-col items-center justify-center">
        <p className="text-xs text-slate-500">© 2024 e-CurricuLar</p>
      </footer>
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
