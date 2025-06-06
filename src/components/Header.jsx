import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Início', href: '/' },
    { name: 'Sobre', href: '/sobre' },
    { name: 'Serviços', href: '/servicos' },
    { name: 'Galeria', href: '/galeria' },
    { name: 'Encomendas', href: '/encomendas' },
    { name: 'Contato', href: '/contato' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${isScrolled ? 'glass-effect shadow-lg' : 'bg-transparent'}
        ${isMenuOpen ? 'h-full' : ''}
      `}
    >
      <nav className="relative container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="relative flex items-center justify-center">
              {/* Coração de fundo: maior e transparente */}
              <Heart fill='currentColor' stroke='none' className="absolute h-10 w-10 text-rose-500 opacity-20 group-hover:opacity-30 transition-opacity animate-pulse" />
              {/* Ícone principal: menor, em primeiro plano */}
              <Heart className="relative h-10 w-10 text-rose-500 group-hover:text-rose-600 transition-colors duration-200" />
            </div>
            <div>
              <span className="text-2xl font-script font-bold text-warm-800 group-hover:text-warm-900 transition-colors">
                Cida Boleira
              </span>
              <p className="text-xs text-warm-600 -mt-1">Confeitaria Artesanal</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`
                  relative px-3 py-2 text-sm font-medium transition-colors duration-200
                  ${isActive(item.href)
                    ? 'text-warm-800'
                    : 'text-warm-600 hover:text-warm-800'}
                `}
              >
                {item.name}
                {isActive(item.href) && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-rose-500 rounded-full"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* CTA Button (Desktop) */}
          <div className="hidden md:block">
            <Button
              asChild
              className="
                bg-gradient-to-r from-rose-500 to-warm-500
                hover:from-rose-600 hover:to-warm-600
                text-white shadow-lg hover:shadow-xl
                transition-all duration-300 hover-lift
              "
            >
              <Link to="/encomendas">Fazer Encomenda</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-warm-800 hover:text-warm-900 relative z-50"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden fixed inset-0 z-40"
            >
              {/* Backdrop: blurs background content only */}
              <div className="absolute inset-0 bg-white/30 backdrop-blur-md" />

              {/* Menu panel: solid container for links */}
              <div className="relative h-full overflow-auto flex flex-col items-center justify-center py-8 px-6">
                {navigation.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="w-full max-w-xs mb-4"
                  >
                    <Link
                      to={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`
                        block w-full text-center px-6 py-3 rounded-xl
                        text-lg font-medium transition-all duration-200
                        ${isActive(item.href)
                          ? 'bg-rose-100 text-rose-800'
                          : 'text-warm-700 hover:bg-warm-100 hover:text-warm-900'
                        }
                      `}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navigation.length * 0.05 }}
                  className="w-full max-w-xs pt-4 border-t border-warm-200 mt-4"
                >
                  <Button
                    asChild
                    className="w-full bg-gradient-to-r from-rose-500 to-warm-500 hover:from-rose-600 hover:to-warm-600 text-white"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Link to="/encomendas">Fazer Encomenda</Link>
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Header;
