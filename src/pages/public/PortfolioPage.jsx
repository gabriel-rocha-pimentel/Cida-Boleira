import React, { useState, useMemo } from 'react';
import ProjectCard from '@/components/shared/ProjectCard';
import { useProjects } from '@/hooks/useProjects';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { Search, Loader2 } from 'lucide-react';

const PortfolioPage = () => {
  const { projects, loading } = useProjects();       // projects sempre array
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 9;

  // Filtrar apenas por título ou descrição
  const filteredProjects = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return projects.filter(
      (p) =>
        p.title?.toLowerCase().includes(term) ||
        p.description?.toLowerCase().includes(term)
    );
  }, [projects, searchTerm]);

  // Paginação
  const indexOfLast = currentPage * projectsPerPage;
  const indexOfFirst = indexOfLast - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      className="space-y-12"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Cabeçalho */}
      <motion.section
        variants={itemVariants}
        className="text-center py-12 md:py-16 bg-gradient-to-br from-brand-cream via-brand-gold/10 to-brand-cream rounded-3xl shadow-card-elegant border border-brand-gold/20"
      >
        <h1 className="text-5xl md:text-6xl font-cursive text-brand-gold">
          Nosso Doce Portfólio
        </h1>
        <p className="text-lg text-brand-chocolate font-sans mt-4 max-w-xl mx-auto">
          Inspire-se com algumas das nossas criações. Cada bolo conta uma história de sabor e alegria!
        </p>
      </motion.section>

      {/* Busca */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col md:flex-row gap-4 p-6 glassmorphism-card"
      >
        <div className="relative flex-grow">
          <Input
            type="text"
            placeholder="Buscar por nome ou descrição..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="pl-10 bg-brand-cream/80 focus:border-brand-gold text-brand-chocolate placeholder:text-brand-light-brown"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-brand-light-brown" />
        </div>
      </motion.div>

      {/* Conteúdo */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-12 w-12 text-brand-gold animate-spin" />
          <p className="ml-4 text-xl text-brand-chocolate font-sans">
            Carregando delícias...
          </p>
        </div>
      ) : currentProjects.length > 0 ? (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12"
          variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
        >
          {currentProjects.map((project) => (
            <motion.div key={project.id} variants={itemVariants}>
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.p
          variants={itemVariants}
          className="text-center text-xl text-brand-chocolate/80 font-sans py-16"
        >
          Nenhum bolo encontrado com esses critérios. Que tal tentar uma busca diferente?
        </motion.p>
      )}

      {/* Paginação */}
      {totalPages > 1 && (
        <motion.div
          variants={itemVariants}
          className="flex justify-center space-x-2 mt-12 pb-8"
        >
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              onClick={() => setCurrentPage(page)}
              variant={currentPage === page ? 'default' : 'outline'}
              className={`rounded-lg ${
                currentPage === page
                  ? 'bg-brand-gold text-brand-cream'
                  : 'text-brand-chocolate border-brand-gold hover:bg-brand-gold/20'
              }`}
            >
              {page}
            </Button>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

export default PortfolioPage;
