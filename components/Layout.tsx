
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  title: string;
  onBack?: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, title, onBack }) => {
  return (
    <div className="min-h-screen flex flex-col items-center p-4 md:p-8 relative overflow-hidden">
      {/* Decorative background shapes */}
      <div className="absolute top-[-50px] left-[-50px] w-64 h-64 bg-blue-200 rounded-full blur-3xl opacity-30 pointer-events-none"></div>
      <div className="absolute bottom-[-50px] right-[-50px] w-64 h-64 bg-pink-200 rounded-full blur-3xl opacity-30 pointer-events-none"></div>
      
      <header className="w-full max-w-2xl flex items-center justify-between mb-8 z-10">
        <div className="flex items-center gap-4">
          {onBack && (
            <button 
              onClick={onBack}
              className="bg-white p-3 rounded-2xl shadow-sm hover:shadow-md transition-all active:scale-95 text-xl"
            >
              ⬅️
            </button>
          )}
          <h1 className="font-kids text-3xl md:text-4xl text-blue-600 drop-shadow-sm">{title}</h1>
        </div>
      </header>

      <main className="w-full max-w-2xl bg-white/80 backdrop-blur-md rounded-[3rem] p-6 md:p-10 shadow-xl border-4 border-white z-10">
        {children}
      </main>
    </div>
  );
};

export default Layout;
