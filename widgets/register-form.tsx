'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
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
import { RegisterParams } from '@/shared/types/auth';

const FormSchema = z
  .object({
    email: z.string().email('Введите корректный email'),
    password: z
      .string()
      .min(6, {
        message: 'Пароль должен содержать минимум 6 символов',
      })
      .max(4096, {
        message: 'Пароль слишком длинный',
      }),
    confirmPassword: z
      .string()
      .min(6, {
        message: 'Пароль должен содержать минимум 6 символов',
      })
      .max(4096, {
        message: 'Пароль слишком длинный',
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
  });

const RegisterForm = () => {
  const router = useRouter();

  const form = useForm<RegisterParams>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  async function onSubmit(values: RegisterParams) {
    const response = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify({ ...values }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      await signIn('credentials', {
        ...values,
        redirect: false,
      });
      router.push('/');
    } else {
      const data = await response.json();
      console.error('Ошибка входа:', data.message);
      toast.error(data.message);
    }
  }

  const handleCancel = () => {
    form.reset();
    router.push('/');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Регистрация</CardTitle>
        <CardDescription>Введите ваш email и пароль для регистрации</CardDescription>
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
                    <Input required type="password" placeholder="Введите пароль" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="confirmPassword"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input required type="password" placeholder="Подтвердите пароль" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 mt-4">
            <Button className="w-full" type="submit">
              Зарегистрироваться
            </Button>
            <Button variant="outline" className="w-full" type="button" onClick={handleCancel}>
              Отмена
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default RegisterForm;
