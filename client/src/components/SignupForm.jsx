import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

const SignupForm = () => {
  const [formState, setFormState] = useState({ username: '', email: '', password: '' });
  const [addUser, { error }] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await addUser({
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
        name="username"
        type="text"
        value={formState.username}
        onChange={handleChange}
      />
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
      <button type="submit">Sign Up</button>
      {error && <div>Signup failed</div>}
    </form>
  );
};

export default SignupForm;