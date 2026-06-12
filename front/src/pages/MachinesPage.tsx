import { useState } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { 
  MoreHorizontal, 
  Archive, 
  ArchiveRestore, 
  Trash2, 
  Server, 
  AlertCircle,
  Edit2
} from 'lucide-react';

import { 
  useMachines, 
  useArchiveMachine, 
  useRestoreMachine, 
  useDeleteMachine,
  useUpdateMachineAlias,
  type MachineStatus,
  type Machine
} from '@/features/machines';

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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
} from '@/components/ui/pagination';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Spinner } from '@/components/ui/spinner';
import { 
  Empty, 
  EmptyHeader, 
  EmptyTitle, 
  EmptyDescription, 
  EmptyMedia 
} from '@/components/ui/empty';

export function MachinesPage() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [status, setStatus] = useState<MachineStatus>('ACTIVE');

  const { data, isLoading, isError } = useMachines({ page, limit, status });
  const archiveMutation = useArchiveMachine();
  const restoreMutation = useRestoreMachine();
  const deleteMutation = useDeleteMachine();
  const updateAliasMutation = useUpdateMachineAlias();

  const [editingMachine, setEditingMachine] = useState<Machine | null>(null);
  const [aliasInput, setAliasInput] = useState('');

  const handleEditAlias = (machine: Machine) => {
    setEditingMachine(machine);
    setAliasInput(machine.name || '');
  };

  const handleSaveAlias = () => {
    if (!editingMachine) return;
    updateAliasMutation.mutate(
      { id: editingMachine.id, name: aliasInput },
      {
        onSuccess: () => {
          setEditingMachine(null);
        }
      }
    );
  };

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus as MachineStatus);
    setPage(1); // Reset page on status change
  };

  const handleLimitChange = (newLimit: string) => {
    setLimit(Number(newLimit));
    setPage(1); // Reset page on limit change
  };

  const handleArchive = (id: string) => archiveMutation.mutate(id);
  const handleRestore = (id: string) => restoreMutation.mutate(id);
  const handleDelete = (id: string) => {
    if (confirm('Tem certeza que deseja excluir esta máquina definitivamente?')) {
      deleteMutation.mutate(id);
    }
  };

  const results = data?.data.results || [];
  const meta = data?.data.meta;

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Máquinas</h1>
          <p className="text-muted-foreground">
            Gerenciamento e monitoramento de máquinas cadastradas.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <Tabs value={status} onValueChange={handleStatusChange}>
            <TabsList>
              <TabsTrigger value="ACTIVE">Ativos</TabsTrigger>
              <TabsTrigger value="ARCHIVED">Arquivados</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="rounded-lg border bg-card text-card-foreground shadow-xs">
        {isLoading ? (
          <div className="flex h-64 flex-col items-center justify-center gap-4 text-muted-foreground">
            <Spinner className="size-8" />
            <p>Carregando máquinas...</p>
          </div>
        ) : isError ? (
          <Empty className="h-64 border-0">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <AlertCircle className="text-destructive" />
              </EmptyMedia>
              <EmptyTitle>Erro ao carregar</EmptyTitle>
              <EmptyDescription>
                Não foi possível buscar as máquinas no momento. Tente novamente mais tarde.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : results.length === 0 ? (
          <Empty className="h-64 border-0">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <Server className="text-muted-foreground" />
              </EmptyMedia>
              <EmptyTitle>Nenhuma máquina encontrada</EmptyTitle>
              <EmptyDescription>
                {status === 'ACTIVE' 
                  ? "Ainda não há máquinas ativas cadastradas no sistema."
                  : "Nenhuma máquina foi arquivada até o momento."}
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[300px]">ID da Máquina</TableHead>
                  <TableHead>Nome/Apelido</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Data de Cadastro</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {results.map((machine) => (
                  <TableRow key={machine.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <Server className="size-4 text-muted-foreground" />
                        {machine.id}
                      </div>
                    </TableCell>
                    <TableCell>
                      {machine.name ? (
                        <span className="font-medium">{machine.name}</span>
                      ) : (
                        <span className="text-muted-foreground italic text-sm">Sem apelido</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={machine.status === 'ACTIVE' ? 'default' : 'secondary'}
                      >
                        {machine.status === 'ACTIVE' ? 'Ativo' : 'Arquivado'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {format(new Date(machine.createdAt), "dd/MM/yyyy HH:mm", { locale: ptBR })}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="size-8">
                            <span className="sr-only">Abrir menu</span>
                            <MoreHorizontal className="size-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[160px]">
                          <DropdownMenuLabel>Ações</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleEditAlias(machine)}>
                            <Edit2 className="mr-2 size-4" />
                            Editar Apelido
                          </DropdownMenuItem>
                          {machine.status === 'ACTIVE' ? (
                            <DropdownMenuItem onClick={() => handleArchive(machine.id)}>
                              <Archive className="mr-2 size-4" />
                              Arquivar
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem onClick={() => handleRestore(machine.id)}>
                              <ArchiveRestore className="mr-2 size-4" />
                              Restaurar
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            variant="destructive"
                            onClick={() => handleDelete(machine.id)}
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

            <div className="flex items-center justify-between border-t px-4 py-3">
              <div className="flex items-center gap-2">
                <p className="text-sm text-muted-foreground">
                  Itens por página:
                </p>
                <Select value={String(limit)} onValueChange={handleLimitChange}>
                  <SelectTrigger className="h-8 w-[70px]">
                    <SelectValue placeholder="10" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {meta && meta.totalPages > 1 && (
                <Pagination className="mx-0 w-auto">
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        className={page === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                      />
                    </PaginationItem>
                    
                    <PaginationItem>
                      <span className="text-sm text-muted-foreground mx-4">
                        Página {meta.page} de {meta.totalPages}
                      </span>
                    </PaginationItem>

                    <PaginationItem>
                      <PaginationNext 
                        onClick={() => setPage((p) => Math.min(meta.totalPages, p + 1))}
                        className={page === meta.totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              )}
            </div>
          </>
        )}
      </div>

      <Dialog open={!!editingMachine} onOpenChange={(open) => !open && setEditingMachine(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Apelido da Máquina</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="alias">Nome / Apelido</Label>
              <Input
                id="alias"
                placeholder="Ex: Máquina Produção 01"
                value={aliasInput}
                onChange={(e) => setAliasInput(e.target.value)}
                autoFocus
              />
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setEditingMachine(null)}
              disabled={updateAliasMutation.isPending}
            >
              Cancelar
            </Button>
            <Button 
              onClick={handleSaveAlias}
              disabled={updateAliasMutation.isPending}
            >
              {updateAliasMutation.isPending ? 'Salvando...' : 'Salvar'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
