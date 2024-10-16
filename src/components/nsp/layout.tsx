import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Header from './header';
import Sidebar from './sidebar';
import { Icons } from '../icons/icons';

const menus = [
  {
      label: "Home",
      url: "/ps",
      icon: <Icons.Home className="mr-3 h-5 w-5" /> ,
  },
  {
      label: "Order History",
      url: "/ps/order-history",
      icon: <Icons.Time className="mr-3 h-5 w-5"/> ,
  },
  
]


const routes = [
  { path: '/nsp', label: 'Home' },
];

export default function Layout({isPs = false, routes}: {
  isPs?: boolean,
  routes: {
    path: string;
    label: string;
}[]
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation()
  const [title, setTitle] = useState('');


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
        {
          isPs ? (
            <>
              <div className="hidden md:block w-64 bg-white shadow-lg">
                <Sidebar onClose={() => {}} menus={menus} />
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
                    <Sidebar onClose={() => setIsSidebarOpen(false)} menus={menus}/>
                  </motion.div>
                )}
              </AnimatePresence>
          </>
          ) : null
        }
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header onMenuClick={toggleSidebar} title={title} />
        <main className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}