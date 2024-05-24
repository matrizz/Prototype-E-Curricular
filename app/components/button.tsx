"use client";

export const Button = ({
  children,
  onclick,
  classname,
}: {
  children: React.ReactNode;
  onclick?: () => void;
  classname?: string;
}) => {
  return (
    <button
      onClick={onclick}
      className={
        classname ||
        "bg-gray-50 hover:bg-gray-100 border-[1.5px] text-slate-800 font-bold py-2 px-4 rounded"
      }
    >
      {children}
    </button>
  );
};
