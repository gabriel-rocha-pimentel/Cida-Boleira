import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/services/supabaseClient';

export const useBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { toast } = useToast();

  const fetchBookings = useCallback(async () => {
    if (!supabase) {
      setError("Supabase client not available.");
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const { data, error: fetchError } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false });
      if (fetchError) throw fetchError;
      setBookings(data.map(b => ({...b, name: b.customer_name, date: b.booking_date, createdAt: b.created_at })));
    } catch (err) {
      console.error("Error fetching bookings:", err.message);
      setError(err.message || 'Falha ao buscar agendamentos.');
      toast({ title: "Erro ao Buscar Agendamentos", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const addBooking = async (bookingData) => {
    if (!supabase) return null;
    setLoading(true);
    try {
      const supabaseBookingData = {
        customer_name: bookingData.name,
        booking_date: bookingData.date,
        flavor: bookingData.flavor,
        message: bookingData.message,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      const { data, error: insertError } = await supabase
        .from('bookings')
        .insert([supabaseBookingData])
        .select()
        .single();
      if (insertError) throw insertError;
      
      await fetchBookings(); 
      toast({ title: "Sucesso", description: "Agendamento adicionado!" });
      return data ? {...data, name: data.customer_name, date: data.booking_date, createdAt: data.created_at } : null;
    } catch (err) {
      console.error("Error adding booking:", err.message);
      setError(err.message || 'Falha ao adicionar agendamento.');
      toast({ title: "Erro ao Adicionar Agendamento", description: err.message, variant: "destructive" });
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateBookingStatus = async (id, status) => {
    if (!supabase) return;
    setLoading(true);
    try {
      const { data, error: updateError } = await supabase
        .from('bookings')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();
      if (updateError) throw updateError;
      setBookings(prev => prev.map(b => b.id === id ? {...data, name: data.customer_name, date: data.booking_date, createdAt: data.created_at } : b));
      toast({ title: "Sucesso", description: "Status do agendamento atualizado!" });
    } catch (err) {
      console.error("Error updating booking status:", err.message);
      setError(err.message || 'Falha ao atualizar status.');
      toast({ title: "Erro ao Atualizar Status", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };
  
  const deleteBooking = async (id) => {
    if (!supabase) return;
    setLoading(true);
    try {
      const { error: deleteError } = await supabase
        .from('bookings')
        .delete()
        .eq('id', id);
      if (deleteError) throw deleteError;
      setBookings(prev => prev.filter(b => b.id !== id));
      toast({ title: "Sucesso", description: "Agendamento excluído!" });
    } catch (err) {
      console.error("Error deleting booking:", err.message);
      setError(err.message || 'Falha ao excluir agendamento.');
      toast({ title: "Erro ao Excluir Agendamento", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return { bookings, loading, error, fetchBookings, addBooking, updateBookingStatus, deleteBooking };
};