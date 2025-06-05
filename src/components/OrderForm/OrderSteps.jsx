import React from 'react';
import { motion } from 'framer-motion';

const OrderSteps = () => {
  const steps = [
    {
      step: '1',
      title: 'Envie sua Encomenda',
      description: 'Preencha o formulário com todos os detalhes do seu evento e produto desejado.'
    },
    {
      step: '2',
      title: 'Conversamos no WhatsApp',
      description: 'Refinamos os detalhes, definimos preços e prazos através do WhatsApp.'
    },
    {
      step: '3',
      title: 'Criamos sua Obra de Arte',
      description: 'Preparamos seu doce com todo carinho e entregamos no prazo combinado.'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="mt-16"
    >
      <h2 className="text-3xl font-script font-bold text-warm-900 text-center mb-12">
        Como Funciona o Processo
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((item, index) => (
          <div key={index} className="text-center">
            <div className="bg-gradient-to-r from-rose-500 to-warm-500 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              {item.step}
            </div>
            <h3 className="text-xl font-semibold text-warm-900 mb-3">
              {item.title}
            </h3>
            <p className="text-warm-700">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default OrderSteps;