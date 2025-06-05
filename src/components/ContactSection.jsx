import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Phone, Instagram, MessageCircle, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ContactSection = () => {
  const contactInfo = [
    {
      icon: MapPin,
      title: 'Localização',
      content: 'Bonfinópolis-MG',
      description: 'Atendemos toda a região'
    },
    {
      icon: Clock,
      title: 'Horário de Funcionamento',
      content: 'Segunda a Sábado',
      description: '8h às 18h'
    },
    {
      icon: Phone,
      title: 'Telefone',
      content: '(38) 99981-0506',
      description: 'WhatsApp disponível'
    }
  ];

  const socialLinks = [
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      href: 'https://wa.me/38999810506',
      color: 'from-green-500 to-green-600',
      description: 'Faça seu pedido'
    },
    {
      name: 'Instagram',
      icon: Instagram,
      href: 'https://instagram.com/cidinha_boleira',
      color: 'from-pink-500 to-purple-600',
      description: 'Siga-nos'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-warm-900 via-warm-800 to-rose-900 text-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 bg-white/10 text-cream-100 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Heart className="h-4 w-4" />
            <span>Entre em Contato</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-script font-bold mb-6">
            Vamos Criar Algo
            <span className="text-rose-300 block">Especial Juntos</span>
          </h2>
          
          <p className="text-xl text-cream-200 max-w-3xl mx-auto leading-relaxed">
            Estamos prontos para tornar seus momentos ainda mais doces. 
            Entre em contato e vamos conversar sobre sua próxima encomenda!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Contact Details */}
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="flex items-start space-x-4 group"
                >
                  <div className="bg-white/10 p-3 rounded-xl group-hover:bg-white/20 transition-all duration-300">
                    <info.icon className="h-6 w-6 text-rose-300" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-cream-100 mb-1">{info.title}</h3>
                    <p className="text-lg text-white font-medium">{info.content}</p>
                    <p className="text-sm text-cream-300">{info.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="space-y-4"
            >
              <h3 className="text-xl font-semibold text-cream-100 mb-4">
                Conecte-se Conosco
              </h3>
              <div className="flex flex-col sm:flex-row gap-4">
                {socialLinks.map((social) => (
                  <Button
                    key={social.name}
                    asChild
                    className={`bg-gradient-to-r ${social.color} p-7 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl`}
                  >
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3"
                    >
                      <social.icon className="h-5 w-5" />
                      <div className="text-left">
                        <div className="font-medium">{social.name}</div>
                        <div className="text-xs opacity-90">{social.description}</div>
                      </div>
                    </a>
                  </Button>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Map Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
              <h3 className="text-2xl font-script font-bold text-cream-100 mb-6 text-center">
                Nossa Localização
              </h3>
              
              {/* Map Container */}
              <div className="relative bg-white/5 rounded-2xl overflow-hidden h-80 mb-6">
                <iframe
                  src="https://www.openstreetmap.org/export/embed.html?bbox=-48.1729,-19.5729,-48.1529,-19.5529&layer=mapnik&marker=-19.5629,-48.1629"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Localização da Cida Boleira em Bonfinópolis-MG"
                  className="rounded-2xl"
                ></iframe>
                
                {/* Overlay with location info */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl p-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-gradient-to-r from-rose-500 to-warm-500 p-2 rounded-lg">
                      <MapPin className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-warm-900">Bonfinópolis-MG</p>
                      <p className="text-sm text-warm-600">Atendemos toda a região</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <p className="text-cream-200 mb-4">
                  Estamos localizados no coração de Bonfinópolis-MG, 
                  prontos para atender você com carinho e dedicação.
                </p>
                <Button
                  asChild
                  variant="secondary"
                  className="bg-white text-warm-800 hover:bg-cream-50"
                >
                  <a
                    href="https://www.google.com/maps/search/Bonfinópolis+MG"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ver no Google Maps
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;