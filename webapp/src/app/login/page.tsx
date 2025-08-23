'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { login as loginUser } from '@/lib/api';

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
});

const LoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const router = useRouter();
  const { login } = useAuth();

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      login({ token: data.token, user: data.result });
      router.push('/');
    },
    onError: (error) => {
      console.error(error);
      // Here you can update a state to show an error message to the user
    },
  });

  const onSubmit = (data: any) => {
    mutation.mutate(data);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Input {...register('email')} placeholder="Email" />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <Input {...register('password')} type="password" placeholder="Password" />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>
            <Button type="submit" className="w-full" disabled={mutation.isPending}>
              {mutation.isPending ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
