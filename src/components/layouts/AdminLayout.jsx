
import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, CalendarDays, LayoutGrid, Settings, UserCircle, LogOut, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth'; // Corrected import
import { useSettings } from '@/contexts/SettingsContext';
import { motion } from 'framer-motion';

const AdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const { settings } = useSettings();

  const navItems = [
    { href: '/admin/dashboard', icon: Home, label: 'Dashboard' },
    { href: '/admin/bookings', icon: CalendarDays, label: 'Agendamentos' },
    { href: '/admin/projects', icon: LayoutGrid, label: 'Projetos' },
    { href: '/admin/settings', icon: Settings, label: 'Configurações' },
    { href: '/admin/profile', icon: UserCircle, label: 'Perfil' },
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login'); 
  };

  const sidebarVariants = {
    hidden: { x: -256, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.5, ease: "circOut" } }
  };

  const navItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <motion.aside 
      variants={sidebarVariants}
      initial="hidden"
      animate="visible"
      className="w-64 bg-brand-chocolate text-brand-cream p-6 flex flex-col justify-between min-h-screen shadow-2xl fixed left-0 top-0 bottom-0 z-40"
    >
      <div>
        <Link to="/admin/dashboard" className="block mb-10 text-center">
          {settings.logoUrl ? (
            <img  src={settings.logoUrl} alt={settings.siteName || "Cida Bolos Logo"} class="h-16 mx-auto mb-2"  src="https://images.unsplash.com/photo-1572177812156-58036aae439c" />
          ) : (
            <h1 className="text-3xl font-cursive text-brand-gold">{settings.siteName || "Cida Bolos"}</h1>
          )}
          <p className="text-sm text-brand-cream/70 font-sans">Painel Admin</p>
        </Link>
        <motion.nav variants={{ visible: { transition: { staggerChildren: 0.07 }}}}>
          <ul>
            {navItems.map((item) => (
              <motion.li key={item.href} variants={navItemVariants} className="mb-3">
                <Link
                  to={item.href}
                  className={`flex items-center p-3 rounded-lg transition-all duration-300 ease-in-out group ${
                    location.pathname === item.href || (item.href === '/admin/dashboard' && location.pathname === '/admin')
                      ? 'bg-brand-gold text-brand-chocolate font-semibold shadow-md scale-105'
                      : 'text-brand-cream hover:bg-brand-gold/20 hover:text-brand-gold hover:pl-4'
                  }`}
                >
                  <item.icon className="mr-3 h-5 w-5 transition-transform duration-300 group-hover:rotate-6" />
                  {item.label}
                </Link>
              </motion.li>
            ))}
          </ul>
        </motion.nav>
      </div>
      <div className="space-y-3">
        <Link to="/" target="_blank" rel="noopener noreferrer">
          <Button
            variant="ghost"
            className="w-full justify-start text-brand-cream hover:bg-brand-gold/20 hover:text-brand-gold group"
          >
            <ExternalLink className="mr-3 h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
            Ver Site Público
          </Button>
        </Link>
        <Button
          variant="ghost"
          onClick={handleLogout}
          className="w-full justify-start text-brand-cream hover:bg-brand-gold/20 hover:text-brand-gold group"
        >
          <LogOut className="mr-3 h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
          Sair
        </Button>
      </div>
    </motion.aside>
  );
};

const AdminHeader = () => {
  const { user } = useAuth();
  const headerVariants = {
    hidden: { y: -60, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.4, ease: "easeOut" } }
  };
  return (
    <motion.header 
      variants={headerVariants}
      initial="hidden"
      animate="visible"
      className="bg-card shadow-md p-4 flex justify-end items-center border-b border-brand-gold/20 sticky top-0 z-30"
    >
      <p className="text-brand-chocolate font-sans">
        Bem-vindo(a), <span className="font-semibold text-brand-gold">{user?.fullName || user?.email || 'Admin'}</span>!
      </p>
    </motion.header>
  );
};


const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      <div className="flex-1 flex flex-col ml-64"> {/* Add ml-64 to offset sidebar */}
        <AdminHeader />
        <main className="flex-grow p-6 md:p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
