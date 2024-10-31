import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './header';
import Sidebar from './sidebar';
import { Icons } from '../icons/icons';

const menus = [
  {
    label: "Home",
    url: "/ps",
    icon: <Icons.Home className="mr-3 h-5 w-5" />,
  },
  {
    label: "Order History",
    url: "/ps/order-history",
    icon: <Icons.Time className="mr-3 h-5 w-5"/>,
  },
];

interface LayoutProps {
  isPs?: boolean;
  routes: {
    path: string;
    label: string;
  }[];
}

export default function Layout({ isPs = false, routes }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const [title, setTitle] = useState('');

  useEffect(() => {
    const route = routes.find((route) => location.pathname === route.path);
    if (route) {
      setTitle(route.label);
    } else {
      setTitle('');
    }
  }, [location.pathname, routes]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen">
      {isPs && (
        <>
          <div className="hidden md:block w-64 bg-white shadow-lg">
            <Sidebar onClose={() => {}} menus={menus} isOpen={isSidebarOpen}  />
          </div>
          <Sidebar onClose={() => setIsSidebarOpen(false)} menus={menus} isOpen={true} />
        </>
      )}
      <div className="flex flex-col flex-1 overflow-hidden bg-white">
        <Header onMenuClick={toggleSidebar} title={title} psShowLogo={isPs} />
        <main className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}