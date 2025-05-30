import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/services/supabaseClient';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchAdminDetails = async (userId) => {
    if (!supabase) return null;
    const { data: adminData, error: adminError } = await supabase
      .from('admins')
      .select('full_name')
      .eq('id', userId)
      .single();
    
    if (adminError && adminError.code !== 'PGRST116') {
      console.warn('Error fetching admin details:', adminError.message);
      return null;
    }
    return adminData;
  };

  const handleUserSession = async (sessionUser) => {
    if (sessionUser) {
      const adminDetails = await fetchAdminDetails(sessionUser.id);
      setUser({ ...sessionUser, fullName: adminDetails?.full_name });
      localStorage.setItem('isAdminAuthenticated', 'true');
    } else {
      setUser(null);
      localStorage.removeItem('isAdminAuthenticated');
    }
  };

  const checkUser = useCallback(async () => {
    if (!supabase) {
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) throw error;
      await handleUserSession(session?.user);
    } catch (error) {
      console.error('Auth check error:', error.message);
      setUser(null);
      localStorage.removeItem('isAdminAuthenticated');
    } finally {
      setLoading(false);
    }
  }, []);


  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      toast({ title: "Supabase não configurado", description: "Verifique as variáveis de ambiente.", variant: "destructive" });
      return;
    }
    
    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setLoading(true);
      await handleUserSession(session?.user);
      setLoading(false);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, [checkUser, toast]);

  const login = async (email, password) => {
    if (!supabase) return { user: null, error: { message: "Supabase client not initialized." } };
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      toast({ title: "Falha no Login", description: error.message, variant: "destructive" });
    } else if (data.user) {
      await handleUserSession(data.user); // Fetches admin details and sets user
      toast({ title: "Login bem-sucedido!", description: "Bem-vindo, Admin!" });
    }
    setLoading(false);
    return { user: data.user, error };
  };

  const signup = async (email, password, fullName) => {
    if (!supabase) return { user: null, error: { message: "Supabase client not initialized." } };
    setLoading(true);
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      toast({ title: "Erro no Cadastro", description: authError.message, variant: "destructive" });
      setLoading(false);
      return { user: null, error: authError };
    }

    if (authData.user) {
      const { error: adminInsertError } = await supabase
        .from('admins')
        .insert({ id: authData.user.id, full_name: fullName, created_at: new Date().toISOString() });

      if (adminInsertError) {
        toast({ title: "Erro ao Salvar Dados do Admin", description: adminInsertError.message, variant: "destructive" });
        setLoading(false);
        return { user: authData.user, error: adminInsertError };
      }
      toast({ title: "Cadastro realizado!", description: "Verifique seu email para confirmação (se habilitado)." });
      // Session might be set automatically by Supabase, or might need explicit login after confirmation
      // For now, we assume the onAuthStateChange will handle the new user session.
    }
    setLoading(false);
    return { user: authData.user, error: null };
  };

  const logout = async () => {
    if (!supabase) return { error: { message: "Supabase client not initialized." } };
    setLoading(true);
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({ title: "Erro no Logout", description: error.message, variant: "destructive" });
    } else {
      setUser(null);
      localStorage.removeItem('isAdminAuthenticated');
      toast({ title: "Logout realizado", description: "Você foi desconectado." });
    }
    setLoading(false);
    return { error };
  };
  
  const updatePassword = async (newPassword) => {
    if (!supabase || !user) return { error: { message: "Usuário não autenticado ou Supabase client não inicializado." } };
    setLoading(true);
    const { data, error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) {
      toast({ title: "Erro ao Atualizar Senha", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Senha Atualizada", description: "Sua senha foi alterada com sucesso." });
    }
    setLoading(false);
    return { data, error };
  };

  const updateUserProfile = async (fullName) => {
    if (!supabase || !user) return { error: { message: "Usuário não autenticado ou Supabase client não inicializado." } };
    setLoading(true);
    const { data, error } = await supabase
      .from('admins')
      .update({ full_name: fullName, updated_at: new Date().toISOString() })
      .eq('id', user.id)
      .select()
      .single();
    
    if (error) {
      toast({ title: "Erro ao Atualizar Perfil", description: error.message, variant: "destructive" });
    } else if (data) {
      setUser(prevUser => ({ ...prevUser, fullName: data.full_name }));
      toast({ title: "Perfil Atualizado", description: "Seu nome foi atualizado com sucesso." });
    }
    setLoading(false);
    return { data, error };
  };

  return { user, loading, login, signup, logout, isAuthenticated: !!user, updatePassword, updateUserProfile, checkUser };
};