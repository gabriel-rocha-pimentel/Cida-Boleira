import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23dc7f37' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center space-x-2 bg-rose-100 text-rose-800 px-4 py-2 rounded-full text-sm font-medium mb-6"
            >
              <Star className="h-4 w-4 fill-current" />
              <span>Mais de 6 anos de tradição</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-5xl md:text-6xl lg:text-7xl font-script font-bold text-warm-900 mb-6 leading-tight text-shadow"
            >
              Doces que
              <span className="text-rose-600 block">
                Encantam
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-xl text-warm-700 mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0"
            >
              Confeitaria artesanal em Bonfinópolis-MG. Cada doce é uma obra de arte 
              feita com amor, carinho e os melhores ingredientes.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button 
                asChild
                size="lg"
                className="bg-gradient-to-r from-rose-500 to-warm-500 hover:from-rose-600 hover:to-warm-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover-lift group"
              >
                <Link to="/encomendas" className="flex items-center">
                  Fazer Encomenda
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              
              <Button 
                asChild
                variant="outline"
                size="lg"
                className="border-2 border-warm-600 text-warm-700 hover:bg-warm-600 hover:text-white transition-all duration-300"
              >
                <Link to="/galeria">
                  Ver Galeria
                </Link>
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="flex items-center justify-center lg:justify-start space-x-8 mt-12"
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-warm-800">+100</div>
                <div className="text-sm text-warm-600">Clientes Felizes</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-warm-800">+6</div>
                <div className="text-sm text-warm-600">Anos de Experiência</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-warm-800">100%</div>
                <div className="text-sm text-warm-600">Artesanal</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="relative">
              {/* Decorative Elements */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-rose-400 to-warm-400 rounded-full opacity-20"
              ></motion.div>
              
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-br from-warm-400 to-rose-400 rounded-full opacity-30"
              ></motion.div>

              {/* Main Image Container */}
              <div className="relative bg-white rounded-3xl shadow-2xl p-8 hover-lift">
                <img  
                  className="w-full h-96 object-cover rounded-2xl"
                  alt="Bolo artesanal decorado da Cida Boleira"
                 src="https://images.unsplash.com/photo-1557803056-4acbacad87d2" />
                
                {/* Floating Badge */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.2 }}
                  className="absolute -top-4 -left-4 bg-gradient-to-r from-rose-500 to-warm-500 text-white p-4 rounded-2xl shadow-lg"
                >
                  <Heart className="h-6 w-6" />
                </motion.div>

                {/* Quality Badge */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.4 }}
                  className="absolute -bottom-4 -right-4 bg-white text-warm-800 px-4 py-2 rounded-xl shadow-lg border-2 border-warm-200"
                >
                  <div className="text-xs font-semibold">100% Artesanal</div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-warm-400 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-warm-400 rounded-full mt-2"
          ></motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;