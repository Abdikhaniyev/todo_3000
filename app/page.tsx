import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import LoginForm from '@/widgets/login-form';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24 bg-gradient-to-b from-background to-muted/50">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">
            TODO{' '}
            <Badge variant="secondary" className="tracking-normal">
              3000
            </Badge>
          </h1>
          <p className="text-muted-foreground">Продвинутый менеджер задач с AI-ассистентом</p>
        </div>

        <LoginForm />

        <div className="text-center text-sm text-muted-foreground">
          Нет аккаунта?{' '}
          <Link href="/register" className="underline underline-offset-4 hover:text-primary">
            Зарегистрироваться
          </Link>
        </div>
      </div>
    </main>
  );
}
