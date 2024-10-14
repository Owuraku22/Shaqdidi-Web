import { NavLink } from 'react-router-dom';
import { Home, Users, User } from 'lucide-react';

export default function BottomNav() {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-2">
      <NavLink to="/" className="flex flex-col items-center text-xs">
        <Home className="h-6 w-6" />
        Home
      </NavLink>
      <NavLink to="/permanent-staff" className="flex flex-col items-center text-xs">
        <Users className="h-6 w-6" />
        Staff
      </NavLink>
      <NavLink to="/profile" className="flex flex-col items-center text-xs">
        <User className="h-6 w-6" />
        Profile
      </NavLink>
    </nav>
  );
}