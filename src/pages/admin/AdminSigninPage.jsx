import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { motion } from 'framer-motion';
import { UserPlus, Mail, KeyRound, ShieldCheck, Loader2, User } from 'lucide-react';

const AdminSigninPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signup, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password || !confirmPassword || !fullName) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos, incluindo nome completo.",
        variant: "destructive",
      });
      return;
    }
    if (password !== confirmPassword) {
      toast({
        title: "Senhas não coincidem",
        description: "As senhas digitadas não são iguais.",
        variant: "destructive",
      });
      return;
    }
    if (password.length < 6) {
      toast({
        title: "Senha muito curta",
        description: "A senha deve ter pelo menos 6 caracteres.",
        variant: "destructive",
      });
      return;
    }

    const { user, error } = await signup(email, password, fullName);

    if (user && !error) { // Check for no error as well
      toast({
        title: "Conta Criada!",
        description: "Sua conta de administrador foi criada. Faça login para continuar.",
        className: "bg-green-600 border-green-700 text-white",
      });
      navigate('/admin/login', { replace: true });
    } else if (error) {
      // Toast is handled in useAuth for signup errors
    }
  };
  
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "circOut" } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-cream via-brand-gold/10 to-brand-cream p-4">
      <motion.div 
        className="w-full max-w-md bg-card p-8 md:p-10 rounded-2xl shadow-card-elegant border border-brand-gold/30"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="text-center mb-8">
          <h1 className="text-4xl font-cursive text-brand-gold">Criar Conta Admin</h1>
          <p className="text-brand-chocolate/80 font-sans mt-1">Cida Bolos Personalizados</p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div variants={itemVariants} className="space-y-2">
            <Label htmlFor="fullName" className="text-brand-chocolate font-semibold">Nome Completo</Label>
            <div className="relative">
              <Input
                id="fullName"
                type="text"
                placeholder="Seu nome completo"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="pl-10 bg-brand-cream/70 focus:border-brand-gold text-brand-chocolate placeholder:text-brand-light-brown"
                autoComplete="name"
              />
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-brand-light-brown" />
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-2">
            <Label htmlFor="email" className="text-brand-chocolate font-semibold">Email</Label>
            <div className="relative">
              <Input
                id="email"
                type="email"
                placeholder="seuemail@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="pl-10 bg-brand-cream/70 focus:border-brand-gold text-brand-chocolate placeholder:text-brand-light-brown"
                autoComplete="email"
              />
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-brand-light-brown" />
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-2">
            <Label htmlFor="password" className="text-brand-chocolate font-semibold">Senha</Label>
            <div className="relative">
              <Input
                id="password"
                type="password"
                placeholder="Crie uma senha forte (mín. 6 caracteres)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="pl-10 bg-brand-cream/70 focus:border-brand-gold text-brand-chocolate placeholder:text-brand-light-brown"
                autoComplete="new-password"
              />
              <KeyRound className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-brand-light-brown" />
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-brand-chocolate font-semibold">Confirmar Senha</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Repita a senha"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="pl-10 bg-brand-cream/70 focus:border-brand-gold text-brand-chocolate placeholder:text-brand-light-brown"
                autoComplete="new-password"
              />
              <ShieldCheck className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-brand-light-brown" />
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Button type="submit" className="w-full cta-button text-lg" disabled={loading} size="lg">
              {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <UserPlus className="mr-2 h-5 w-5" />}
              {loading ? 'Criando...' : 'Criar Conta'}
            </Button>
          </motion.div>
        </form>
        
        <motion.div variants={itemVariants} className="mt-6 text-center font-sans text-sm">
          <p className="text-brand-chocolate/80">
            Já tem uma conta?{' '}
            <Link to="/admin/login" className="font-medium text-brand-gold hover:text-brand-burnt-orange hover:underline">
              Fazer Login
            </Link>
          </p>
        </motion.div>
        <motion.div variants={itemVariants} className="mt-8 text-center">
            <Link to="/" className="text-sm font-sans text-brand-light-brown hover:text-brand-gold hover:underline">
                &larr; Voltar para o site público
            </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AdminSigninPage;