import React, { useState, useEffect } from 'react';
import { useSettings } from '@/contexts/SettingsContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';
import { Save, Image as ImageIcon, Type, Mail, Phone, Instagram as InstagramIcon, Loader2 } from 'lucide-react';

const AdminSettingsPage = () => {
  const { settings, updateSettings, loading: settingsLoading, fetchSettings } = useSettings();
  const { toast } = useToast();
  const [formData, setFormData] = useState({});
  const [initialized, setInitialized] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  // Fetch settings once on mount
  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  // Initialize form data only once after initial fetch completes
  useEffect(() => {
    if (!settingsLoading && !initialized && settings) {
      setFormData(settings);
      setInitialized(true);
    }
  }, [settings, settingsLoading, initialized]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      await updateSettings(formData);
      toast({
        title: "Configurações Salvas!",
        description: "Suas alterações foram aplicadas em todo o site.",
        className: "bg-green-600 border-green-700 text-white",
      });
    } catch (error) {
      toast({
        title: "Erro ao salvar",
        description: error.message || "Não foi possível atualizar as configurações.",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const pageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const inputGroupVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } }
  };

  if ((settingsLoading && !initialized) || isUpdating) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-12 w-12 text-brand-gold animate-spin" />
        <p className="ml-3 text-xl text-brand-chocolate">
          {isUpdating ? 'Salvando configurações...' : 'Carregando configurações...'}
        </p>
      </div>
    );
  }

  return (
    <motion.div 
      className="space-y-8 max-w-3xl mx-auto"
      variants={pageVariants}
      initial="hidden"
      animate="visible"
    >
      <div>
        <h1 className="text-4xl font-cursive text-brand-gold">Configurações do Site</h1>
        <p className="text-brand-chocolate/80 font-sans">Personalize as informações globais do seu site.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 bg-card p-8 rounded-xl shadow-card-elegant border border-brand-gold/20">
        <motion.div variants={inputGroupVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="siteName" className="text-brand-chocolate font-semibold flex items-center">
              <Type className="mr-2 h-5 w-5 text-brand-gold" /> Nome do Site
            </Label>
            <Input id="siteName" name="siteName" value={formData.siteName || ''} onChange={handleChange} placeholder="Ex: Cida Bolos Incríveis" className="bg-brand-cream/70 focus:border-brand-gold text-brand-chocolate placeholder:text-brand-light-brown" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="logoUrl" className="text-brand-chocolate font-semibold flex items-center">
              <ImageIcon className="mr-2 h-5 w-5 text-brand-gold" /> URL do Logo (Opcional)
            </Label>
            <Input id="logoUrl" name="logoUrl" value={formData.logoUrl || ''} onChange={handleChange} placeholder="https://exemplo.com/logo.png" className="bg-brand-cream/70 focus:border-brand-gold text-brand-chocolate placeholder:text-brand-light-brown" />
            <p className="text-xs text-brand-light-brown">Deixe em branco para usar o nome do site como logo.</p>
          </div>
        </motion.div>

        <motion.div variants={inputGroupVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="contactEmail" className="text-brand-chocolate font-semibold flex items-center">
              <Mail className="mr-2 h-5 w-5 text-brand-gold" /> Email de Contato
            </Label>
            <Input id="contactEmail" name="contactEmail" type="email" value={formData.contactEmail || ''} onChange={handleChange} placeholder="contato@seudominio.com" className="bg-brand-cream/70 focus:border-brand-gold text-brand-chocolate placeholder:text-brand-light-brown" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="whatsappNumber" className="text-brand-chocolate font-semibold flex items-center">
              <Phone className="mr-2 h-5 w-5 text-brand-gold" /> Número do WhatsApp
            </Label>
            <Input id="whatsappNumber" name="whatsappNumber" value={formData.whatsappNumber || ''} onChange={handleChange} placeholder="5538999998888" className="bg-brand-cream/70 focus:border-brand-gold text-brand-chocolate placeholder:text-brand-light-brown" />
            <p className="text-xs text-brand-light-brown">Inclua o código do país (ex: 55 para Brasil).</p>
          </div>
        </motion.div>

        <motion.div variants={inputGroupVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="instagramHandle" className="text-brand-chocolate font-semibold flex items-center">
              <InstagramIcon className="mr-2 h-5 w-5 text-brand-gold" /> Perfil do Instagram
            </Label>
            <Input id="instagramHandle" name="instagramHandle" value={formData.instagramHandle || ''} onChange={handleChange} placeholder="seu_usuario_instagram (sem @)" className="bg-brand-cream/70 focus:border-brand-gold text-brand-chocolate placeholder:text-brand-light-brown" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="city" className="text-brand-chocolate font-semibold flex items-center">
              <Type className="mr-2 h-5 w-5 text-brand-gold" /> Cidade de Atuação
            </Label>
            <Input id="city" name="city" value={formData.city || ''} onChange={handleChange} placeholder="Ex: Bonfinópolis de Minas" className="bg-brand-cream/70 focus:border-brand-gold text-brand-chocolate placeholder:text-brand-light-brown" />
          </div>
        </motion.div>

        <motion.div variants={inputGroupVariants} className="flex justify-end pt-4">
          <Button type="submit" className="cta-button text-lg px-8 py-3 group" disabled={isUpdating}>
            {isUpdating ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Save className="mr-2 h-5 w-5 group-hover:animate-pulse" />}
            {isUpdating ? 'Salvando...' : 'Salvar Alterações'}
          </Button>
        </motion.div>
      </form>
    </motion.div>
  );
};

export default AdminSettingsPage;
