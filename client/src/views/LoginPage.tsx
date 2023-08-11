import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import Alert from '../components/Alert';
import useUserContext from '../hooks/useUserContext';
import { UserContextType } from '../utils/dataTypes';

const LoginPage = () => {
  const { loginAuth } = useUserContext() as UserContextType;
  const [notifcationError, setNotificationError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = (email: string, password: string) => {
    loginAuth(email, password)
      .then(() => navigate('/jobs'))
      .catch((err: any) => {
        const errorMessage = err.message.match(/".*"/g)[0].slice(1, -1);
        setNotificationError(errorMessage);
      });
  }

  return (
    <section className='flex flex-col justify-center items-center space-y-4 h-[90vh]'>
      {notifcationError && <Alert notification={notifcationError} onClose={() => setNotificationError(null)}/>}
      <h3 className='text-3xl font-bold'>Sign in to your account</h3>
      <h4 className='text-lg'>Or &nbsp;
        <Link
          to='/signup'
          className='text-cyan-500 font-medium'
        >
          create new account
        </Link>
      </h4>
      <AuthForm
        action='signin'
        onSubmitAuth={handleSubmit}
        onErrorNotification={(message) => setNotificationError(message)}
      />
    </section>
  )
};

export default LoginPage;