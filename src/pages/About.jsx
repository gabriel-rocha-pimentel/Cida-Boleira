import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Award, Users, Clock, Star, Quote } from 'lucide-react';
import aboutData from '@/data/about.json';

const About = () => {
  const achievements = [
    {
      icon: Clock,
      number: '+6',
      label: 'Anos de Experiência'
    },
    {
      icon: Users,
      number: '100+',
      label: 'Clientes Satisfeitos'
    },
    {
      icon: Award,
      number: '100%',
      label: 'Artesanal'
    },
    {
      icon: Heart,
      number: '∞',
      label: 'Amor em Cada Doce'
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
              <span>Nossa História</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-script font-bold text-warm-900 mb-6">
              Conheça a
              <span className="text-rose-600 block">Cida Boleira</span>
            </h1>
            
            <p className="text-xl text-warm-700 max-w-3xl mx-auto leading-relaxed">
              Uma história de paixão, tradição e muito amor pela confeitaria artesanal
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Story Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-rose-200 to-warm-200 rounded-3xl transform rotate-3"></div>
                <div className="relative bg-white rounded-3xl shadow-2xl p-6 hover-lift">
                  <img  
                    className="w-full h-96 object-cover rounded-2xl"
                    alt="Cida Boleira em sua confeitaria"
                   src="https://images.unsplash.com/photo-1575831315238-dfe02ecedf26" />
                </div>
                
                <motion.div
                  animate={{ y: [-5, 5, -5] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-6 -right-6 bg-gradient-to-r from-rose-400 to-warm-400 text-white p-4 rounded-2xl shadow-lg"
                >
                  <Heart className="h-8 w-8" />
                </motion.div>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h2 className="text-4xl font-script font-bold text-warm-900 mb-6">
                {aboutData.name}
              </h2>
              
              <div className="prose prose-lg text-warm-700 space-y-4">
                {aboutData.biography.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Quote */}
              <div className="bg-gradient-to-r from-rose-50 to-warm-50 rounded-2xl p-6 border-l-4 border-rose-400 mt-8">
                <Quote className="h-8 w-8 text-rose-400 mb-4" />
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
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20 bg-gradient-to-br from-warm-50 to-rose-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-script font-bold text-warm-900 mb-6">
              Nossa Trajetória em Números
            </h2>
            <p className="text-xl text-warm-700 max-w-2xl mx-auto">
              Cada número representa momentos especiais que ajudamos a criar
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="text-center group"
              >
                <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover-lift">
                  <div className="bg-gradient-to-br from-rose-100 to-warm-100 p-4 rounded-2xl w-fit mx-auto mb-4 group-hover:from-rose-200 group-hover:to-warm-200 transition-all duration-300">
                    <achievement.icon className="h-8 w-8 text-warm-600" />
                  </div>
                  <div className="text-4xl font-bold text-warm-900 mb-2">
                    {achievement.number}
                  </div>
                  <div className="text-warm-600 font-medium">
                    {achievement.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center space-x-2 bg-rose-100 text-rose-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Star className="h-4 w-4 fill-current" />
              <span>Depoimentos</span>
            </div>
            
            <h2 className="text-4xl font-script font-bold text-warm-900 mb-6">
              O Que Nossos Clientes Dizem
            </h2>
            
            <p className="text-xl text-warm-700 max-w-2xl mx-auto">
              Nada nos deixa mais felizes que o carinho dos nossos clientes
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {aboutData.testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-gradient-to-br from-rose-50 to-warm-50 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover-lift"
              >
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <Quote className="h-6 w-6 text-rose-400 mb-4" />
                
                <p className="text-warm-700 mb-6 leading-relaxed italic">
                  "{testimonial.text}"
                </p>
                
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-rose-400 to-warm-400 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-warm-800">{testimonial.name}</p>
                    <p className="text-sm text-warm-600">Cliente</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;