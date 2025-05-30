import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Phone, Heart, Cake, Sparkles, ChevronRight } from 'lucide-react';
import { useSettings } from '@/contexts/SettingsContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const AboutPage = () => {
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
  
  const whatsappMessage = encodeURIComponent("Olá Cida, adorei sua história e gostaria de saber mais sobre seus bolos!");
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
        <h1 className="text-5xl md:text-6xl font-cursive text-brand-gold">Sobre a Cida Boleira</h1>
        <p className="text-lg text-brand-chocolate font-sans mt-4 max-w-xl mx-auto">
          Conheça a paixão e a arte por trás de cada bolo delicioso.
        </p>
      </motion.section>

      <motion.div 
        variants={itemVariants}
        className="container mx-auto px-4 grid md:grid-cols-2 gap-10 md:gap-16 items-center"
      >
        <div className="relative aspect-square rounded-3xl overflow-hidden shadow-xl group border-2 border-brand-gold/30">
          <img   
            class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-in-out" 
            alt="Cida Rocha sorrindo com um bolo decorado elegante"
           src="https://images.unsplash.com/photo-1676407784599-b611895a60c1" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-chocolate/40 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300"></div>
          <Heart className="absolute bottom-6 right-6 text-brand-cream h-12 w-12 opacity-80 drop-shadow-lg transform group-hover:scale-125 transition-transform duration-300 fill-brand-burnt-orange/70 stroke-brand-cream" />
        </div>
        
        <div className="font-sans text-brand-chocolate space-y-6">
          <h2 className="text-4xl font-cursive text-brand-gold">Uma Doce Jornada</h2>
          <p className="text-lg leading-relaxed">
            Olá! Sou a Cida Rocha, a pessoa por trás de cada bolo que você vê aqui. Minha paixão pela confeitaria começou como um hobby, uma forma de levar alegria para minha família e amigos. Com o tempo, esse amor se transformou em profissão, e hoje tenho o prazer de criar bolos personalizados para os momentos mais especiais da vida dos meus clientes em Bonfinópolis de Minas.
          </p>
          <p className="leading-relaxed">
            Cada bolo é feito com ingredientes selecionados, muito carinho e atenção aos detalhes. Acredito que um bolo não é apenas uma sobremesa, mas uma peça central de celebração, capaz de despertar sorrisos e criar memórias inesquecíveis.
          </p>
          <div className="flex space-x-4 pt-4">
            <a href={`https://instagram.com/${settings.instagramHandle}`} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="border-brand-gold text-brand-chocolate hover:bg-brand-gold hover:text-brand-cream rounded-xl group">
                <Instagram className="mr-2 h-5 w-5" /> Siga no Instagram
              </Button>
            </a>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <Button className="bg-green-600 hover:bg-green-700 text-white rounded-xl group">
                <Phone className="mr-2 h-5 w-5" /> Fale Comigo
              </Button>
            </a>
          </div>
        </div>
      </motion.div>

      <motion.section variants={itemVariants} className="container mx-auto px-4 py-12 md:py-16 glassmorphism-card">
        <h2 className="text-4xl font-cursive text-brand-gold text-center mb-12">Nosso Processo Criativo</h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="p-6">
            <Cake size={48} className="mx-auto text-brand-gold mb-4" />
            <h3 className="text-2xl font-cursive text-brand-gold mb-2">1. Ideia e Sabor</h3>
            <p className="font-sans text-brand-chocolate/90">Conversamos sobre sua visão, tema da festa e sabores preferidos para criar um conceito único.</p>
          </div>
          <div className="p-6">
            <Sparkles size={48} className="mx-auto text-brand-gold mb-4" />
            <h3 className="text-2xl font-cursive text-brand-gold mb-2">2. Mão na Massa</h3>
            <p className="font-sans text-brand-chocolate/90">Utilizamos ingredientes frescos e técnicas artesanais para assar e decorar seu bolo com perfeição.</p>
          </div>
          <div className="p-6">
            <Heart size={48} className="mx-auto text-brand-gold mb-4" />
            <h3 className="text-2xl font-cursive text-brand-gold mb-2">3. Entrega Especial</h3>
            <p className="font-sans text-brand-chocolate/90">Seu bolo é finalizado com todo cuidado e carinho, pronto para ser a estrela da sua comemoração.</p>
          </div>
        </div>
      </motion.section>

      <motion.section variants={itemVariants} className="text-center container mx-auto px-4">
        <h2 className="text-4xl font-cursive text-brand-gold mb-6">Pronto para Adoçar seu Evento?</h2>
        <p className="font-sans text-brand-chocolate text-lg mb-8 max-w-lg mx-auto">
          Será um prazer fazer parte do seu momento especial. Entre em contato e vamos criar o bolo dos seus sonhos!
        </p>
        <Link to="/contact">
          <Button size="lg" className="cta-button text-xl px-10 py-6 group">
            Fazer um Orçamento
            <ChevronRight className="ml-3 h-6 w-6 group-hover:animate-bounce" />
          </Button>
        </Link>
      </motion.section>

    </motion.div>
  );
};

export default AboutPage;