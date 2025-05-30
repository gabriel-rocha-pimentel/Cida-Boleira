import React, { useState, useMemo } from 'react';
import { useProjects } from '@/hooks/useProjects';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MoreHorizontal, Search, PlusCircle, Edit2, Trash2, Loader2, Image as ImageIcon, X } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const AdminProjectsPage = () => {
  const { projects, loading, addProject, updateProject, deleteProject } = useProjects();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [formData, setFormData] = useState({ title: '', description: '', theme: '', image_urls: [] });
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newImageDescription, setNewImageDescription] = useState('');

  const filteredProjects = useMemo(() => {
    return projects.filter(project =>
      project.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.theme?.toLowerCase().includes(searchTerm.toLowerCase())
    ).sort((a,b) => new Date(b.created_at) - new Date(a.created_at));
  }, [projects, searchTerm]);

  const handleOpenForm = (project = null) => {
    setCurrentProject(project);
    if (project) {
      setFormData({ title: project.title, description: project.description, theme: project.theme || '', image_urls: project.image_urls || [] });
    } else {
      setFormData({ title: '', description: '', theme: '', image_urls: [] });
    }
    setIsFormOpen(true);
  };

  const handleAddImageUrl = () => {
    if (newImageUrl.trim() && newImageDescription.trim()) {
      setFormData(prev => ({
        ...prev,
        image_urls: [...prev.image_urls, { url: newImageUrl.trim(), description: newImageDescription.trim() }]
      }));
      setNewImageUrl('');
      setNewImageDescription('');
    } else {
      toast({ title: "Erro", description: "URL e descrição da imagem são obrigatórios.", variant: "destructive" });
    }
  };

  const handleRemoveImageUrl = (index) => {
    setFormData(prev => ({
      ...prev,
      image_urls: prev.image_urls.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description) {
      toast({ title: "Campos obrigatórios", description: "Título e descrição são obrigatórios.", variant: "destructive" });
      return;
    }

    if (currentProject) {
      await updateProject(currentProject.id, formData);
      toast({ title: "Projeto Atualizado", description: `"${formData.title}" foi atualizado.` });
    } else {
      await addProject(formData);
      toast({ title: "Projeto Adicionado", description: `"${formData.title}" foi adicionado.` });
    }
    setIsFormOpen(false);
    setCurrentProject(null);
  };

  const openDeleteDialog = (project) => {
    setCurrentProject(project);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (currentProject) {
      await deleteProject(currentProject.id);
      toast({ title: "Projeto Excluído", description: `"${currentProject.title}" foi excluído.`, variant: "destructive" });
      setCurrentProject(null);
    }
    setIsDeleteDialogOpen(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <motion.div 
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-cursive text-brand-gold">Gerenciar Projetos</h1>
          <p className="text-brand-chocolate/80 font-sans">Adicione, edite ou remova bolos do seu portfólio.</p>
        </div>
        <Button onClick={() => handleOpenForm()} className="bg-brand-gold hover:bg-brand-burnt-orange text-brand-cream rounded-xl shadow-md">
          <PlusCircle className="mr-2 h-5 w-5" /> Adicionar Novo Projeto
        </Button>
      </motion.div>

      <motion.div variants={itemVariants} className="flex gap-4 p-4 bg-card rounded-lg shadow-card-elegant border border-brand-gold/20">
        <div className="relative flex-grow">
          <Input 
            type="text"
            placeholder="Buscar projetos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-brand-cream/70 focus:border-brand-gold text-brand-chocolate placeholder:text-brand-light-brown"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-brand-light-brown" />
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="bg-card rounded-lg shadow-card-elegant overflow-x-auto border border-brand-gold/20">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-12 w-12 text-brand-gold animate-spin" />
            <p className="ml-4 text-xl text-brand-chocolate font-sans">Carregando projetos...</p>
          </div>
        ) : filteredProjects.length > 0 ? (
          <Table>
            <TableHeader className="bg-brand-cream/30">
              <TableRow>
                <TableHead className="text-brand-chocolate">Imagem</TableHead>
                <TableHead className="text-brand-chocolate">Título</TableHead>
                <TableHead className="text-brand-chocolate">Tema</TableHead>
                <TableHead className="text-brand-chocolate">Criado Em</TableHead>
                <TableHead className="text-right text-brand-chocolate">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProjects.map((project) => (
                <TableRow key={project.id} className="hover:bg-brand-gold/10">
                  <TableCell>
                    <div className="w-16 h-16 rounded-md overflow-hidden bg-brand-cream/50 flex items-center justify-center border border-brand-gold/20">
                      {project.image_urls && project.image_urls.length > 0 ? (
                        <img src={project.image_urls[0].url} alt={project.title} class="w-full h-full object-cover" />
                      ) : (
                        <ImageIcon className="h-8 w-8 text-brand-light-brown" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium max-w-xs truncate text-brand-chocolate">{project.title}</TableCell>
                  <TableCell className="text-brand-chocolate/90">{project.theme || 'N/A'}</TableCell>
                  <TableCell className="text-brand-chocolate/90">{new Date(project.created_at).toLocaleDateString('pt-BR')}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0 text-brand-chocolate hover:bg-brand-gold/20">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-brand-cream border-brand-gold/50 shadow-lg">
                        <DropdownMenuItem onClick={() => handleOpenForm(project)} className="text-brand-chocolate hover:!bg-brand-gold/20 hover:!text-brand-gold">
                          <Edit2 className="mr-2 h-4 w-4" /> Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => openDeleteDialog(project)} className="text-red-700 hover:!bg-red-100 hover:!text-red-800">
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
          <p className="text-center text-brand-light-brown py-16 font-sans">Nenhum projeto encontrado.</p>
        )}
      </motion.div>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto bg-card border-brand-gold/30">
          <DialogHeader>
            <DialogTitle className="text-3xl font-cursive text-brand-gold">
              {currentProject ? 'Editar Projeto' : 'Novo Projeto'}
            </DialogTitle>
            <DialogDescription className="text-brand-chocolate/80">
              {currentProject ? 'Atualize os detalhes deste bolo.' : 'Adicione um novo bolo ao seu portfólio.'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 py-4">
            <div>
              <Label htmlFor="title" className="text-brand-chocolate font-semibold">Título do Bolo*</Label>
              <Input id="title" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} placeholder="Ex: Bolo de Casamento Floral Dourado" required className="bg-brand-cream/70 focus:border-brand-gold text-brand-chocolate placeholder:text-brand-light-brown"/>
            </div>
            <div>
              <Label htmlFor="description" className="text-brand-chocolate font-semibold">Descrição*</Label>
              <Textarea id="description" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} placeholder="Descreva os detalhes, ingredientes, para qual ocasião..." required rows={4} className="bg-brand-cream/70 focus:border-brand-gold text-brand-chocolate placeholder:text-brand-light-brown"/>
            </div>
            <div>
              <Label htmlFor="theme" className="text-brand-chocolate font-semibold">Tema (opcional)</Label>
              <Input id="theme" value={formData.theme} onChange={(e) => setFormData({...formData, theme: e.target.value})} placeholder="Ex: Infantil, Casamento, Aniversário" className="bg-brand-cream/70 focus:border-brand-gold text-brand-chocolate placeholder:text-brand-light-brown"/>
            </div>
            
            <div className="space-y-2">
              <Label className="text-brand-chocolate font-semibold">Imagens do Projeto</Label>
              <div className="space-y-2">
                {formData.image_urls.map((img, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 border border-brand-gold/20 rounded-md bg-brand-cream/50">
                    <ImageIcon className="h-5 w-5 text-brand-light-brown" />
                    <div className="flex-grow">
                      <p className="text-sm font-medium truncate text-brand-chocolate" title={img.url}>{img.url}</p>
                      <p className="text-xs text-brand-light-brown truncate" title={img.description}>{img.description}</p>
                    </div>
                    <Button type="button" variant="ghost" size="icon" onClick={() => handleRemoveImageUrl(index)} className="text-red-500 hover:bg-red-100">
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-2 items-end pt-2 border-t border-brand-gold/20 mt-2">
                <div className="flex-grow space-y-1">
                  <Label htmlFor="newImageUrl" className="text-xs text-brand-chocolate/80">URL da Imagem (Unsplash)</Label>
                  <Input id="newImageUrl" value={newImageUrl} onChange={(e) => setNewImageUrl(e.target.value)} placeholder="Cole a URL da imagem aqui" className="bg-brand-cream/70 focus:border-brand-gold text-brand-chocolate placeholder:text-brand-light-brown"/>
                </div>
                <div className="flex-grow space-y-1">
                  <Label htmlFor="newImageDescription" className="text-xs text-brand-chocolate/80">Descrição da Imagem (alt text)</Label>
                  <Input id="newImageDescription" value={newImageDescription} onChange={(e) => setNewImageDescription(e.target.value)} placeholder="Descreva a imagem" className="bg-brand-cream/70 focus:border-brand-gold text-brand-chocolate placeholder:text-brand-light-brown"/>
                </div>
                <Button type="button" variant="outline" onClick={handleAddImageUrl} className="w-full sm:w-auto border-brand-gold text-brand-chocolate hover:bg-brand-gold/20">Adicionar Imagem</Button>
              </div>
               <p className="text-xs text-brand-light-brown pt-1">Use URLs do Unsplash. As imagens serão substituídas por imagens reais do Unsplash pelo sistema.</p>
            </div>

            <DialogFooter className="pt-4">
              <DialogClose asChild>
                <Button type="button" variant="outline" className="border-brand-gold text-brand-chocolate hover:bg-brand-gold/20">Cancelar</Button>
              </DialogClose>
              <Button type="submit" className="bg-brand-gold hover:bg-brand-burnt-orange text-brand-cream">
                {currentProject ? 'Salvar Alterações' : 'Adicionar Projeto'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent className="bg-card border-brand-gold/30">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-brand-gold">Confirmar Exclusão</AlertDialogTitle>
            <AlertDialogDescription className="text-brand-chocolate/80">
              Tem certeza que deseja excluir o projeto "{currentProject?.title}"? Esta ação não pode ser desfeita e removerá o bolo do seu portfólio.
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

export default AdminProjectsPage;