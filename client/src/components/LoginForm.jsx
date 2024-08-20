import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

const LoginForm = () => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [loginUser, { error }] = useMutation(LOGIN_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await loginUser({
        variables: { ...formState },
      });
      console.log(data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input
        name="email"
        type="email"
        value={formState.email}
        onChange={handleChange}
      />
      <input
        name="password"
        type="password"
        value={formState.password}
        onChange={handleChange}
      />
      <button type="submit">Login</button>
      {error && <div>Login failed</div>}
    </form>
  );
};

export default LoginForm;