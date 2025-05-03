'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from 'sonner';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { LoginParams } from '@/shared/types/auth';

const FormSchema = z.object({
  email: z.string().email('Введите корректный email'),
  password: z
    .string()
    .min(6, {
      message: 'Пароль должен содержать минимум 6 символов',
    })
    .max(4096, {
      message: 'Пароль слишком длинный',
    }),
});

const LoginForm = () => {
  const router = useRouter();

  const form = useForm<LoginParams>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: LoginParams) {
    await signIn('credentials', { ...values, redirect: false })
      .then((res) => {
        if (res?.error === 'CredentialsSignin') {
          form.setError('email', {
            type: 'manual',
            message: 'Неверный email или пароль',
          });
          form.setError('password', {
            type: 'manual',
            message: 'Неверный email или пароль',
          });
        }
        if (res?.ok) {
          router.push('/');
        }
      })
      .catch((error) => {
        console.error('Ошибка входа:', error);
        toast.error('Ошибка входа. Попробуйте еще раз.');
      });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>С возвращением</CardTitle>
        <CardDescription>Введите ваш email и пароль для входа</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input required placeholder="name@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input required type="password" placeholder="Пароль" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button variant="link" className="px-0 h-auto text-xs" type="button">
              Забыли пароль?
            </Button>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button className="w-full" type="submit">
              Войти
            </Button>

            <Separator />

            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => signIn('google')}
            >
              Войти через Google
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default LoginForm;
