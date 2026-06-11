import { useEffect } from 'react';
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
import { useGetProfile, useUpdateProfile } from '../hooks/useProfile';
import { updateProfileSchema, type UpdateProfileInput } from '../schemas/profileSchema';
import { Loader2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export function ProfileForm() {
  const { data: profile, isLoading } = useGetProfile();
  const { mutate: updateProfile, isPending } = useUpdateProfile();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<UpdateProfileInput>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: '',
      email: '',
    },
  });

  // Atualiza os campos do formulário quando os dados do perfil carregarem
  useEffect(() => {
    if (profile) {
      reset({
        name: profile.name,
        email: profile.email,
      });
    }
  }, [profile, reset]);

  const onSubmit = (data: UpdateProfileInput) => {
    updateProfile(data);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-32" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-md">
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="name">Nome</FieldLabel>
          <FieldContent>
            <Input
              id="name"
              type="text"
              placeholder="Seu nome"
              {...register('name')}
              disabled={isPending}
            />
            <FieldError errors={[errors.name]} />
          </FieldContent>
        </Field>

        <Field>
          <FieldLabel htmlFor="email">E-mail</FieldLabel>
          <FieldContent>
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              {...register('email')}
              disabled={isPending}
            />
            <FieldError errors={[errors.email]} />
          </FieldContent>
        </Field>
      </FieldGroup>

      <Button type="submit" disabled={isPending || !isDirty}>
        {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Salvar Alterações
      </Button>
    </form>
  );
}
