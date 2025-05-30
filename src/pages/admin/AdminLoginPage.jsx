import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { motion } from 'framer-motion';
import { LogIn, Mail, KeyRound, Loader2 } from 'lucide-react';

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login, loading, isAuthenticated, checkUser } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    checkUser();
  }, [checkUser]);

  useEffect(() => {
    if (isAuthenticated && !loading) {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [isAuthenticated, loading, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast({
        title: 'Campos obrigatórios',
        description: 'Por favor, preencha email e senha.',
        variant: 'destructive',
      });
      return;
    }

    const { user, error } = await login(email, password);

    if (user) {
      navigate('/admin/dashboard', { replace: true });
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'circOut' } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  };

  if (loading && !email) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-cream via-brand-gold/10 to-brand-cream p-4">
        <Loader2 className="h-12 w-12 text-brand-gold animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-cream via-brand-gold/10 to-brand-cream p-4">
      <motion.div
        className="w-full max-w-md bg-card p-8 md:p-10 rounded-2xl shadow-card-elegant border border-brand-gold/30"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="text-center mb-8">
          <h1 className="text-4xl font-cursive text-brand-gold">Acesso Admin</h1>
          <p className="text-brand-chocolate/80 font-sans mt-1">Cida Bolos Personalizados</p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div variants={itemVariants} className="space-y-2">
            <Label htmlFor="email" className="text-brand-chocolate font-semibold">Email</Label>
            <div className="relative">
              <Input
                id="email"
                type="email"
                placeholder="admin@example.com"
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
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="pl-10 bg-brand-cream/70 focus:border-brand-gold text-brand-chocolate placeholder:text-brand-light-brown"
                autoComplete="current-password"
              />
              <KeyRound className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-brand-light-brown" />
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Button type="submit" className="w-full cta-button text-lg" disabled={loading} size="lg">
              {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <LogIn className="mr-2 h-5 w-5" />}
              {loading ? 'Entrando...' : 'Entrar'}
            </Button>
          </motion.div>
        </form>

        <motion.div variants={itemVariants} className="mt-6 text-center font-sans text-sm">
          <p className="text-brand-chocolate/80">
            Não tem uma conta?{' '}
            <Link to="/admin/signin" className="font-medium text-brand-gold hover:text-brand-burnt-orange hover:underline">
              Criar conta admin
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

export default AdminLoginPage;