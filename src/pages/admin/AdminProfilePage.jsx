import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';
import { UserCircle, Mail, KeyRound, Save, ShieldAlert, Loader2 } from 'lucide-react';

const AdminProfilePage = () => {
  const { user, loading: authLoading, updatePassword, updateUserProfile } = useAuth();
  const { toast } = useToast();
  
  const [currentPassword, setCurrentPassword] = useState(''); // Not used for Supabase password update directly
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);

  const [profileData, setProfileData] = useState({
    fullName: '', // Will be 'full_name' from Supabase 'admins' table
    email: '', 
  });

  useEffect(() => {
    if (user && !authLoading) {
      setProfileData({
        fullName: user.fullName || user.user_metadata?.full_name || '', // Prioritize custom table, fallback to user_metadata
        email: user.email || '',
      });
    }
  }, [user, authLoading]);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    if (!profileData.fullName.trim()) {
      toast({ title: "Erro", description: "O nome completo não pode estar vazio.", variant: "destructive" });
      return;
    }
    setIsUpdatingProfile(true);
    await updateUserProfile(profileData.fullName); // This will show toast from useAuth
    setIsUpdatingProfile(false);
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setIsUpdatingPassword(true);
    if (!newPassword || !confirmNewPassword) {
      toast({ title: "Erro", description: "Nova senha e confirmação são obrigatórias.", variant: "destructive" });
      setIsUpdatingPassword(false);
      return;
    }
    if (newPassword !== confirmNewPassword) {
      toast({ title: "Erro", description: "As novas senhas não coincidem.", variant: "destructive" });
      setIsUpdatingPassword(false);
      return;
    }
    if (newPassword.length < 6) {
      toast({ title: "Erro", description: "A nova senha deve ter pelo menos 6 caracteres.", variant: "destructive" });
      setIsUpdatingPassword(false);
      return;
    }

    const { error } = await updatePassword(newPassword); // This will show toast from useAuth
    if (!error) {
      setNewPassword('');
      setConfirmNewPassword('');
      // Current password field is not needed for Supabase password update via updateUser
      setCurrentPassword(''); 
    }
    setIsUpdatingPassword(false);
  };

  const pageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const sectionVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut", delay: 0.1 } }
  };

  if (authLoading && !user) { // Show loader only if initial auth check is happening and no user yet
    return <div className="flex justify-center items-center h-64"><Loader2 className="h-12 w-12 text-brand-gold animate-spin" /><p className="ml-3 text-xl text-brand-chocolate">Carregando perfil...</p></div>;
  }
  
  return (
    <motion.div 
      className="space-y-10 max-w-3xl mx-auto"
      variants={pageVariants}
      initial="hidden"
      animate="visible"
    >
      <div>
        <h1 className="text-4xl font-cursive text-brand-gold">Meu Perfil</h1>
        <p className="text-brand-chocolate/80 font-sans">Gerencie suas informações de administrador.</p>
      </div>

      <motion.section variants={sectionVariants} className="bg-card p-8 rounded-xl shadow-card-elegant border border-brand-gold/20">
        <h2 className="text-2xl font-cursive text-brand-gold mb-6 flex items-center">
          <UserCircle className="mr-3 h-7 w-7" /> Informações Pessoais
        </h2>
        <form onSubmit={handleProfileUpdate} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-brand-chocolate font-semibold">Nome Completo</Label>
            <Input 
              id="fullName" 
              value={profileData.fullName} 
              onChange={(e) => setProfileData({...profileData, fullName: e.target.value})} 
              placeholder="Seu nome completo" 
              className="bg-brand-cream/70 focus:border-brand-gold text-brand-chocolate placeholder:text-brand-light-brown"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-brand-chocolate font-semibold flex items-center">
              <Mail className="mr-2 h-5 w-5 text-brand-gold" /> Email (não editável)
            </Label>
            <Input id="email" type="email" value={profileData.email} readOnly disabled className="bg-brand-cream/50 cursor-not-allowed text-brand-light-brown border-brand-gold/30" />
          </div>
          <div className="flex justify-end">
            <Button type="submit" className="cta-button group" disabled={isUpdatingProfile}>
              {isUpdatingProfile ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Save className="mr-2 h-5 w-5 group-hover:animate-pulse" />}
              {isUpdatingProfile ? 'Salvando...' : 'Salvar Nome'}
            </Button>
          </div>
        </form>
      </motion.section>

      <motion.section variants={sectionVariants} className="bg-card p-8 rounded-xl shadow-card-elegant border border-brand-gold/20">
        <h2 className="text-2xl font-cursive text-brand-gold mb-6 flex items-center">
          <KeyRound className="mr-3 h-7 w-7" /> Alterar Senha
        </h2>
        <form onSubmit={handlePasswordChange} className="space-y-6">
           {/* Current password field is not strictly needed for Supabase's updateUser method for password,
               but can be kept for UX if desired, though it won't be verified client-side here.
               For a more secure flow, a dedicated "change password" screen verifying current pass first is better.
           */}
          <div className="space-y-2">
            <Label htmlFor="currentPassword" className="text-brand-chocolate font-semibold">Senha Atual (Opcional para referência)</Label>
            <Input id="currentPassword" type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} placeholder="Sua senha atual (não enviado)" className="bg-brand-cream/70 focus:border-brand-gold text-brand-chocolate placeholder:text-brand-light-brown"/>
             <p className="text-xs text-brand-light-brown">A senha atual não é enviada, mas pode ajudar a lembrar.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="newPassword" className="text-brand-chocolate font-semibold">Nova Senha*</Label>
              <Input id="newPassword" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Mínimo 6 caracteres" required className="bg-brand-cream/70 focus:border-brand-gold text-brand-chocolate placeholder:text-brand-light-brown"/>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmNewPassword" className="text-brand-chocolate font-semibold">Confirmar Nova Senha*</Label>
              <Input id="confirmNewPassword" type="password" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} placeholder="Repita a nova senha" required className="bg-brand-cream/70 focus:border-brand-gold text-brand-chocolate placeholder:text-brand-light-brown"/>
            </div>
          </div>
          <div className="flex items-center justify-between pt-2">
            <p className="text-xs text-brand-light-brown flex items-center">
              <ShieldAlert className="mr-2 h-4 w-4 text-orange-500" />
              Por segurança, você pode ser desconectado após alterar a senha.
            </p>
            <Button type="submit" className="cta-button group" disabled={isUpdatingPassword}>
              {isUpdatingPassword ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Save className="mr-2 h-5 w-5 group-hover:animate-pulse" />}
              {isUpdatingPassword ? 'Alterando...' : 'Alterar Senha'}
            </Button>
          </div>
        </form>
      </motion.section>
    </motion.div>
  );
};

export default AdminProfilePage;