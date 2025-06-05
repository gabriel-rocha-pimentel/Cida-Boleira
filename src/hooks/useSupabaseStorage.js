import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

const useSupabaseStorage = (bucketName) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data: files, error: listError } = await supabase
          .storage
          .from(bucketName)
          .list();

        if (listError) {
          throw listError;
        }

        const imagePromises = files.map(async (file) => {
          const { data: { publicUrl } } = supabase
            .storage
            .from(bucketName)
            .getPublicUrl(file.name);

          return {
            id: file.id,
            name: file.name,
            url: publicUrl,
            caption: file.metadata?.caption || file.name
          };
        });

        const imageData = await Promise.all(imagePromises);
        setImages(imageData);
      } catch (err) {
        console.error('Error fetching images:', err);
        setError('Não foi possível carregar as imagens. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [bucketName]);

  return { images, loading, error };
};

export default useSupabaseStorage;