import React, { useState, useMemo } from 'react';
import { useBookings } from '@/hooks/useBookings';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { MoreHorizontal, Search, Filter, Loader2, Trash2, CheckCircle, XCircle, Clock, Phone } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';
import { useSettings } from '@/contexts/SettingsContext';

const AdminBookingsPage = () => {
  const { bookings, loading, updateBookingStatus, deleteBooking } = useBookings();
  const { settings } = useSettings();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('desc');
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [bookingToDelete, setBookingToDelete] = useState(null);

  const filteredAndSortedBookings = useMemo(() => {
    return bookings
      .filter(booking => 
        (booking.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
         booking.flavor?.toLowerCase().includes(searchTerm.toLowerCase()) ||
         booking.message?.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (statusFilter === 'all' || booking.status === statusFilter)
      )
      .sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
      });
  }, [bookings, searchTerm, statusFilter, sortOrder]);

  const handleStatusChange = async (id, newStatus) => {
    await updateBookingStatus(id, newStatus);
    toast({ title: "Status Atualizado", description: `Agendamento ${id} agora está ${newStatus}.` });
  };

  const openDeleteDialog = (booking) => {
    setBookingToDelete(booking);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (bookingToDelete) {
      await deleteBooking(bookingToDelete.id);
      toast({ title: "Agendamento Excluído", description: `O agendamento de ${bookingToDelete.name || 'ID ' + bookingToDelete.id} foi excluído.`, variant: "destructive" });
      setBookingToDelete(null);
    }
    setIsDeleteDialogOpen(false);
  };
  
  const getStatusPill = (status) => {
    let colors = 'text-gray-700 bg-gray-200 border-gray-300';
    if (status === 'pending') colors = 'text-orange-700 bg-orange-100 border-orange-300';
    if (status === 'confirmed') colors = 'text-green-700 bg-green-100 border-green-300';
    if (status === 'cancelled') colors = 'text-red-700 bg-red-100 border-red-300';
    return `px-3 py-1 text-xs font-semibold rounded-full border ${colors}`;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  const handleContactClient = (booking) => {
    const clientName = booking.name || "Cliente";
    const cakeFlavor = booking.flavor;
    const eventDate = new Date(booking.date).toLocaleDateString('pt-BR');
    const message = encodeURIComponent(`Olá ${clientName}, sobre seu pedido do bolo de ${cakeFlavor} para o dia ${eventDate}...`);
    const clientPhoneNumber = booking.phone || settings.whatsappNumber; 
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${clientPhoneNumber.replace(/\D/g, '')}&text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <motion.div 
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <h1 className="text-4xl font-cursive text-brand-gold">Gerenciar Agendamentos</h1>
        <p className="text-brand-chocolate/80 font-sans">Visualize e administre todos os pedidos de bolo.</p>
      </motion.div>

      <motion.div variants={itemVariants} className="flex flex-col md:flex-row gap-4 p-4 bg-card rounded-lg shadow-card-elegant border border-brand-gold/20">
        <div className="relative flex-grow">
          <Input 
            type="text"
            placeholder="Buscar por cliente, sabor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-brand-cream/70 focus:border-brand-gold text-brand-chocolate placeholder:text-brand-light-brown"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-brand-light-brown" />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full md:w-[180px] bg-brand-cream/70 focus:border-brand-gold text-brand-chocolate">
            <Filter className="h-4 w-4 mr-2 text-brand-light-brown inline-block" />
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent className="bg-brand-cream border-brand-gold/50">
            <SelectItem value="all" className="text-brand-chocolate focus:bg-brand-gold/20">Todos Status</SelectItem>
            <SelectItem value="pending" className="text-brand-chocolate focus:bg-brand-gold/20">Pendente</SelectItem>
            <SelectItem value="confirmed" className="text-brand-chocolate focus:bg-brand-gold/20">Confirmado</SelectItem>
            <SelectItem value="cancelled" className="text-brand-chocolate focus:bg-brand-gold/20">Cancelado</SelectItem>
          </SelectContent>
        </Select>
        <Select value={sortOrder} onValueChange={setSortOrder}>
          <SelectTrigger className="w-full md:w-[180px] bg-brand-cream/70 focus:border-brand-gold text-brand-chocolate">
            <SelectValue placeholder="Ordenar por data" />
          </SelectTrigger>
          <SelectContent className="bg-brand-cream border-brand-gold/50">
            <SelectItem value="desc" className="text-brand-chocolate focus:bg-brand-gold/20">Mais Recentes</SelectItem>
            <SelectItem value="asc" className="text-brand-chocolate focus:bg-brand-gold/20">Mais Antigos</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>

      <motion.div variants={itemVariants} className="bg-card rounded-lg shadow-card-elegant overflow-x-auto border border-brand-gold/20">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-12 w-12 text-brand-gold animate-spin" />
            <p className="ml-4 text-xl text-brand-chocolate font-sans">Carregando agendamentos...</p>
          </div>
        ) : filteredAndSortedBookings.length > 0 ? (
          <Table>
            <TableHeader className="bg-brand-cream/30">
              <TableRow>
                <TableHead className="text-brand-chocolate">Cliente</TableHead>
                <TableHead className="text-brand-chocolate">Data Evento</TableHead>
                <TableHead className="text-brand-chocolate">Sabor</TableHead>
                <TableHead className="text-brand-chocolate">Status</TableHead>
                <TableHead className="text-brand-chocolate">Criado Em</TableHead>
                <TableHead className="text-right text-brand-chocolate">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAndSortedBookings.map((booking) => (
                <TableRow key={booking.id} className="hover:bg-brand-gold/10">
                  <TableCell className="font-medium text-brand-chocolate">{booking.name || 'N/A'}</TableCell>
                  <TableCell className="text-brand-chocolate/90">{new Date(booking.date).toLocaleDateString('pt-BR')}</TableCell>
                  <TableCell className="max-w-xs truncate text-brand-chocolate/90">{booking.flavor}</TableCell>
                  <TableCell>
                    <span className={getStatusPill(booking.status)}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell className="text-brand-chocolate/90">{new Date(booking.createdAt).toLocaleDateString('pt-BR')}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0 text-brand-chocolate hover:bg-brand-gold/20">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-brand-cream border-brand-gold/50 shadow-lg">
                        <DropdownMenuItem onClick={() => handleContactClient(booking)} className="text-brand-chocolate hover:!bg-brand-gold/20 hover:!text-brand-gold">
                          <Phone className="mr-2 h-4 w-4" /> Entrar em Contato
                        </DropdownMenuItem>
                        {booking.status !== 'confirmed' && (
                          <DropdownMenuItem onClick={() => handleStatusChange(booking.id, 'confirmed')} className="text-green-700 hover:!bg-green-100 hover:!text-green-800">
                            <CheckCircle className="mr-2 h-4 w-4" /> Marcar Confirmado
                          </DropdownMenuItem>
                        )}
                        {booking.status !== 'pending' && (
                           <DropdownMenuItem onClick={() => handleStatusChange(booking.id, 'pending')} className="text-orange-700 hover:!bg-orange-100 hover:!text-orange-800">
                            <Clock className="mr-2 h-4 w-4" /> Marcar Pendente
                          </DropdownMenuItem>
                        )}
                        {booking.status !== 'cancelled' && (
                          <DropdownMenuItem onClick={() => handleStatusChange(booking.id, 'cancelled')} className="text-red-700 hover:!bg-red-100 hover:!text-red-800">
                            <XCircle className="mr-2 h-4 w-4" /> Marcar Cancelado
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem onClick={() => openDeleteDialog(booking)} className="text-red-700 hover:!bg-red-100 hover:!text-red-800">
                          <Trash2 className="mr-2 h-4 w-4" /> Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p className="text-center text-brand-light-brown py-16 font-sans">Nenhum agendamento encontrado.</p>
        )}
      </motion.div>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent className="bg-card border-brand-gold/30">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-brand-gold">Confirmar Exclusão</AlertDialogTitle>
            <AlertDialogDescription className="text-brand-chocolate/80">
              Tem certeza que deseja excluir o agendamento de {bookingToDelete?.name || 'ID ' + bookingToDelete?.id} para o bolo de {bookingToDelete?.flavor}? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-brand-gold text-brand-chocolate hover:bg-brand-gold/20">Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700 text-white">Excluir</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </motion.div>
  );
};

export default AdminBookingsPage;