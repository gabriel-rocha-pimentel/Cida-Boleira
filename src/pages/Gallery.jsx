import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Heart, Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import useSupabaseStorage from '@/hooks/useSupabaseStorage';

const Gallery = () => {
  const { images, loading, error } = useSupabaseStorage('projects-image');
  const [selectedImage, setSelectedImage] = useState(null);
  const [filter, setFilter] = useState('all');

  const categories = [
    { id: 'all', name: 'Todos' },
    { id: 'bolos', name: 'Bolos' },
    { id: 'ovos', name: 'Ovos de Páscoa' },
    { id: 'doces', name: 'Doces Especiais' }
  ];

  // Filtrar imagens baseado na categoria (simulado por nome do arquivo)
  const filteredImages = filter === 'all' 
    ? images 
    : images.filter(image => 
        image.name.toLowerCase().includes(filter) || 
        (image.caption && image.caption.toLowerCase().includes(filter))
      );

  if (loading) {
    return (
      <div className="pt-24">
        <section className="py-20 gradient-bg">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-6xl font-script font-bold text-warm-900 mb-6">
                Nossa Galeria
              </h1>
              <p className="text-xl text-warm-700">Carregando nossas criações...</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(12)].map((_, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <div className="w-full h-64 bg-gradient-to-r from-warm-200 to-rose-200 shimmer-bg animate-shimmer"></div>
                  <div className="p-4">
                    <div className="h-4 bg-warm-200 rounded animate-pulse mb-2"></div>
                    <div className="h-3 bg-warm-100 rounded animate-pulse w-2/3"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-24">
        <section className="py-20 gradient-bg">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-5xl md:text-6xl font-script font-bold text-warm-900 mb-6">
                Nossa Galeria
              </h1>
              <div className="bg-white rounded-2xl p-12 shadow-lg max-w-md mx-auto">
                <Heart className="h-16 w-16 text-rose-400 mx-auto mb-6" />
                <h2 className="text-2xl font-semibold text-warm-900 mb-4">
                  Ops! Algo deu errado
                </h2>
                <p className="text-warm-700 mb-6">
                  Não conseguimos carregar as imagens no momento. 
                  Tente novamente em alguns instantes.
                </p>
                <Button 
                  onClick={() => window.location.reload()}
                  className="bg-gradient-to-r from-rose-500 to-warm-500 hover:from-rose-600 hover:to-warm-600 text-white"
                >
                  Tentar Novamente
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="py-20 gradient-bg">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center space-x-2 bg-rose-100 text-rose-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Eye className="h-4 w-4" />
              <span>Nossa Galeria</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-script font-bold text-warm-900 mb-6">
              Momentos Doces
              <span className="text-rose-600 block">Capturados</span>
            </h1>
            
            <p className="text-xl text-warm-700 max-w-3xl mx-auto leading-relaxed">
              Cada doce conta uma história única. Explore nossa coleção de criações artesanais 
              e se inspire para sua próxima encomenda especial.
            </p>
          </motion.div>

          {/* Filter Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {categories.map((category) => (
              <Button
                key={category.id}
                onClick={() => setFilter(category.id)}
                variant={filter === category.id ? "default" : "outline"}
                className={`transition-all duration-300 ${
                  filter === category.id
                    ? 'bg-gradient-to-r from-rose-500 to-warm-500 text-white shadow-lg'
                    : 'border-warm-300 text-warm-700 hover:bg-warm-100'
                }`}
              >
                <Filter className="h-4 w-4 mr-2" />
                {category.name}
              </Button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          {filteredImages.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <Heart className="h-16 w-16 text-rose-400 mx-auto mb-6" />
              <h3 className="text-2xl font-semibold text-warm-900 mb-4">
                Nenhuma imagem encontrada
              </h3>
              <p className="text-warm-700 mb-6">
                Não encontramos imagens para esta categoria. 
                Tente selecionar outra categoria ou volte em breve para ver nossas novas criações!
              </p>
              <Button 
                onClick={() => setFilter('all')}
                className="bg-gradient-to-r from-rose-500 to-warm-500 hover:from-rose-600 hover:to-warm-600 text-white"
              >
                Ver Todas as Imagens
              </Button>
            </motion.div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              <AnimatePresence>
                {filteredImages.map((image, index) => (
                  <motion.div
                    key={image.id}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="group cursor-pointer"
                    onClick={() => setSelectedImage(image)}
                  >
                    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden hover-lift">
                      <div className="relative overflow-hidden">
                        <img
                          src={image.url}
                          alt={image.caption || `Doce artesanal ${index + 1}`}
                          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="absolute bottom-4 left-4 right-4">
                            <div className="flex items-center justify-between">
                              <div className="text-white">
                                <p className="font-medium text-sm">
                                  {image.caption || 'Doce Artesanal'}
                                </p>
                              </div>
                              <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                                <Eye className="h-4 w-4 text-white" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>

      {/* Modal for Image Preview */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-2xl overflow-hidden max-w-4xl max-h-[90vh] w-full relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>

              <img
                src={selectedImage.url}
                alt={selectedImage.caption || 'Doce artesanal'}
                className="w-full h-auto max-h-[70vh] object-contain"
              />
              
              <div className="p-6">
                <h3 className="text-2xl font-script font-bold text-warm-900 mb-2">
                  {selectedImage.caption || 'Doce Artesanal'}
                </h3>
                <p className="text-warm-600 mb-4">
                  Criado com amor e dedicação pela Cida Boleira
                </p>
                
                <div className="flex gap-4">
                  <Button
                    asChild
                    className="bg-gradient-to-r from-rose-500 to-warm-500 hover:from-rose-600 hover:to-warm-600 text-white"
                  >
                    <a 
                      href="https://wa.me/5534999999999?text=Olá! Vi uma criação linda na galeria e gostaria de fazer uma encomenda similar."
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Encomendar Similar
                    </a>
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={() => setSelectedImage(null)}
                  >
                    Fechar
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;