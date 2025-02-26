'use client'

import { Search } from "@mui/icons-material";
import { useEffect, useState } from "react";

export const SearchInput = () => {
  const examples = ["aluno1", "informática", "MIN"];

  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setPlaceholderIndex((prevIndex) => (prevIndex + 1) % examples.length);
    }, 2000);

    return () => clearInterval(intervalId);
  }, [examples.length]);

  return (
    <div>
      <form action={"/search"}>
        <div>
          <input
            type="text"
            placeholder={`ex.: ${examples[placeholderIndex]}`}
            className="w-64 lg:w-96 px-5 py-2 border-2 outline-none border-slate-300 dark:border-gray-600 border-r-0 rounded-l rounded-bl"
          />
          <button
            type="submit"
            className="px-5 py-2 max-h-[43.2px] dark:max-h-[42px] text-slate-500 border-2 border-slate-300 dark:border-gray-600 dark:border-[1px] rounded-r rounded-br"
          >
            <Search />
          </button>
        </div>
      </form>
    </div>
  );
};
