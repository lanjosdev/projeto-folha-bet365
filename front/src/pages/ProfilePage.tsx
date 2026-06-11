import { ProfileForm } from '@/features/profile/components/ProfileForm';
import { PasswordForm } from '@/features/profile/components/PasswordForm';
import { Separator } from '@/components/ui/separator';

export function ProfilePage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Meu Perfil</h2>
      </div>

      <div className="space-y-8 mt-8">
        <section>
          <div className="mb-4">
            <h3 className="text-lg font-medium">Dados Pessoais</h3>
            <p className="text-sm text-muted-foreground">
              Atualize seu nome e endereço de e-mail.
            </p>
          </div>
          <ProfileForm />
        </section>

        <Separator />

        <section>
          <div className="mb-4">
            <h3 className="text-lg font-medium">Segurança</h3>
            <p className="text-sm text-muted-foreground">
              Altere sua senha para manter sua conta segura.
            </p>
          </div>
          <PasswordForm />
        </section>
      </div>
    </div>
  );
}
