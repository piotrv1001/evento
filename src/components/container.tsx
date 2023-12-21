export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-7xl mx-auto bg-white/[2%] min-h-screen flex flex-col">
      {children}
    </div>
  );
}
