import Link from 'next/link';
import { Metadata } from 'next';

import LoginForm from '@/widgets/login-form';

export const metadata: Metadata = {
  title: 'Вход в систему',
};

export default function Login() {
  return (
    <>
      <LoginForm />

      <div className="text-center text-sm text-muted-foreground">
        Нет аккаунта?{' '}
        <Link href="/register" className="underline underline-offset-4 hover:text-primary">
          Зарегистрироваться
        </Link>
      </div>
    </>
  );
}
