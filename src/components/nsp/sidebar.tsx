import React from 'react';
import { NavLink } from 'react-router-dom';
import { Sheet, SheetContent, SheetHeader } from '@/components/ui/sheet';

interface SidebarProps {
  onClose: () => void;
  menus: {
    label: string;
    url: string;
    icon: React.ReactNode;
  }[];
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ onClose, menus, isOpen }) => {
  return (
    <Sheet open={isOpen} onOpenChange={onClose} modal={false}>
      <SheetContent side="left" className="w-64 p-0">
        <SheetHeader className="p-4">
          {/* <SheetTitle className="flex items-center justify-between"> */}
            <img src="/logo.svg" alt="ShaQ D|D" className="h-32" />
            {/* <Button variant="ghost" size="icon" onClick={onClose} className="md:hidden">
              <X className="h-5 w-5" />
            </Button> */}
          {/* </SheetTitle> */}
        </SheetHeader>
        <nav className="space-y-2 p-4">
          {menus.map((item) => (
            <NavLink
              key={item.url}
              end
              to={item.url}
              className={({ isActive }) =>
                `flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-gray-600 hover:bg-gray-100'
                }`
              }
              onClick={onClose}
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default Sidebar;