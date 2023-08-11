import React, { useState } from 'react';

interface AuthFormProps {
  action: string;
  onSubmitAuth: (email: string, password: string) => void;
  onErrorNotification: (message: string) => void
}

const AuthForm: React.FC<AuthFormProps> = ({ action, onSubmitAuth, onErrorNotification }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    if (action === 'signup') {
      const validEmail = !!email.match(/.+@.+/g);
      const validatePasswordLength = password.length > 5;
      const validateConfirmPassword = password === confirmPassword;

      if (validEmail && validatePasswordLength && validateConfirmPassword) {
        onSubmitAuth(email, password);
      } else if (!validEmail) {
        onErrorNotification('Invalid email');
      } else if (!validatePasswordLength) {
        onErrorNotification('Password length must be at least 6 characters');
      } else if (!validateConfirmPassword) {
        onErrorNotification('Password and Confirm Password does not match');
      }
    } else {
      onSubmitAuth(email, password);
    }
  };

  return (
    <form className='flex flex-col'>
        <input
          className='border-x border-t font-medium rounded-tl rounded-tr py-2 px-3 focus:outline-none'
          value={email}
          onChange={(e) => setEmail(e.target.value.trim())}
          placeholder='Email address'
          autoComplete='new-password'
        />
        <input
          type='password'
          className={`border font-medium py-2 px-3 border-1 focus:outline-none ${action === 'signin' ? 'rounded-bl rounded-br' : null}`}
          value={password}
          onChange={(e) => setPassword(e.target.value.trim())}
          placeholder='Password'
        />
        {action === 'signup' &&
          <input
            type='password'
            className='border-t-0 border-x border-b font-medium rounded-bl rounded-br py-2 px-3 border-1 focus:outline-none'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value.trim())}
            placeholder='Confirm password'
          />
        }
      <button
        className='btn bg-cyan-500 border-0 rounded normal-case px-48 mt-14 text-lg font-medium text-white'
        onClick={handleLogin}
      >
        {action === 'signin' ? 'Sign in' : 'Sign up'}
      </button>
    </form>
  );
};

export default AuthForm;
