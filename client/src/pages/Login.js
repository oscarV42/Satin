import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

import Auth from '../utils/auth';

function Login() {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data, loading }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };

  return (
    <div className = 'form-container'>
      <Form onSubmit= {handleFormSubmit} noValidate className={loading ? 'loading': ''}>
        <h1>Login into your account.</h1>
        <Form.Input
          label="Email"
          placeholder="Email"
          name="email"
          type="text"
          value={formState.email}
          onChange={handleChange}
        />
        <Form.Input
          label="Password"
          placeholder="Password"
          name="password"
          type="password"
          value={formState.password}
          onChange={handleChange}
        />
        <Button type="submit" primary> Login </Button>
      </Form>
    </div>
  );
}

export default Login;