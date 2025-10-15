"use client";

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { api } from '@/lib/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { User } from '@/types';

const profileSchema = yup.object().shape({
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
});

type ProfileFormInputs = yup.InferType<typeof profileSchema>;

const passwordSchema = yup.object().shape({
  password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
});

type PasswordFormInputs = yup.InferType<typeof passwordSchema>;

const fetchProfile = async () => {
  const { data } = await api.get<User>('/users/profile');
  return data;
};

const ProfilePage = () => {
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery<User>({
    queryKey: ['user'],
    queryFn: fetchProfile,
  });

  const { register: registerProfile, handleSubmit: handleSubmitProfile, formState: { errors: profileErrors } } = useForm<ProfileFormInputs>({
    resolver: yupResolver(profileSchema),
    values: data ? { firstName: data.firstName, lastName: data.lastName } : undefined,
  });

  const { register: registerPassword, handleSubmit: handleSubmitPassword, formState: { errors: passwordErrors } } = useForm<PasswordFormInputs>({
    resolver: yupResolver(passwordSchema),
  });

  const updateProfileMutation = useMutation({
    mutationFn: (data: ProfileFormInputs) => api.put<User>('/users/profile', data),
    onSuccess: (data) => {
      queryClient.setQueryData(['user'], data);
    },
  });

  const changePasswordMutation = useMutation({
    mutationFn: (data: PasswordFormInputs) => api.post('/auth/reset-password/some-token', data), // This needs a proper token
    onSuccess: () => {
      // Handle successful password change
    },
  });

  const onProfileSubmit: SubmitHandler<ProfileFormInputs> = (data) => {
    updateProfileMutation.mutate(data);
  };

  const onPasswordSubmit: SubmitHandler<PasswordFormInputs> = (data) => {
    changePasswordMutation.mutate(data);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching profile</div>;

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <Card>
          <CardHeader>
            <CardTitle>Update Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitProfile(onProfileSubmit)}>
              <Input {...registerProfile('firstName')} placeholder="First Name" />
              <p>{profileErrors.firstName?.message}</p>
              <Input {...registerProfile('lastName')} placeholder="Last Name" />
              <p>{profileErrors.lastName?.message}</p>
              <Button type="submit" disabled={updateProfileMutation.isPending}>
                {updateProfileMutation.isPending ? 'Updating...' : 'Update'}
              </Button>
            </form>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Change Password</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitPassword(onPasswordSubmit)}>
              <Input {...registerPassword('password')} type="password" placeholder="New Password" />
              <p>{passwordErrors.password?.message}</p>
              <Input {...registerPassword('confirmPassword')} type="password" placeholder="Confirm Password" />
              <p>{passwordErrors.confirmPassword?.message}</p>
              <Button type="submit" disabled={changePasswordMutation.isPending}>
                {changePasswordMutation.isPending ? 'Changing...' : 'Change Password'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;