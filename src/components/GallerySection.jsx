import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Eye, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import useSupabaseStorage from '@/hooks/useSupabaseStorage';

const GallerySection = () => {
  const { images, loading, error } = useSupabaseStorage('projects-image');
  const [selectedImage, setSelectedImage] = useState(null);

  // Mostrar apenas as primeiras 6 imagens na seção
  const displayImages = images.slice(0, 6);

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-br from-cream-50 to-rose-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-script font-bold text-warm-900 mb-6">
              Nossa Galeria
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
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
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-gradient-to-br from-cream-50 to-rose-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-script font-bold text-warm-900 mb-6">
              Nossa Galeria
            </h2>
            <div className="bg-white rounded-2xl p-8 shadow-lg max-w-md mx-auto">
              <Heart className="h-12 w-12 text-rose-400 mx-auto mb-4" />
              <p className="text-warm-700">
                Ops! Não conseguimos carregar as imagens no momento. 
                Visite nossa página da galeria para ver todos os nossos doces!
              </p>
              <Button asChild className="mt-4">
                <Link to="/galeria">Ver Galeria Completa</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-cream-50 to-rose-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 bg-rose-100 text-rose-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Eye className="h-4 w-4" />
            <span>Nossa Galeria</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-script font-bold text-warm-900 mb-6">
            Momentos Doces
            <span className="text-rose-600 block">Capturados</span>
          </h2>
          
          <p className="text-xl text-warm-700 max-w-3xl mx-auto leading-relaxed">
            Cada doce conta uma história. Veja alguns dos nossos trabalhos mais especiais 
            e se inspire para sua próxima encomenda.
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {displayImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
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
                          <p className="font-medium">{image.caption || 'Doce Artesanal'}</p>
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
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <Button 
            asChild
            size="lg"
            className="bg-gradient-to-r from-rose-500 to-warm-500 hover:from-rose-600 hover:to-warm-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover-lift"
          >
            <Link to="/galeria" className="flex items-center">
              Ver Galeria Completa
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </motion.div>

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
                className="bg-white rounded-2xl overflow-hidden max-w-4xl max-h-[90vh] w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={selectedImage.url}
                  alt={selectedImage.caption || 'Doce artesanal'}
                  className="w-full h-auto max-h-[70vh] object-contain"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-warm-900 mb-2">
                    {selectedImage.caption || 'Doce Artesanal'}
                  </h3>
                  <p className="text-warm-600">
                    Criado com amor e dedicação pela Cidinha Boleira
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default GallerySection;