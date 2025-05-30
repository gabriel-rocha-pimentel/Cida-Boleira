import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Instagram, Phone } from 'lucide-react';
import { useSettings } from '@/contexts/SettingsContext';
import { motion } from 'framer-motion';

const Header = () => {
  const { settings } = useSettings();

  const navItems = [
    { name: 'Início', path: '/' },
    { name: 'Portfólio', path: '/projects' },
    { name: 'Sobre Mim', path: '/about' },
    { name: 'Contato', path: '/contact' },
  ];

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-brand-cream/80 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-brand-gold/20"
    >
      <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center">
        <Link to="/" className="text-center sm:text-left mb-4 sm:mb-0">
          <h1 className="text-4xl font-cursive text-brand-gold hover:text-brand-chocolate transition-colors">
            {settings.siteName || "Cida Bolos"}
          </h1>
          <p className="text-sm text-brand-light-brown font-sans -mt-1">Bolos personalizados para festas</p>
        </Link>
        
        <nav className="flex flex-wrap justify-center sm:justify-end items-center space-x-3 sm:space-x-6 mb-4 sm:mb-0">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `font-sans font-medium pb-1 border-b-2 transition-colors duration-300
                ${isActive ? 'text-brand-gold border-brand-gold' : 'text-brand-chocolate border-transparent hover:text-brand-gold hover:border-brand-gold/50'}`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          <a
            href={`https://instagram.com/${settings.instagramHandle}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram de Cida Bolos"
            className="text-brand-gold hover:text-brand-chocolate transition-colors"
          >
            <Instagram size={28} />
          </a>
          <a
            href={`https://api.whatsapp.com/send?phone=${settings.whatsappNumber.replace(/\D/g, '')}&text=Olá%20Cida,%20gostaria%20de%20fazer%20um%20orçamento!`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp de Cida Bolos"
            className="text-brand-gold hover:text-brand-chocolate transition-colors"
          >
            <Phone size={28} />
          </a>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;