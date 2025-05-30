import { useBookings } from '@/hooks/useBookings';
import { useProjects } from '@/hooks/useProjects';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CalendarClock, LayoutGrid, MessageSquarePlus, Users, Loader2, Settings as SettingsIcon, PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const StatCard = ({ title, value, icon, description, linkTo, colorClass, isLoading }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <motion.div variants={cardVariants}>
      <Card className={`shadow-card-elegant hover:shadow-xl transition-shadow duration-300 border-l-4 ${colorClass} bg-card`}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-semibold text-brand-chocolate">{title}</CardTitle>
          {icon}
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Loader2 className="h-8 w-8 animate-spin text-brand-gold" />
          ) : (
            <div className="text-4xl font-bold text-brand-chocolate">{value}</div>
          )}
          <p className="text-xs text-brand-light-brown pt-1">{description}</p>
          {linkTo && (
            <Link to={linkTo.path}>
              <Button variant="link" className="px-0 pt-2 text-brand-gold hover:text-brand-burnt-orange">
                {linkTo.label} &rarr;
              </Button>
            </Link>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

const AdminDashboardPage = () => {
  const { bookings, loading: bookingsLoading } = useBookings();
  const { projects, loading: projectsLoading } = useProjects();

  // Estatísticas dinâmicas
  const pendingBookings = bookings.filter(b => b.status === 'pending').length;
  const totalProjects = projects.length;

  // Novos leads: agendamentos na última semana
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const newLeads = bookings.filter(b => new Date(b.booking_date) >= oneWeekAgo).length;

  // Clientes totais: número de nomes únicos
  const totalCustomers = new Set(bookings.map(b => b.customer_name)).size;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

  return (
    <motion.div
      className="space-y-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div variants={{ hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } }}>
        <h1 className="text-4xl font-cursive text-brand-gold">Dashboard</h1>
        <p className="text-brand-chocolate/80 font-sans">Visão geral do seu ateliê de bolos.</p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Agendamentos Pendentes"
          value={pendingBookings}
          icon={<CalendarClock className="h-6 w-6 text-brand-burnt-orange" />}
          description="Pedidos aguardando sua confirmação."
          linkTo={{ path: '/admin/bookings', label: 'Ver Agendamentos' }}
          colorClass="border-brand-burnt-orange"
          isLoading={bookingsLoading}
        />
        <StatCard
          title="Total de Projetos"
          value={totalProjects}
          icon={<LayoutGrid className="h-6 w-6 text-blue-500" />}
          description="Bolos cadastrados no portfólio."
          linkTo={{ path: '/admin/projects', label: 'Gerenciar Projetos' }}
          colorClass="border-blue-500"
          isLoading={projectsLoading}
        />
        <StatCard
          title="Novos Contatos (7 dias)"
          value={newLeads}
          icon={<MessageSquarePlus className="h-6 w-6 text-green-600" />}
          description="Leads recebidos na última semana."
          linkTo={{ path: '/admin/bookings', label: 'Ver Contatos' }}
          colorClass="border-green-600"
          isLoading={bookingsLoading}
        />
        <StatCard
          title="Clientes Totais"
          value={totalCustomers}
          icon={<Users className="h-6 w-6 text-purple-600" />}
          description="Número de clientes únicos atendidos."
          colorClass="border-purple-600"
          isLoading={bookingsLoading}
        />
      </div>

      <motion.div
        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        <Card className="shadow-card-elegant bg-card">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-brand-chocolate">Agendamentos Recentes</CardTitle>
            <CardDescription className="text-sm text-brand-light-brown">Últimos 5 pedidos recebidos.</CardDescription>
          </CardHeader>
          <CardContent>
            {bookingsLoading ? (
              <div className="flex justify-center items-center h-32">
                <Loader2 className="h-8 w-8 animate-spin text-brand-gold" />
              </div>
            ) : bookings.length > 0 ? (
              <ul className="space-y-3">
                {bookings.slice(0, 5).map(booking => (
                  <li key={booking.id} className="flex justify-between items-center p-3 bg-brand-cream/50 rounded-lg hover:bg-brand-cream transition-colors border border-brand-gold/20">
                    <div>
                      <p className="font-medium text-brand-chocolate">{booking.customer_name} - {booking.flavor}</p>
                      <p className="text-xs text-brand-light-brown">
                        Data: {new Date(booking.booking_date).toLocaleDateString('pt-BR')} - Status: <span className={`font-semibold ${booking.status === 'pending' ? 'text-brand-burnt-orange' : booking.status === 'confirmed' ? 'text-green-600' : 'text-red-600'}`}>{booking.status}</span>
                      </p>
                    </div>
                    <Link to={`/admin/bookings`}>
                      <Button variant="outline" size="sm" className="text-xs border-brand-gold text-brand-chocolate hover:bg-brand-gold/20">Detalhes</Button>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-brand-light-brown py-8">Nenhum agendamento recente.</p>
            )}
          </CardContent>
        </Card>

        <Card className="shadow-card-elegant bg-card">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-brand-chocolate">Atalhos Rápidos</CardTitle>
            <CardDescription className="text-sm text-brand-light-brown">Acesse as principais seções rapidamente.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <Link to="/admin/projects/new">
              <Button variant="outline" className="w-full h-24 text-brand-chocolate border-brand-gold hover:bg-brand-gold/20 flex-col space-y-1">
                <PlusCircle className="h-7 w-7 text-brand-gold" />
                <span>Novo Projeto</span>
              </Button>
            </Link>
            <Link to="/admin/bookings">
              <Button variant="outline" className="w-full h-24 text-brand-chocolate border-brand-gold hover:bg-brand-gold/20 flex-col space-y-1">
                <CalendarClock className="h-7 w-7 text-brand-gold" />
                <span>Agendamentos</span>
              </Button>
            </Link>
            <Link to="/admin/settings">
              <Button variant="outline" className="w-full h-24 text-brand-chocolate border-brand-gold hover:bg-brand-gold/20 flex-col space-y-1">
                <SettingsIcon className="h-7 w-7 text-brand-gold" />
                <span>Configurações</span>
              </Button>
            </Link>
            <Link to="/contact" target="_blank">
              <Button variant="outline" className="w-full h-24 text-brand-chocolate border-brand-gold hover:bg-brand-gold/20 flex-col space-y-1">
                <MessageSquarePlus className="h-7 w-7 text-brand-gold" />
                <span>Pág. Contato</span>
              </Button>
            </Link>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default AdminDashboardPage;
