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
import { useUpdatePassword } from '../hooks/useProfile';
import { updatePasswordSchema, type UpdatePasswordInput } from '../schemas/profileSchema';
import { Loader2 } from 'lucide-react';

export function PasswordForm() {
  const { mutate: updatePassword, isPending } = useUpdatePassword();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdatePasswordInput>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      oldPassword: '',
      newPassword: '',
    },
  });

  const onSubmit = (data: UpdatePasswordInput) => {
    updatePassword(data, {
      onSuccess: () => {
        // Limpa o formulário após sucesso
        reset();
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-md">
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="oldPassword">Senha Atual</FieldLabel>
          <FieldContent>
            <Input
              id="oldPassword"
              type="password"
              placeholder="••••••••"
              {...register('oldPassword')}
              disabled={isPending}
            />
            <FieldError errors={[errors.oldPassword]} />
          </FieldContent>
        </Field>

        <Field>
          <FieldLabel htmlFor="newPassword">Nova Senha</FieldLabel>
          <FieldContent>
            <Input
              id="newPassword"
              type="password"
              placeholder="••••••••"
              {...register('newPassword')}
              disabled={isPending}
            />
            <FieldError errors={[errors.newPassword]} />
          </FieldContent>
        </Field>
      </FieldGroup>

      <Button type="submit" disabled={isPending}>
        {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Atualizar Senha
      </Button>
    </form>
  );
}
