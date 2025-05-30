import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ProjectCard from '@/components/shared/ProjectCard';
import BookingForm from '@/components/forms/BookingForm';
import { useProjects } from '@/hooks/useProjects';
import { motion } from 'framer-motion';
import { ChevronRight, Gift, CalendarHeart, Phone, Star } from 'lucide-react';
import { useSettings } from '@/contexts/SettingsContext';

const HomePage = () => {
  const { projects, loading: projectsLoading } = useProjects();
  const { settings } = useSettings();
  const featuredProjects = projects.slice(0, 3);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const whatsappMessage = encodeURIComponent("Olá Cida, gostaria de fazer um orçamento para um bolo personalizado!");
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${settings.whatsappNumber.replace(/\D/g, '')}&text=${whatsappMessage}`;

  return (
    <motion.div 
      className="space-y-16 md:space-y-24"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.section 
        variants={itemVariants}
        className="relative text-center py-20 md:py-32 rounded-3xl overflow-hidden bg-gradient-to-br from-brand-cream via-brand-gold/10 to-brand-cream shadow-card-elegant border border-brand-gold/20"
      >
        <div className="absolute inset-0 z-0 opacity-10">
          <img   
            class="w-full h-full object-cover" 
            alt="Fundo com textura sutil de confeitaria ou tecido elegante"
           src="https://images.unsplash.com/photo-1532071261683-00d37194502f" />
        </div>
        <div className="relative z-10 container mx-auto px-4">
          <motion.h1 
            className="text-5xl md:text-7xl font-cursive text-brand-gold mb-6 drop-shadow-sm"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2, type: "spring", stiffness: 100 }}
          >
            {settings.siteName || "Cida Bolos"}
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-brand-chocolate font-sans mb-10 max-w-2xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Bolos artesanais feitos com amor para adoçar seus momentos mais especiais.
          </motion.p>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="cta-button text-xl px-10 py-6 group">
                Peça pelo WhatsApp
                <Phone className="ml-3 h-6 w-6 group-hover:animate-bounce" />
              </Button>
            </a>
          </motion.div>
        </div>
      </motion.section>

      <motion.section variants={itemVariants}>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-4xl md:text-5xl font-cursive text-brand-gold">Bolos em Destaque</h2>
          <Link to="/projects">
            <Button variant="outline" className="text-brand-chocolate border-brand-gold hover:bg-brand-gold hover:text-brand-cream rounded-xl group">
              Ver Portfólio Completo
              <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
        {projectsLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1,2,3].map(i => (
              <div key={i} className="bg-brand-light-brown/30 h-96 rounded-2xl animate-pulse"></div>
            ))}
          </div>
        ) : featuredProjects.length > 0 ? (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={{ visible: { transition: { staggerChildren: 0.15 }}}}
          >
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </motion.div>
        ) : (
          <p className="text-center text-brand-chocolate/80 font-sans py-10">Nenhum projeto em destaque no momento. Confira nosso portfólio completo!</p>
        )}
      </motion.section>

      <motion.section variants={itemVariants} className="py-16 glassmorphism-card">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-cursive text-brand-gold mb-12">Como Encomendar Seu Bolo dos Sonhos</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <motion.div variants={itemVariants} className="flex flex-col items-center p-6">
              <div className="p-5 bg-brand-gold/20 rounded-full mb-6 inline-block shadow-md ring-2 ring-brand-gold/30">
                <Gift size={40} className="text-brand-gold" />
              </div>
              <h3 className="text-2xl font-cursive text-brand-gold mb-3">1. Inspire-se</h3>
              <p className="text-brand-chocolate/90 font-sans">Navegue em nosso portfólio ou traga sua ideia. Adoramos criar bolos únicos!</p>
            </motion.div>
            <motion.div variants={itemVariants} className="flex flex-col items-center p-6">
              <div className="p-5 bg-brand-gold/20 rounded-full mb-6 inline-block shadow-md ring-2 ring-brand-gold/30">
                <CalendarHeart size={40} className="text-brand-gold" />
              </div>
              <h3 className="text-2xl font-cursive text-brand-gold mb-3">2. Agende e Personalize</h3>
              <p className="text-brand-chocolate/90 font-sans">Use nosso formulário rápido ou chame no WhatsApp para definir data, sabores e detalhes.</p>
            </motion.div>
            <motion.div variants={itemVariants} className="flex flex-col items-center p-6">
              <div className="p-5 bg-brand-gold/20 rounded-full mb-6 inline-block shadow-md ring-2 ring-brand-gold/30">
                <Star size={40} className="text-brand-gold" />
              </div>
              <h3 className="text-2xl font-cursive text-brand-gold mb-3">3. Celebre!</h3>
              <p className="text-brand-chocolate/90 font-sans">Finalizaremos os detalhes e seu bolo estará pronto para adoçar sua festa!</p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <motion.section variants={itemVariants} className="pb-16">
        <div className="max-w-2xl mx-auto">
          <BookingForm />
        </div>
      </motion.section>
    </motion.div>
  );
};

export default HomePage;