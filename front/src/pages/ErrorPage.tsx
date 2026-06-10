import {
  useRouteError,
  isRouteErrorResponse,
  useNavigate,
} from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';

export function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();

  let title = 'Ops! Algo deu errado.';
  let message = 'Ocorreu um erro inesperado na aplicação.';

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      title = 'Página não encontrada';
      message = 'A rota que você tentou acessar não existe ou foi removida.';
    } else {
      title = `Erro ${error.status}`;
      message = error.statusText || error.data?.message || message;
    }
  } else if (error instanceof Error) {
    message = error.message;
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-background p-6 text-center">
      <div className="mx-auto flex max-w-md flex-col items-center gap-6">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10">
          <AlertCircle className="h-10 w-10 text-destructive" />
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
          <p className="text-muted-foreground">{message}</p>
        </div>

        <div className="flex gap-4">
          <Button variant="outline" onClick={() => window.location.reload()}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Tentar Novamente
          </Button>
          <Button onClick={() => navigate('/')}>
            <Home className="mr-2 h-4 w-4" />
            Voltar ao Início
          </Button>
        </div>
      </div>
    </div>
  );
}
