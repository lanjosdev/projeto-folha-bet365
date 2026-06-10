import { useAuth } from '@/contexts/auth';

export function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Bem-vindo(a) de volta, {user?.name || 'Usuário'}!
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-lg border bg-card/50 p-6 shadow-xs">
          <h3 className="font-semibold">Resumo</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            O painel está pronto para receber os componentes reais.
          </p>
        </div>
        <div className="rounded-lg border bg-card/50 p-6 shadow-xs">
          <h3 className="font-semibold">Atividades</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Área para lista de atividades recentes.
          </p>
        </div>
        <div className="rounded-lg border bg-card/50 p-6 shadow-xs">
          <h3 className="font-semibold">Configurações</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Acesse suas configurações de perfil.
          </p>
        </div>
      </div>
    </div>
  );
}
