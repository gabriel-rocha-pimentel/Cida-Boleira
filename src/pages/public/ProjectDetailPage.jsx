import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProjects } from '@/hooks/useProjects';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CalendarDays, Tag, Info, Loader2, ImageOff, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const ProjectDetailPage = () => {
  const { projectId } = useParams();
  const { projects, loading: projectsLoading } = useProjects();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!projectsLoading) {
      setProject(projects.find(p => p.id === projectId) || null);
      setLoading(false);
    }
  }, [projectId, projects, projectsLoading]);

  const pageVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2, ease: "easeOut" } }
  };

  if (loading || projectsLoading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <Loader2 className="h-16 w-16 text-brand-gold animate-spin" />
        <p className="ml-4 text-2xl text-brand-chocolate font-sans">Carregando detalhes do bolo...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="text-center py-20">
        <ImageOff size={64} className="mx-auto text-brand-gold mb-4" />
        <h1 className="text-4xl font-cursive text-brand-gold mb-4">Bolo Não Encontrado</h1>
        <p className="text-brand-chocolate/80 font-sans mb-8">Oops! Parece que este bolo não existe ou foi removido.</p>
        <Link to="/projects">
          <Button variant="outline" className="text-brand-chocolate border-brand-gold hover:bg-brand-gold/20 rounded-xl">
            <ArrowLeft className="mr-2 h-5 w-5" />
            Voltar ao Portfólio
          </Button>
        </Link>
      </div>
    );
  }

  // Usar image_urls array de strings
  const projectImages = project.image_urls && project.image_urls.length > 0
    ? project.image_urls
    : [];

  return (
    <motion.div
      className="container mx-auto py-8"
      variants={pageVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={contentVariants} className="mb-8">
        <Link to="/projects">
          <Button variant="ghost" className="text-brand-gold hover:bg-brand-gold/10 rounded-xl mb-6">
            <ArrowLeft className="mr-2 h-5 w-5" />
            Voltar ao Portfólio
          </Button>
        </Link>
      </motion.div>

      <motion.div
        variants={contentVariants}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 glassmorphism-card p-6 sm:p-10"
      >
        <div className="w-full">
          {projectImages.length > 1 ? (
            <Carousel className="w-full rounded-2xl overflow-hidden shadow-lg">
              <CarouselContent>
                {projectImages.map((url, index) => (
                  <CarouselItem key={index}>
                    <div className="aspect-[4/3] w-full bg-brand-cream/50 flex items-center justify-center">
                      <img
                        className="w-full h-full object-cover"
                        alt={`${project.title} - imagem ${index + 1}`}
                        src={url}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 bg-brand-cream/70 hover:bg-brand-cream text-brand-gold border-brand-gold" />
              <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 bg-brand-cream/70 hover:bg-brand-cream text-brand-gold border-brand-gold" />
            </Carousel>
          ) : projectImages.length === 1 ? (
            <div className="aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-lg bg-brand-cream/50 flex items-center justify-center">
              <img
                className="w-full h-full object-cover"
                alt={project.title}
                src={projectImages[0]}
              />
            </div>
          ) : (
            <div className="aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-lg bg-gray-200 flex items-center justify-center">
              <ImageOff size={48} className="text-brand-chocolate/50" />
            </div>
          )}
        </div>

        <div className="flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-cursive text-brand-gold mb-6">{project.title}</h1>

          <div className="space-y-5 mb-8 font-sans text-brand-chocolate">
            <div className="flex items-start">
              <Info size={24} className="mr-3 text-brand-gold flex-shrink-0 mt-1" />
              <p className="leading-relaxed">{project.description}</p>
            </div>
            <div className="flex items-center">
              <CalendarDays size={22} className="mr-3 text-brand-gold" />
              <p><strong>Criado em:</strong> {new Date(project.created_at).toLocaleDateString('pt-BR')}</p>
            </div>
          </div>

          <Link to="/contact">
            <Button size="lg" className="cta-button w-full sm:w-auto text-lg group">
              Quero um Bolo Assim!
              <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectDetailPage;
