import { Metadata } from 'next';
import React from 'react';

import RegisterForm from '@/widgets/register-form';

export const metadata: Metadata = {
  title: 'Регистрация',
};

const Register = () => {
  return <RegisterForm />;
};

export default Register;
