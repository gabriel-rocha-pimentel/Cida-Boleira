import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import servicesData from '@/data/services.json';

const ServicesSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-warm-50 to-cream-100">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 bg-rose-100 text-rose-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Star className="h-4 w-4 fill-current" />
            <span>Nossos Serviços</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-script font-bold text-warm-900 mb-6">
            Doces Especiais para
            <span className="text-rose-600 block">Momentos Únicos</span>
          </h2>
          
          <p className="text-xl text-warm-700 max-w-3xl mx-auto leading-relaxed">
            Criamos doces artesanais personalizados para tornar seus momentos ainda mais especiais. 
            Cada produto é único e feito sob medida para você.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {servicesData.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group"
            >
              <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden hover-lift">
                {/* Image */}
                <div className="relative overflow-hidden">
                  <img  
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    alt={`${service.title} - Cidinha Boleira`}
                   src={service.imageKey} />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Price Badge */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-warm-800 px-3 py-1 rounded-full text-sm font-semibold">
                    {service.priceRange}
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <h3 className="text-2xl font-script font-bold text-warm-900 mb-3 group-hover:text-rose-600 transition-colors">
                    {service.title}
                  </h3>
                  
                  <p className="text-warm-700 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-2 mb-6">
                    {service.features?.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-rose-400 rounded-full"></div>
                        <span className="text-sm text-warm-600">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <Button
                    asChild
                    className="w-full bg-gradient-to-r from-rose-500 to-warm-500 hover:from-rose-600 hover:to-warm-600 text-white group/btn"
                  >
                    <a 
                      href={`https://wa.me/38999810506?text=${encodeURIComponent(service.whatsappMessage)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center"
                    >
                      Solicitar Orçamento
                      <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-rose-500 to-warm-500 rounded-3xl p-8 md:p-12 text-white">
            <h3 className="text-3xl md:text-4xl font-script font-bold mb-4">
              Tem uma ideia especial?
            </h3>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Criamos doces personalizados para qualquer ocasião. 
              Entre em contato e vamos tornar sua ideia realidade!
            </p>
            <Button 
              asChild
              size="lg"
              variant="secondary"
              className="bg-white text-warm-800 hover:bg-cream-50 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Link to="/encomendas" className="flex items-center">
                Fazer Encomenda Personalizada
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;