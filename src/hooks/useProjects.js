import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/services/supabaseClient';

export const useProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { toast } = useToast();

  const fetchProjects = useCallback(async () => {
    if (!supabase) {
      setError("Supabase client not available.");
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const { data, error: fetchError } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });
      if (fetchError) throw fetchError;
      setProjects(data);
    } catch (err) {
      console.error("Error fetching projects:", err.message);
      setError(err.message || 'Falha ao buscar projetos.');
      toast({ title: "Erro ao Buscar Projetos", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const getProjectById = useCallback(async (id) => {
    if (!supabase) return null;
    // Check local state first for potentially faster access if already loaded
    const localProject = projects.find(p => p.id === id);
    if (localProject) return localProject;

    setLoading(true); // Only set loading if fetching from Supabase
    try {
      const { data, error: fetchError } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .single();
      if (fetchError) throw fetchError;
      setLoading(false);
      return data;
    } catch (err) {
      console.error("Error fetching project by ID:", err.message);
      toast({ title: "Erro ao Buscar Projeto", description: err.message, variant: "destructive" });
      setLoading(false);
      return null;
    }
  }, [projects, toast]);


  const addProject = async (projectData) => {
    if (!supabase) return null;
    setLoading(true);
    try {
      const preparedProjectData = {
        title: projectData.title,
        description: projectData.description,
        theme: projectData.theme || null, // Ensure theme can be null
        image_urls: projectData.image_urls.map(img => typeof img === 'string' ? img : img.url),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      const { data, error: insertError } = await supabase
        .from('projects')
        .insert([preparedProjectData])
        .select()
        .single();
      if (insertError) throw insertError;
      
      await fetchProjects();
      toast({ title: "Sucesso", description: "Projeto adicionado!" });
      return data;
    } catch (err) {
      console.error("Error adding project:", err.message);
      setError(err.message || 'Falha ao adicionar projeto.');
      toast({ title: "Erro ao Adicionar Projeto", description: err.message, variant: "destructive" });
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateProject = async (id, projectData) => {
    if (!supabase) return null;
    setLoading(true);
    try {
      const preparedProjectData = {
        title: projectData.title,
        description: projectData.description,
        theme: projectData.theme || null,
        image_urls: projectData.image_urls.map(img => typeof img === 'string' ? img : img.url),
        updated_at: new Date().toISOString(),
      };

      const { data, error: updateError } = await supabase
        .from('projects')
        .update(preparedProjectData)
        .eq('id', id)
        .select()
        .single();
      if (updateError) throw updateError;
      
      await fetchProjects();
      toast({ title: "Sucesso", description: "Projeto atualizado!" });
      return data;
    } catch (err) {
      console.error("Error updating project:", err.message);
      setError(err.message || 'Falha ao atualizar projeto.');
      toast({ title: "Erro ao Atualizar Projeto", description: err.message, variant: "destructive" });
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async (id) => {
    if (!supabase) return;
    setLoading(true);
    try {
      const { error: deleteError } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);
      if (deleteError) throw deleteError;
      
      await fetchProjects();
      toast({ title: "Sucesso", description: "Projeto excluído!" });
    } catch (err) {
      console.error("Error deleting project:", err.message);
      setError(err.message || 'Falha ao excluir projeto.');
      toast({ title: "Erro ao Excluir Projeto", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return { projects, loading, error, fetchProjects, getProjectById, addProject, updateProject, deleteProject };
};