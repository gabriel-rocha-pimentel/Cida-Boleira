import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Eye } from 'lucide-react';

const ProjectCard = ({ project }) => {
  if (!project) return null;

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  // Seleciona a primeira imagem ou fallback
  const imageUrl = project.image_urls?.[0] || 'https://images.unsplash.com/photo-1615336523094-d786dac51efd';

  return (
    <motion.div
      variants={cardVariants}
      className="bg-card rounded-2xl shadow-card-elegant overflow-hidden transform hover:scale-[1.03] transition-transform duration-300 ease-in-out border border-brand-gold/20 group"
    >
      <div className="relative h-72 w-full overflow-hidden">
        <img  
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          alt={project.title || "Bolo temático"}
          src={imageUrl} />
      </div>
      <div className="p-6 bg-card">
        <h3 className="text-2xl font-cursive text-brand-gold mb-2 group-hover:text-brand-chocolate transition-colors">{project.title || "Bolo Incrível"}</h3>
        <p className="font-sans text-muted-foreground text-sm mb-4 line-clamp-3">{project.description || "Uma breve descrição deste bolo maravilhoso."}</p>
        <Link to={`/projects/${project.id}`}>
          <Button variant="outline" className="w-full bg-brand-cream text-brand-chocolate hover:bg-brand-gold hover:text-brand-cream border-brand-gold rounded-xl transition-all duration-300 group">
            Ver Mais Detalhes
            <Eye className="ml-2 h-4 w-4 text-brand-gold group-hover:text-brand-cream transition-colors" />
          </Button>
        </Link>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
