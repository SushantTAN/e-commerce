/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import API from '@/lib/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const profileSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
});

const passwordSchema = yup.object().shape({
  password: yup.string().required(),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
});

const fetchProfile = async () => {
  const { data } = await API.get('/users/profile');
  return data;
};

const ProfilePage = () => {
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery({
    queryKey: ['user'],
    queryFn: fetchProfile,
  });

  const { register: registerProfile, handleSubmit: handleSubmitProfile, formState: { errors: profileErrors } } = useForm({
    resolver: yupResolver(profileSchema),
    values: data,
  });

  const { register: registerPassword, handleSubmit: handleSubmitPassword, formState: { errors: passwordErrors } } = useForm({
    resolver: yupResolver(passwordSchema),
  });

  const updateProfileMutation = useMutation({
    mutationFn: (data: any) => API.put('/users/profile', data),
    onSuccess: (data) => {
      queryClient.setQueryData(['user'], data.data);
    },
  });

  const changePasswordMutation = useMutation({
    mutationFn: (data: any) => API.post('/auth/reset-password/some-token', data), // This needs a proper token
    onSuccess: () => {
      // Handle successful password change
    },
  });

  const onProfileSubmit = (data: any) => {
    updateProfileMutation.mutate(data);
  };

  const onPasswordSubmit = (data: any) => {
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