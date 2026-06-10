import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldContent,
  FieldError,
} from '@/components/ui/field';
import { useLogin } from '../hooks/useLogin';
import { loginSchema, type LoginFormData } from '../schemas/loginSchema';
import { Loader2 } from 'lucide-react';

export function LoginForm() {
  const { mutate: login, isPending } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: LoginFormData) => {
    login(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="email">E-mail</FieldLabel>
          <FieldContent>
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              {...register('email')}
              autoComplete="email"
              disabled={isPending}
            />
            <FieldError errors={[errors.email]} />
          </FieldContent>
        </Field>

        <Field>
          <div className="flex items-center justify-between">
            <FieldLabel htmlFor="password">Senha</FieldLabel>
            {/* Adicione um Link para "Esqueci a senha" aqui no futuro, se necessário */}
          </div>
          <FieldContent>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              {...register('password')}
              autoComplete="current-password"
              disabled={isPending}
            />
            <FieldError errors={[errors.password]} />
          </FieldContent>
        </Field>
      </FieldGroup>

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Entrar
      </Button>
    </form>
  );
}
