
import React from 'react';
import { Phone } from 'lucide-react';
import { useSettings } from '@/contexts/SettingsContext';
import { motion } from 'framer-motion';

const ButtonWhatsApp = () => {
  const { settings } = useSettings();
  const whatsappMessage = encodeURIComponent("Olá Cida, gostaria de encomendar um bolo!");

  return (
    <motion.a
      href={`https://api.whatsapp.com/send?phone=${settings.whatsappNumber.replace(/\D/g, '')}&text=${whatsappMessage}`}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-button-fixed"
      aria-label="Pedir pelo WhatsApp"
      initial={{ scale: 0, opacity: 0, y: 50 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1, type: "spring", stiffness: 120 }}
      whileHover={{ scale: 1.1, rotate: 5 }}
      whileTap={{ scale: 0.9 }}
    >
      <Phone size={28} />
    </motion.a>
  );
};

export default ButtonWhatsApp;
