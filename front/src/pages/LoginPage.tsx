import { LoginForm } from '@/features/auth';

export function LoginPage() {
  return (
    <div className="flex min-h-dvh">
      {/* Left side: Branding / Image */}
      <div className="relative hidden w-1/2 flex-col justify-center overflow-hidden bg-zinc-900 p-10 text-white lg:flex">
        {/* Simple gradient background effect */}
        <div className="absolute inset-0 bg-linear-to-br from-zinc-800 to-zinc-950" />

        <div className="relative z-10 flex items-center gap-2">
          {/* Logo Placeholder */}
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary font-bold text-primary-foreground">
            FB
          </div>
          <span className="text-xl font-bold tracking-tight">
            Folha Bet365 Admin
          </span>
        </div>

        {/* <div className="relative z-10 mt-auto max-w-md">
          <blockquote className="space-y-2">
            <p className="text-lg leading-relaxed font-medium">
              "Esta plataforma fornece todas as ferramentas necessárias para
              gerenciar nossas operações com eficiência, segurança e
              modernidade."
            </p>
            <footer className="text-sm text-zinc-400">
              Diretoria Operacional
            </footer>
          </blockquote>
        </div> */}
      </div>

      {/* Right side: Login Form */}
      <div className="flex w-full flex-col justify-center px-8 sm:px-12 lg:w-1/2 xl:px-24">
        <div className="mx-auto w-full max-w-sm">
          <div className="mb-8 flex flex-col space-y-2 text-center lg:text-left">
            <h1 className="text-3xl font-semibold tracking-tight">
              Entrar na conta
            </h1>
            <p className="text-sm text-muted-foreground">
              Insira seu e-mail e senha para acessar o painel
            </p>
          </div>

          <LoginForm />

          {/* <p className="mt-8 text-center text-sm text-muted-foreground lg:text-left">
            Ao entrar, você concorda com nossos{' '}
            <a
              href="#"
              className="underline underline-offset-4 hover:text-primary"
            >
              Termos de Serviço
            </a>{' '}
            e{' '}
            <a
              href="#"
              className="underline underline-offset-4 hover:text-primary"
            >
              Política de Privacidade
            </a>
            .
          </p> */}
        </div>
      </div>
    </div>
  );
}
