export default function Loading() {
  return (
    <div className="min-h-screen bg-black text-[#F5F7FA] py-20 flex items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-10 h-10 border-2 border-[#147BFF] border-t-transparent rounded-full animate-spin" />
        <p className="text-xs uppercase tracking-widest text-[#9BA5B3]">Carregando notícia...</p>
      </div>
    </div>
  );
}
