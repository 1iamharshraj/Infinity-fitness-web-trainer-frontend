import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';

export default function LogoutButton() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login', { replace: true });
  }

  return (
    <button
      onClick={handleLogout}
      className="
        group flex items-center !gap-6 
        bg-black/40 backdrop-blur-md 
        border border-red-900/30 hover:border-red-600 
        !px-8 !py-3 rounded-full 
        transition-all duration-300 
        hover:shadow-[0_0_20px_rgba(220,38,38,0.4)]
        active:scale-95
      "
    >
      <span className="text-white/60 text-xs font-bold tracking-[0.2em] group-hover:text-white transition-colors">
        LOGOUT
      </span>
      <div className="bg-red-600/10 p-1.5 rounded-full group-hover:bg-red-600 transition-colors">
        <LogOut className="w-4 h-4 text-red-500 group-hover:text-white transition-colors" />
      </div>
    </button>
  );
}
