export const CardOption = ({
  children,
  redirect,
}: {
  children: React.ReactNode;
  redirect: string;
}) => {
  return (
    <a href={redirect}>
      <div className="flex flex-col min-w-60 min-h-28 max-w-[300px] px-5 py-2 rounded-md hover:scale-[1.02] text-[#003c73] border-[#003c73] transition-all border-2 gap-3">
        {children}
      </div>
    </a>
  );
};
