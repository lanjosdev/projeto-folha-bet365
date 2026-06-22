import { useState } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {
  MoreHorizontal,
  Trash2,
  Users,
  User as UserIcon,
  AlertCircle,
  Edit2,
  LayoutList,
  LayoutGrid,
} from 'lucide-react';

import {
  useUsers,
  useCreateUser,
  useUpdateUser,
  useDeleteUser,
  type User,
} from '@/features/users';

import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyMedia,
} from '@/components/ui/empty';
import { toast } from 'sonner';

export function UsersPage() {
  const [viewMode, setViewMode] = useState<'list' | 'grid'>(
    typeof window !== 'undefined' && window.innerWidth < 768 ? 'grid' : 'list'
  );

  const { data, isLoading, isError } = useUsers();
  const createMutation = useCreateUser();
  const updateMutation = useUpdateUser();
  const deleteMutation = useDeleteUser();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleOpenCreate = () => {
    setEditingUser(null);
    setFormData({ name: '', email: '', password: '' });
    setIsDialogOpen(true);
  };

  const handleOpenEdit = (user: User) => {
    setEditingUser(user);
    setFormData({ name: user.name, email: user.email, password: '' }); // Não preenchemos a senha ao editar
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingUser(null);
  };

  const handleSave = () => {
    // Basic validation
    if (!formData.name || !formData.email) {
      toast.error('Preencha os campos obrigatórios (nome e e-mail).');
      return;
    }

    if (editingUser) {
      updateMutation.mutate(
        { 
          id: editingUser.id, 
          data: {
            name: formData.name,
            email: formData.email,
            ...(formData.password ? { password: formData.password } : {})
          } 
        },
        {
          onSuccess: () => {
            toast.success('Usuário atualizado com sucesso!');
            handleCloseDialog();
          },
          onError: () => toast.error('Erro ao atualizar o usuário.')
        }
      );
    } else {
      if (!formData.password) {
        toast.error('A senha é obrigatória para novos usuários.');
        return;
      }
      createMutation.mutate(
        { 
          name: formData.name,
          email: formData.email,
          password: formData.password
        },
        {
          onSuccess: () => {
            toast.success('Usuário criado com sucesso!');
            handleCloseDialog();
          },
          onError: () => toast.error('Erro ao criar o usuário.')
        }
      );
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Tem certeza que deseja excluir este usuário definitivamente?')) {
      deleteMutation.mutate(id, {
        onSuccess: () => toast.success('Usuário excluído com sucesso!'),
        onError: () => toast.error('Erro ao excluir usuário.')
      });
    }
  };

  const results = data?.data || [];

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight">Usuários</h1>
          </div>
          <p className="mt-1 text-muted-foreground">
            Gerenciamento de usuários do sistema.
          </p>
        </div>

        <div className="flex justify-end gap-4 sm:items-center">
          <ToggleGroup
            type="single"
            value={viewMode}
            onValueChange={(v) => v && setViewMode(v as 'list' | 'grid')}
            className="h-9 rounded-full bg-muted p-1"
          >
            <ToggleGroupItem
              value="list"
              aria-label="Modo Lista"
              className="h-full rounded-full px-3 text-foreground/60 transition-all hover:text-foreground data-[state=on]:bg-background data-[state=on]:text-foreground data-[state=on]:shadow-xs dark:data-[state=on]:bg-input/30"
            >
              <LayoutList className="size-4" />
            </ToggleGroupItem>
            <ToggleGroupItem
              value="grid"
              aria-label="Modo Grade"
              className="h-full rounded-full px-3 text-foreground/60 transition-all hover:text-foreground data-[state=on]:bg-background data-[state=on]:text-foreground data-[state=on]:shadow-xs dark:data-[state=on]:bg-input/30"
            >
              <LayoutGrid className="size-4" />
            </ToggleGroupItem>
          </ToggleGroup>

          <Button onClick={handleOpenCreate}>Novo Usuário</Button>
        </div>
      </div>

      <div className="rounded-lg border bg-card text-card-foreground shadow-xs">
        {isLoading ? (
          <div className="flex h-64 flex-col items-center justify-center gap-4 text-muted-foreground">
            <Spinner className="size-8" />
            <p>Carregando usuários...</p>
          </div>
        ) : isError ? (
          <Empty className="h-64 border-0">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <AlertCircle className="text-destructive" />
              </EmptyMedia>
              <EmptyTitle>Erro ao carregar</EmptyTitle>
              <EmptyDescription>
                Não foi possível buscar os usuários no momento. Tente novamente
                mais tarde.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : results.length === 0 ? (
          <Empty className="h-64 border-0">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <Users className="text-muted-foreground" />
              </EmptyMedia>
              <EmptyTitle>Nenhum usuário encontrado</EmptyTitle>
              <EmptyDescription>
                Ainda não há usuários cadastrados no sistema.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          <>
            {viewMode === 'list' ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>E-mail</TableHead>
                    <TableHead>Data de Cadastro</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {results.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <UserIcon className="size-4 text-muted-foreground" />
                          {user.name}
                        </div>
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        {format(
                          new Date(user.createdAt),
                          'dd/MM/yyyy HH:mm',
                          { locale: ptBR }
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="size-8"
                            >
                              <span className="sr-only">Abrir menu</span>
                              <MoreHorizontal className="size-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            align="end"
                            className="w-[160px]"
                          >
                            <DropdownMenuLabel>Ações</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => handleOpenEdit(user)}
                            >
                              <Edit2 className="mr-2 size-4" />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              variant="destructive"
                              onClick={() => handleDelete(user.id)}
                            >
                              <Trash2 className="mr-2 size-4" />
                              Excluir
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3">
                {results.map((user) => (
                  <Card key={user.id}>
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="rounded-md bg-muted p-2">
                            <UserIcon className="size-5 text-muted-foreground" />
                          </div>
                          <div className="overflow-hidden">
                            <CardTitle className="truncate text-base" title={user.name}>
                              {user.name}
                            </CardTitle>
                            <CardDescription
                              className="mt-0.5 truncate text-xs"
                              title={user.email}
                            >
                              {user.email}
                            </CardDescription>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="-mr-2 size-8 shrink-0"
                            >
                              <span className="sr-only">Abrir menu</span>
                              <MoreHorizontal className="size-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            align="end"
                            className="w-[160px]"
                          >
                            <DropdownMenuLabel>Ações</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => handleOpenEdit(user)}
                            >
                              <Edit2 className="mr-2 size-4" />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              variant="destructive"
                              onClick={() => handleDelete(user.id)}
                            >
                              <Trash2 className="mr-2 size-4" />
                              Excluir
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col gap-2.5">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">
                            Cadastro
                          </span>
                          <span>
                            {format(
                              new Date(user.createdAt),
                              'dd/MM/yyyy HH:mm',
                              { locale: ptBR }
                            )}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      <Dialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingUser ? 'Editar Usuário' : 'Novo Usuário'}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nome completo</Label>
              <Input
                id="name"
                placeholder="Ex: João Silva"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="Ex: joao@exemplo.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder={editingUser ? "Deixe em branco para manter a atual" : "Senha forte"}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={handleCloseDialog}
              disabled={createMutation.isPending || updateMutation.isPending}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSave}
              disabled={createMutation.isPending || updateMutation.isPending}
            >
              {(createMutation.isPending || updateMutation.isPending) ? 'Salvando...' : 'Salvar'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
