import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const OrderHero = () => {
  return (
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
            <span>Faça sua Encomenda</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-script font-bold text-warm-900 mb-6">
            Vamos Criar Algo
            <span className="text-rose-600 block">Especial Juntos</span>
          </h1>
          
          <p className="text-xl text-warm-700 max-w-3xl mx-auto leading-relaxed">
            Conte-nos sobre seu evento especial e criaremos o doce perfeito para tornar 
            esse momento ainda mais memorável e delicioso.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default OrderHero;