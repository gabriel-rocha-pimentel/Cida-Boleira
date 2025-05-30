import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Phone, Mail, MapPin } from 'lucide-react';
import { useSettings } from '@/contexts/SettingsContext';
import { motion } from 'framer-motion';

const Footer = () => {
  const { settings } = useSettings();
  const currentYear = new Date().getFullYear();

  const footerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <motion.footer 
      variants={footerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="bg-brand-chocolate text-brand-cream font-sans"
    >
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-cursive text-brand-gold mb-4">{settings.siteName || "Cida Bolos"}</h3>
            <p className="text-brand-cream/80 mb-4">
              Criando bolos deliciosos e personalizados para tornar seus momentos especiais inesquecíveis.
            </p>
            <div className="flex space-x-4">
              <a href={`https://instagram.com/${settings.instagramHandle}`} target="_blank" rel="noopener noreferrer" className="hover:text-brand-gold transition-colors" aria-label="Instagram">
                <Instagram size={24} />
              </a>
              <a href={`https://api.whatsapp.com/send?phone=${settings.whatsappNumber.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="hover:text-brand-gold transition-colors" aria-label="WhatsApp">
                <Phone size={24} />
              </a>
            </div>
          </div>

          <div>
            <p className="text-xl font-semibold text-brand-gold mb-4">Links Rápidos</p>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-brand-gold transition-colors">Início</Link></li>
              <li><Link to="/projects" className="hover:text-brand-gold transition-colors">Portfólio</Link></li>
              <li><Link to="/about" className="hover:text-brand-gold transition-colors">Sobre Mim</Link></li>
              <li><Link to="/contact" className="hover:text-brand-gold transition-colors">Contato & Agendamento</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-xl font-semibold text-brand-gold mb-4">Entre em Contato</p>
            <ul className="space-y-3">
              <li className="flex items-center">
                <MapPin size={20} className="mr-3 text-brand-gold" />
                <span>Bonfinópolis de Minas, MG</span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="mr-3 text-brand-gold" />
                <a href={`tel:${settings.whatsappNumber}`} className="hover:text-brand-gold transition-colors">{settings.whatsappNumber}</a>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="mr-3 text-brand-gold" />
                <a href={`mailto:${settings.contactEmail}`} className="hover:text-brand-gold transition-colors">{settings.contactEmail}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-brand-gold/30 pt-8 text-center">
          <p className="text-sm text-brand-cream/80">
            &copy; {currentYear} {settings.siteName || "Cida Bolos"}. Todos os direitos reservados.
          </p>
          <p className="text-xs text-brand-cream/60 mt-1">
            Feito com <span role="img" aria-label="coração">💖</span> por Hostinger Horizons
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;