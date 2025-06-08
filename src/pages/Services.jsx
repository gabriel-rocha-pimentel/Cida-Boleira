import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Heart, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import servicesData from '@/data/services.json';

const Services = () => {
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
              <Star className="h-4 w-4 fill-current" />
              <span>Nossos Serviços</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-script font-bold text-warm-900 mb-6">
              Doces Especiais para
              <span className="text-rose-600 block">Cada Ocasião</span>
            </h1>
            
            <p className="text-xl text-warm-700 max-w-3xl mx-auto leading-relaxed">
              Criamos doces artesanais únicos e personalizados para tornar seus momentos ainda mais especiais. 
              Cada produto é feito com amor, carinho e os melhores ingredientes.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="space-y-20">
            {servicesData.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${
                  index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                }`}
              >
                {/* Image */}
                <div className={`relative ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-rose-200 to-warm-200 rounded-3xl transform rotate-3"></div>
                    <div className="relative bg-white rounded-3xl shadow-2xl p-6 hover-lift">
                      <img  
                        className="w-full h-80 object-cover rounded-2xl"
                        alt={`${service.title} - Cidinha Boleira`}
                       src="https://mdbszxytezrlgngqigll.supabase.co/storage/v1/object/public/projects-image/bolos_04.jpg" />
                    </div>
                    
                    {/* Price Badge */}
                    <motion.div
                      animate={{ y: [-5, 5, -5] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute -top-6 -right-6 bg-gradient-to-r from-rose-400 to-warm-400 text-white px-6 py-3 rounded-2xl shadow-lg"
                    >
                      <span className="font-bold">{service.priceRange}</span>
                    </motion.div>
                  </div>
                </div>

                {/* Content */}
                <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                  <div>
                    <div className="inline-flex items-center space-x-2 bg-rose-100 text-rose-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
                      <Heart className="h-4 w-4" />
                      <span>Especialidade</span>
                    </div>
                    
                    <h2 className="text-4xl font-script font-bold text-warm-900 mb-4">
                      {service.title}
                    </h2>
                    
                    <p className="text-lg text-warm-700 leading-relaxed mb-6">
                      {service.description}
                    </p>
                  </div>

                  {/* Features */}
                  {service.features && (
                    <div className="space-y-3">
                      <h3 className="text-xl font-semibold text-warm-800 mb-4">
                        O que incluímos:
                      </h3>
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-3">
                          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                          <span className="text-warm-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Highlights */}
                  <div className="bg-gradient-to-r from-rose-50 to-warm-50 rounded-2xl p-6 border-l-4 border-rose-400">
                    <h4 className="font-semibold text-warm-800 mb-2">Destaque Especial</h4>
                    <p className="text-warm-700">
                      {service.id === 'bolos' && 'Personalizamos cada bolo de acordo com seu tema e preferências, criando uma obra de arte comestível única.'}
                      {service.id === 'ovos-pascoa' && 'Ovos artesanais com recheios exclusivos e decorações temáticas que encantam crianças e adultos.'}
                      {service.id === 'doces-especiais' && 'Criações únicas para eventos especiais, sempre adaptadas ao seu gosto e ocasião.'}
                    </p>
                  </div>

                  {/* CTA */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      asChild
                      size="lg"
                      className="bg-gradient-to-r from-rose-500 to-warm-500 hover:from-rose-600 hover:to-warm-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover-lift group"
                    >
                      <a 
                        href={`https://wa.me/38999810506?text=${encodeURIComponent(service.whatsappMessage)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center"
                      >
                        Solicitar Orçamento
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </a>
                    </Button>
                    
                    <Button
                      asChild
                      variant="outline"
                      size="lg"
                      className="border-2 border-warm-600 text-warm-700 hover:bg-warm-600 hover:text-white transition-all duration-300"
                    >
                      <a href="/galeria">
                        Ver Exemplos
                      </a>
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
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
              Tem uma Ideia Especial?
            </h2>
            
            <p className="text-xl text-cream-200 max-w-3xl mx-auto leading-relaxed mb-8">
              Criamos doces personalizados para qualquer ocasião especial. 
              Casamentos, aniversários, formaturas, ou qualquer momento que mereça ser celebrado com doçura.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild
                size="lg"
                variant="secondary"
                className="bg-white text-warm-800 hover:bg-cream-50 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <a href="/encomendas" className="flex items-center">
                  Fazer Encomenda Personalizada
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              
              <Button 
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-white text-warm-800 hover:bg-white hover:text-warm-800 transition-all duration-300"
              >
                <a href="/contato">
                  Falar Conosco
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services;