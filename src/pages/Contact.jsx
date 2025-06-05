import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Phone, Instagram, MessageCircle, Heart, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Contact = () => {
  const contactInfo = [
    {
      icon: MapPin,
      title: 'Localização',
      content: 'Bonfinópolis-MG',
      description: 'Atendemos toda a região com carinho',
      action: {
        text: 'Ver no Mapa',
        href: 'https://www.google.com/maps/search/Bonfinópolis+MG'
      }
    },
    {
      icon: Clock,
      title: 'Horário de Funcionamento',
      content: 'Segunda a Sábado',
      description: '8h às 18h',
      action: null
    },
    {
      icon: Phone,
      title: 'Telefone',
      content: '(34) 99999-9999',
      description: 'WhatsApp disponível',
      action: {
        text: 'Chamar no WhatsApp',
        href: 'https://wa.me/5534999999999'
      }
    },
    {
      icon: Mail,
      title: 'Email',
      content: 'contato@cidaboleira.com.br',
      description: 'Resposta em até 24h',
      action: {
        text: 'Enviar Email',
        href: 'mailto:contato@cidaboleira.com.br'
      }
    }
  ];

  const socialLinks = [
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      href: 'https://wa.me/5534999999999',
      color: 'from-green-500 to-green-600',
      description: 'Faça seu pedido agora'
    },
    {
      name: 'Instagram',
      icon: Instagram,
      href: 'https://instagram.com/cidaboleira',
      color: 'from-pink-500 to-purple-600',
      description: 'Siga nossas novidades'
    }
  ];

  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="py-20 gradient-bg">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center space-x-2 bg-rose-100 text-rose-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Heart className="h-4 w-4" />
              <span>Entre em Contato</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-script font-bold text-warm-900 mb-6">
              Vamos Conversar
              <span className="text-rose-600 block">Sobre Seus Sonhos</span>
            </h1>
            
            <p className="text-xl text-warm-700 max-w-3xl mx-auto leading-relaxed">
              Estamos aqui para tornar seus momentos especiais ainda mais doces. 
              Entre em contato conosco e vamos criar algo incrível juntos!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="text-center group"
              >
                <div className="bg-gradient-to-br from-rose-50 to-warm-50 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover-lift">
                  <div className="bg-gradient-to-br from-rose-100 to-warm-100 p-4 rounded-2xl w-fit mx-auto mb-6 group-hover:from-rose-200 group-hover:to-warm-200 transition-all duration-300">
                    <info.icon className="h-8 w-8 text-warm-600" />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-warm-900 mb-3">
                    {info.title}
                  </h3>
                  
                  <p className="text-lg font-medium text-warm-800 mb-2">
                    {info.content}
                  </p>
                  
                  <p className="text-sm text-warm-600 mb-6">
                    {info.description}
                  </p>
                  
                  {info.action && (
                    <Button
                      asChild
                      size="sm"
                      className="bg-gradient-to-r from-rose-500 to-warm-500 hover:from-rose-600 hover:to-warm-600 text-white"
                    >
                      <a
                        href={info.action.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {info.action.text}
                      </a>
                    </Button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Social Media Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-script font-bold text-warm-900 mb-8">
              Conecte-se Conosco
            </h2>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-2xl mx-auto">
              {socialLinks.map((social) => (
                <Button
                  key={social.name}
                  asChild
                  size="lg"
                  className={`bg-gradient-to-r ${social.color} hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex-1`}
                >
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-3 py-6"
                  >
                    <social.icon className="h-6 w-6" />
                    <div className="text-left">
                      <div className="font-semibold text-lg">{social.name}</div>
                      <div className="text-sm opacity-90">{social.description}</div>
                    </div>
                  </a>
                </Button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-gradient-to-br from-warm-50 to-rose-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-script font-bold text-warm-900 mb-6">
              Nossa Localização
            </h2>
            <p className="text-xl text-warm-700 max-w-2xl mx-auto">
              Estamos localizados no coração de Bonfinópolis-MG, 
              prontos para atender você com carinho e dedicação.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-4xl mx-auto"
          >
            <div className="relative h-96">
              <iframe
                src="https://www.openstreetmap.org/export/embed.html?bbox=-48.1729,-19.5729,-48.1529,-19.5529&layer=mapnik&marker=-19.5629,-48.1629"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localização da Cida Boleira em Bonfinópolis-MG"
              ></iframe>
              
              {/* Overlay with location info */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="bg-gradient-to-r from-rose-500 to-warm-500 p-3 rounded-xl">
                      <MapPin className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-warm-900 text-lg">Bonfinópolis-MG</h3>
                      <p className="text-warm-600">Atendemos toda a região</p>
                    </div>
                  </div>
                  
                  <Button
                    asChild
                    className="bg-gradient-to-r from-rose-500 to-warm-500 hover:from-rose-600 hover:to-warm-600 text-white"
                  >
                    <a
                      href="https://www.google.com/maps/search/Bonfinópolis+MG"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Abrir no Google Maps
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-warm-900 via-warm-800 to-rose-900 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl font-script font-bold mb-6">
              Pronto para Adoçar
              <span className="text-rose-300 block">Seu Próximo Evento?</span>
            </h2>
            
            <p className="text-xl text-cream-200 max-w-3xl mx-auto leading-relaxed mb-8">
              Não espere mais! Entre em contato conosco agora e vamos começar a planejar 
              o doce perfeito para tornar seu momento ainda mais especial.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild
                size="lg"
                variant="secondary"
                className="bg-white text-warm-800 hover:bg-cream-50 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <a href="/encomendas">
                  Fazer Encomenda Agora
                </a>
              </Button>
              
              <Button 
                asChild
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <a 
                  href="https://wa.me/5534999999999"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  WhatsApp Direto
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;