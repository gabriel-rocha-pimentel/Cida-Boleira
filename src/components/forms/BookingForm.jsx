import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';
import { Calendar, Cake, MessageSquare, User } from 'lucide-react';
import { useSettings } from '@/contexts/SettingsContext';
import { useBookings } from '@/hooks/useBookings'; // Import useBookings hook

const getTodayDate = () => {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

const BookingForm = ({ detailed = false }) => {
  const { toast } = useToast();
  const { settings } = useSettings();
  const { addBooking, loading: bookingLoading } = useBookings(); // Use addBooking from the hook
  const [formData, setFormData] = useState({
    name: '', // Corresponds to customer_name
    date: '', // Corresponds to booking_date
    flavor: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.date || !formData.flavor) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha a data e o sabor desejado.",
        variant: "destructive",
      });
      return;
    }

    // Use the addBooking function from the hook
    const newBookingData = {
      name: formData.name, // customer_name in Supabase
      date: formData.date, // booking_date in Supabase
      flavor: formData.flavor,
      message: formData.message,
    };

    const result = await addBooking(newBookingData);

    if (result) {
      toast({
        title: "Pedido de Agendamento Enviado!",
        description: "Entraremos em contato em breve para confirmar. Você também pode nos chamar no WhatsApp!",
        className: "bg-green-600 border-green-700 text-white",
      });

      const whatsappText = `Olá Cida! Gostaria de agendar um bolo:
      Nome: ${formData.name || 'Não informado'}
      Data: ${new Date(formData.date).toLocaleDateString('pt-BR')}
      Sabor: ${formData.flavor}
      ${formData.message ? `Mensagem: ${formData.message}` : ''}
      Obrigado(a)!`;
      
      const whatsappUrl = `https://api.whatsapp.com/send?phone=${settings.whatsappNumber.replace(/\D/g, '')}&text=${encodeURIComponent(whatsappText)}`;
      
      window.open(whatsappUrl, '_blank');
      setFormData({ name: '', date: '', flavor: '', message: '' });
    } else {
      // Error toast is handled within useBookings hook
    }
  };

  const formItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <motion.form 
      onSubmit={handleSubmit} 
      className="space-y-6 glassmorphism-card p-6 sm:p-10"
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
    >
      <h2 className="text-3xl font-cursive text-brand-gold text-center mb-6">
        {detailed ? "Faça seu Pedido Detalhado" : "Agende seu Bolo"}
      </h2>
      
      {detailed && (
        <motion.div variants={formItemVariants} className="space-y-2">
          <Label htmlFor="name" className="text-brand-chocolate font-semibold">Seu Nome*</Label>
          <div className="relative">
            <Input
              id="name"
              name="name" // This will be customer_name in Supabase
              type="text"
              placeholder="Como podemos te chamar?"
              value={formData.name}
              onChange={handleChange}
              required={detailed} // Name is required for detailed form
              className="bg-brand-cream/80 focus:border-brand-gold pl-10"
            />
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-brand-light-brown" />
          </div>
        </motion.div>
      )}

      <motion.div variants={formItemVariants} className="space-y-2">
        <Label htmlFor="date" className="text-brand-chocolate font-semibold">Data do Evento*</Label>
        <div className="relative">
          <Input
            id="date"
            name="date" // This will be booking_date in Supabase
            type="date"
            value={formData.date}
            onChange={handleChange}
            required
            min={getTodayDate()}
            className="bg-brand-cream/80 focus:border-brand-gold pl-10"
          />
          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-brand-light-brown" />
        </div>
      </motion.div>

      <motion.div variants={formItemVariants} className="space-y-2">
        <Label htmlFor="flavor" className="text-brand-chocolate font-semibold">Sabor Desejado*</Label>
         <div className="relative">
          <Input
            id="flavor"
            name="flavor"
            type="text"
            placeholder="Ex: Chocolate com morango, Ninho com Nutella"
            value={formData.flavor}
            onChange={handleChange}
            required
            className="bg-brand-cream/80 focus:border-brand-gold pl-10"
          />
          <Cake className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-brand-light-brown" />
        </div>
      </motion.div>

      <motion.div variants={formItemVariants} className="space-y-2">
        <Label htmlFor="message" className="text-brand-chocolate font-semibold">Detalhes Adicionais (opcional)</Label>
        <div className="relative">
          <Textarea
            id="message"
            name="message"
            placeholder="Alguma observação, tema da festa, ou preferência especial?"
            value={formData.message}
            onChange={handleChange}
            rows={detailed ? 4 : 3}
            className="bg-brand-cream/80 focus:border-brand-gold pl-10"
          />
          <MessageSquare className="absolute left-3 top-3 h-5 w-5 text-brand-light-brown" />
        </div>
      </motion.div>

      <motion.div variants={formItemVariants}>
        <Button type="submit" className="w-full cta-button text-lg" size="lg" disabled={bookingLoading}>
          {bookingLoading ? 'Enviando...' : (detailed ? "Enviar Pedido Completo" : "Agendar e Chamar no WhatsApp")}
        </Button>
      </motion.div>
      {!detailed && (
         <motion.p variants={formItemVariants} className="text-xs text-center text-brand-chocolate/80 font-sans">
           Após agendar, você será direcionado para o WhatsApp para finalizar os detalhes.
         </motion.p>
      )}
       {detailed && (
         <motion.p variants={formItemVariants} className="text-xs text-center text-brand-chocolate/80 font-sans">
           Seu pedido será enviado e também abriremos o WhatsApp para contato direto.
         </motion.p>
      )}
    </motion.form>
  );
};

export default BookingForm;