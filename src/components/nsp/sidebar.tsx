import { NavLink } from 'react-router-dom';
import { Home, Users, User, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Icons } from '../icons/icons';
import { useLocation } from 'react-router-dom';
import { memo } from 'react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  onClose: () => void;
  menus?: {
    label: string;
    url: string;
    icon: JSX.Element;
}[]
}



const Sidebar  = memo(({ onClose, menus }: SidebarProps) => {
  const location = useLocation()

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
        {
          menus?.map(menu => {
            return(
              <NavLink
                key={menu.label}
                to={menu.url}
                end
                className={({ isActive }) => {
                  console.log(isActive)
                  return cn('flex items-center px-4 py-2 text-sm rounded-md', {'bg-red-100 text-red-600': isActive, 'text-gray-600 hover:bg-gray-100': !isActive})
                }}>
                {menu.icon}
                {menu.label}
              </NavLink>
            )
          })
        }
        
      </nav>
    </aside>
  );
});


export default Sidebar;