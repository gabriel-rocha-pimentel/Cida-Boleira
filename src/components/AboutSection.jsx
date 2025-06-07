import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Award, Users, Clock } from 'lucide-react';

const AboutSection = () => {
  const features = [
    {
      icon: Heart,
      title: 'Feito com Amor',
      description: 'Cada doce é preparado com carinho e dedicação especial'
    },
    {
      icon: Award,
      title: 'Qualidade Premium',
      description: 'Utilizamos apenas os melhores ingredientes selecionados'
    },
    {
      icon: Users,
      title: 'Tradição Familiar',
      description: 'Receitas passadas de geração em geração'
    },
    {
      icon: Clock,
      title: 'Sempre Frescos',
      description: 'Doces preparados diariamente para máxima qualidade'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-cream-50 to-rose-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative">
              {/* Background Decoration */}
              <div className="absolute inset-0 bg-gradient-to-br from-rose-200 to-warm-200 rounded-3xl transform rotate-3"></div>
              
              {/* Main Image */}
              <div className="relative bg-white rounded-3xl shadow-2xl p-6 hover-lift">
                <img  
                  className="w-full h-80 object-cover rounded-2xl"
                  alt="Cida Boleira preparando doces artesanais"
                 src="https://images.unsplash.com/photo-1572337055597-370df25ba6a9" />
              </div>

              {/* Floating Elements */}
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -right-6 bg-gradient-to-r from-rose-400 to-warm-400 text-white p-4 rounded-2xl shadow-lg"
              >
                <Heart className="h-8 w-8" />
              </motion.div>

              <motion.div
                animate={{ y: [5, -5, 5] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-4 -left-4 bg-white text-warm-800 px-6 py-3 rounded-xl shadow-lg border-2 border-warm-200"
              >
                <span className="font-script text-lg font-semibold">+6 Anos</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Header */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center space-x-2 bg-rose-100 text-rose-800 px-4 py-2 rounded-full text-sm font-medium mb-4"
              >
                <Heart className="h-4 w-4" />
                <span>Sobre a Cida Boleira</span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-4xl md:text-5xl font-script font-bold text-warm-900 mb-6"
              >
                Tradição e Sabor em Cada Doce
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-lg text-warm-700 leading-relaxed"
              >
                Há mais de uma década, a Cida Boleira tem sido sinônimo de qualidade e 
                tradição em Bonfinópolis-MG. Nossa paixão pela confeitaria artesanal 
                começou como um sonho familiar e hoje se tornou referência na região.
              </motion.p>
            </div>

            {/* Features Grid */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover-lift group"
                >
                  <div className="flex items-start space-x-4">
                    <div className="bg-gradient-to-br from-rose-100 to-warm-100 p-3 rounded-xl group-hover:from-rose-200 group-hover:to-warm-200 transition-all duration-300">
                      <feature.icon className="h-6 w-6 text-warm-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-warm-800 mb-2">{feature.title}</h3>
                      <p className="text-sm text-warm-600">{feature.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Quote */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="bg-gradient-to-r from-rose-50 to-warm-50 rounded-2xl p-6 border-l-4 border-rose-400"
            >
              <p className="text-warm-700 italic text-lg mb-4">
                "Cada doce que faço carrega um pedacinho do meu coração.
                Ver o sorriso dos meus clientes é a minha maior recompensa."
              </p>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-rose-400 to-warm-400 rounded-full flex items-center justify-center">
                  <span className="text-white font-script text-lg font-bold">C</span>
                </div>
                <div>
                  <p className="font-semibold text-warm-800">Cida</p>
                  <p className="text-sm text-warm-600">Confeiteira & Fundadora</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;