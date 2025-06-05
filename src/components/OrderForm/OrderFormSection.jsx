import React from 'react';
import { motion } from 'framer-motion';
import { Send, Heart, Calendar, Users, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const OrderFormSection = ({ formData, handleInputChange, handleSubmit, eventTypes, productTypes }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-gradient-to-br from-rose-50 to-warm-50 rounded-3xl p-8 md:p-12 shadow-xl"
    >
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Personal Information */}
        <div>
          <h2 className="text-2xl font-script font-bold text-warm-900 mb-6 flex items-center">
            <Users className="h-6 w-6 mr-3 text-rose-500" />
            Informações Pessoais
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-warm-800 mb-2">
                Nome Completo *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-warm-200 focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-200"
                placeholder="Seu nome completo"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-warm-800 mb-2">
                Telefone/WhatsApp *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-warm-200 focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-200"
                placeholder="(34) 99999-9999"
                required
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-warm-800 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-warm-200 focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-200"
                placeholder="seu@email.com"
              />
            </div>
          </div>
        </div>

        {/* Event Information */}
        <div>
          <h2 className="text-2xl font-script font-bold text-warm-900 mb-6 flex items-center">
            <Calendar className="h-6 w-6 mr-3 text-rose-500" />
            Informações do Evento
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-warm-800 mb-2">
                Tipo de Evento *
              </label>
              <select
                name="eventType"
                value={formData.eventType}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-warm-200 focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-200"
                required
              >
                <option value="">Selecione o tipo de evento</option>
                {eventTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-warm-800 mb-2">
                Data do Evento
              </label>
              <input
                type="date"
                name="eventDate"
                value={formData.eventDate}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-warm-200 focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-warm-800 mb-2">
                Número de Convidados
              </label>
              <input
                type="number"
                name="guestCount"
                value={formData.guestCount}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-warm-200 focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-200"
                placeholder="Ex: 50"
              />
            </div>
          </div>
        </div>

        {/* Product Information */}
        <div>
          <h2 className="text-2xl font-script font-bold text-warm-900 mb-6 flex items-center">
            <Heart className="h-6 w-6 mr-3 text-rose-500" />
            Detalhes do Produto
          </h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-warm-800 mb-2">
                Tipo de Produto *
              </label>
              <select
                name="productType"
                value={formData.productType}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-warm-200 focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-200"
                required
              >
                <option value="">Selecione o tipo de produto</option>
                {productTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-warm-800 mb-2">
                Descrição Detalhada
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-warm-200 focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-200"
                placeholder="Descreva como você imagina seu doce: sabores, cores, decoração, tema, etc."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-warm-800 mb-2">
                Orçamento Estimado
              </label>
              <input
                type="text"
                name="budget"
                value={formData.budget}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-warm-200 focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-200"
                placeholder="Ex: R$ 200,00 ou Entre R$ 150,00 e R$ 300,00"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-warm-800 mb-2">
                Informações Adicionais
              </label>
              <textarea
                name="additionalInfo"
                value={formData.additionalInfo}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-warm-200 focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-200"
                placeholder="Alguma informação especial, restrições alimentares, preferências, etc."
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center pt-6">
          <Button
            type="submit"
            size="lg"
            className="bg-gradient-to-r from-rose-500 to-warm-500 hover:from-rose-600 hover:to-warm-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover-lift group px-12 py-4"
          >
            <MessageCircle className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform" />
            Enviar Encomenda via WhatsApp
            <Send className="h-5 w-5 ml-3 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <p className="text-sm text-warm-600 mt-4">
            Ao clicar, você será redirecionado para o WhatsApp com sua encomenda preenchida
          </p>
        </div>
      </form>
    </motion.div>
  );
};

export default OrderFormSection;