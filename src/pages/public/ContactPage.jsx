import React from 'react';
import BookingForm from '@/components/forms/BookingForm';
import { motion } from 'framer-motion';
import { Phone, Instagram, Mail, MapPin } from 'lucide-react';
import { useSettings } from '@/contexts/SettingsContext';
import { Button } from '@/components/ui/button';

const ContactPage = () => {
  const { settings } = useSettings();

  const pageVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const whatsappMessage = encodeURIComponent("Olá Cida, gostaria de fazer um orçamento para um bolo!");
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${settings.whatsappNumber.replace(/\D/g, '')}&text=${whatsappMessage}`;

  return (
    <motion.div 
      className="space-y-12 md:space-y-16 pb-16"
      initial="hidden"
      animate="visible"
      variants={pageVariants}
    >
      <motion.section 
        variants={itemVariants} 
        className="text-center py-12 md:py-16 bg-gradient-to-br from-brand-cream via-brand-gold/10 to-brand-cream rounded-3xl shadow-card-elegant border border-brand-gold/20"
      >
        <h1 className="text-5xl md:text-6xl font-cursive text-brand-gold">Entre em Contato</h1>
        <p className="text-lg text-brand-chocolate font-sans mt-4 max-w-xl mx-auto">
          Vamos conversar sobre o bolo perfeito para sua celebração! Agende seu pedido ou tire suas dúvidas.
        </p>
      </motion.section>

      <motion.div 
        variants={itemVariants}
        className="container mx-auto px-4 grid lg:grid-cols-2 gap-10 md:gap-16 items-start"
      >
        <div className="glassmorphism-card p-6 sm:p-10 space-y-8">
          <h2 className="text-4xl font-cursive text-brand-gold mb-6">Nossos Contatos</h2>
          
          <div className="space-y-6 font-sans">
            <div className="flex items-start">
              <MapPin size={28} className="mr-4 text-brand-gold mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold text-lg text-brand-chocolate">Atendimento Local</p>
                <p className="text-brand-chocolate/80">Bonfinópolis de Minas, MG</p>
                <p className="text-sm text-brand-light-brown">(Atendemos apenas encomendas locais)</p>
              </div>
            </div>

            <div className="flex items-start">
              <Phone size={28} className="mr-4 text-brand-gold mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold text-lg text-brand-chocolate">WhatsApp</p>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-brand-gold hover:underline hover:text-brand-burnt-orange transition-colors">
                  {settings.whatsappNumber}
                </a>
                <p className="text-sm text-brand-light-brown">(Clique para enviar mensagem)</p>
              </div>
            </div>

            <div className="flex items-start">
              <Instagram size={28} className="mr-4 text-brand-gold mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold text-lg text-brand-chocolate">Instagram</p>
                <a href={`https://instagram.com/${settings.instagramHandle}`} target="_blank" rel="noopener noreferrer" className="text-brand-gold hover:underline hover:text-brand-burnt-orange transition-colors">
                  @{settings.instagramHandle}
                </a>
                <p className="text-sm text-brand-light-brown">(Veja mais delícias e novidades)</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Mail size={28} className="mr-4 text-brand-gold mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold text-lg text-brand-chocolate">Email</p>
                <a href={`mailto:${settings.contactEmail}`} className="text-brand-gold hover:underline hover:text-brand-burnt-orange transition-colors">
                  {settings.contactEmail}
                </a>
              </div>
            </div>
          </div>
          
          <div className="pt-6 border-t border-brand-gold/30">
             <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="w-full">
                <Button size="lg" className="w-full bg-green-600 hover:bg-green-700 text-white text-lg group">
                    <Phone className="mr-3 h-6 w-6" /> Chamar no WhatsApp Agora
                </Button>
             </a>
          </div>
        </div>

        <div>
          <BookingForm detailed={true} />
        </div>
      </motion.div>

      <motion.section variants={itemVariants} className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-cursive text-brand-gold mb-4">Horário de Atendimento</h2>
        <p className="font-sans text-brand-chocolate text-lg mb-8 max-w-lg mx-auto">
          Pedidos e consultas preferencialmente em horário comercial. <br/>
          Finais de semana dedicados à produção das delícias!
        </p>
        <div className="aspect-w-16 aspect-h-9 rounded-2xl overflow-hidden shadow-card-elegant border border-brand-gold/20">
           <img   
            class="w-full h-full object-cover" 
            alt="Mesa de confeitaria elegante com utensílios e ingredientes para bolos finos"
            src="https://images.unsplash.com/photo-1621857426350-ddab819cf0cc" />
        </div>
      </motion.section>

    </motion.div>
  );
};

export default ContactPage;