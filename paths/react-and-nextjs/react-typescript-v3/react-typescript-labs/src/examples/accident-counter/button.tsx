export const Button = ({ children, onClick }: { children: string; onClick?: () => void }) => {
  return (
    <button
      className="bg-primary-400 hover:bg-primary-500 rounded px-4 py-2 font-bold text-white"
      onClick={onClick}
    >
      {children}
    </button>
  );
};
