import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Instagram, MessageCircle, MapPin, Clock, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'Instagram',
      icon: Instagram,
      href: 'https://instagram.com/cidinha_boleira',
      color: 'hover:text-pink-500'
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      href: 'https://wa.me/5538999810506',
      color: 'hover:text-green-500'
    }
  ];

  const quickLinks = [
    { name: 'Início', href: '/' },
    { name: 'Sobre', href: '/sobre' },
    { name: 'Serviços', href: '/servicos' },
    { name: 'Galeria', href: '/galeria' },
    { name: 'Encomendas', href: '/encomendas' },
    { name: 'Contato', href: '/contato' }
  ];

  return (
    <footer className="bg-gradient-to-br from-warm-900 via-warm-800 to-rose-900 text-cream-50">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="relative">
                <Heart className="h-10 w-10 text-rose-400" />
                <div className="absolute inset-0 bg-rose-400 rounded-full opacity-20 animate-pulse"></div>
              </div>
              <div>
                <span className="text-3xl font-script font-bold text-cream-50">
                  Cida Boleira
                </span>
                <p className="text-cream-200 text-sm -mt-1">Confeitaria Artesanal</p>
              </div>
            </div>
            
            <p className="text-cream-200 mb-6 leading-relaxed max-w-md">
              Há mais de 3 anos criando momentos doces e especiais em Bonfinópolis-MG. 
              Cada doce é feito com amor, carinho e os melhores ingredientes.
            </p>

            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 bg-white/10 rounded-full transition-all duration-300 hover:bg-white/20 ${social.color}`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="h-5 w-5" />
                  <span className="sr-only">{social.name}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="text-lg font-semibold text-cream-50 mb-6 block">
              Links Rápidos
            </span>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-cream-200 hover:text-cream-50 transition-colors duration-200 flex items-center group"
                  >
                    <span className="w-2 h-2 bg-rose-400 rounded-full mr-3 group-hover:bg-rose-300 transition-colors"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <span className="text-lg font-semibold text-cream-50 mb-6 block">
              Contato
            </span>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-rose-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-cream-200 text-sm">
                    Bonfinópolis-MG
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-rose-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-cream-200 text-sm">
                    (38) 99981-0506
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-rose-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-cream-200 text-sm">
                    Segunda a Sábado<br />
                    8h às 18h
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="border-t border-white/20 mt-12 pt-8 text-center"
        >
          <p className="text-cream-300 text-sm">
            © {currentYear} Cida Boleira. Todos os direitos reservados. 
            <span className="mx-2">•</span>
            Feito com <Heart className="inline h-4 w-4 text-rose-400 mx-1" /> por <a href='https://techconnect.app.br' target='_blank'>Tech&Connect</a>
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;