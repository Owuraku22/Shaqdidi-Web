import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Header from './header';
import Sidebar from './sidebar';

export default function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation()
  const [title, setTitle] = useState('');

  const routes = [
    { path: '/', label: 'Home' },
    { path: '/permanent-staff', label: 'Permanent Staff' },
    { path: '/profile', label: 'Profile' },
  ];

 React.useEffect(() => {
    const route = routes.find((route) => location.pathname === route.path);
    if (route) {
      setTitle(route.label);
    } else {
      setTitle('');
    }
  }, [location.pathname]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen ">
      <div className="hidden md:block w-64 bg-white shadow-lg">
        <Sidebar onClose={() => {}} />
      </div>
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg md:hidden"
          >
            <Sidebar onClose={() => setIsSidebarOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header onMenuClick={toggleSidebar} title={title} />
        <main className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}