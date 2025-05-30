import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    "Supabase URL or Anon Key is missing. Make sure to set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file."
  );
}

export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

// Helper function for handling Supabase storage (example)
export const uploadProjectImage = async (file, projectId) => {
  if (!supabase) return { data: null, error: { message: "Supabase client not initialized." } };
  
  const fileName = `${projectId}/${Date.now()}-${file.name}`;
  const { data, error } = await supabase.storage
    .from('project-images') // Assuming you have a bucket named 'project-images'
    .upload(fileName, file);

  if (error) {
    console.error('Error uploading image:', error);
    return { data: null, error };
  }

  // Get public URL
  const { data: publicURLData } = supabase.storage
    .from('project-images')
    .getPublicUrl(fileName);
  
  return { data: { ...data, publicUrl: publicURLData.publicUrl }, error: null };
};