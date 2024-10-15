import { NavLink } from 'react-router-dom';
import { Home, Users, User, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  onClose: () => void;
}

export default function Sidebar({ onClose }: SidebarProps) {
  return (
    <aside className="w-64 h-full bg-gray-100 bg-opacity-80 backdrop-blur-lg">
      <div className="p-4 flex justify-between md:justify-center items-center w-full">
        <h2 className="text-xl font-bold md:hidden block text-left">ShaQ D|D|</h2>
        <div className="lg:flex items-center space-x-4 md:block hidden">
        <img src="/logo.svg" alt="ShaQ D|D" className="h-24" />
      </div>
        <Button variant="ghost" size="icon" onClick={onClose} className="md:hidden flex justify-center items-center">
          <X className="h-4 w-4" />
        </Button>
      </div>
      <nav className="mt-4 mx-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center px-4 py-2 text-sm rounded-md ${
              isActive ? 'bg-red-100 text-red-600' : 'text-gray-600 hover:bg-gray-100'
            }`
          }
        >
          <Home className="mr-3 h-5 w-5" />
          Home
        </NavLink>
        <NavLink
          to="/permanent-staff"
          className={({ isActive }) =>
            `flex items-center px-4 py-2 text-sm rounded-md ${
              isActive ? 'bg-red-100 text-red-600' : 'text-gray-600 hover:bg-gray-100'
            }`
          }
        >
          <Users className="mr-3 h-5 w-5" />
          Permanent Staff
        </NavLink>
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `flex items-center px-4 py-2 text-sm rounded-md ${
              isActive ? 'bg-red-100 text-red-600' : 'text-gray-600 hover:bg-gray-100'
            }`
          }
        >
          <User className="mr-3 h-5 w-5" />
          Logout
        </NavLink>
      </nav>
    </aside>
  );
}