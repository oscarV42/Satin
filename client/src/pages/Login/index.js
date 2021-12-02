import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const Login = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);

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
    console.log(formState);
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
    <div>
      <h4 className="card-header bg-dark text-light p-2">Login</h4>
      {data ? (
        <p>
          Success! You may now head{' '}
          <Link to="/">back to the homepage.</Link>
          </p>
        ) : (

        <Form onSubmit = {handleFormSubmit}>
            <Form.Field
                id='form-input-control-error-email'
                fluid
                label='Email'
                onChange = {handleChange}
                value = {formState.email}
                name = 'email'
                placeholder='joe@schmoe.com'
                error={{
                content: 'Please enter a valid email address',
                pointing: 'below',
                }}
            />
            <Form.Field
                error={{ content: 'Please enter a password', pointing: 'below' }}
                fluid
                type = 'password'
                name = 'password'
                onChange = {handleChange}
                value = {formState.password}
                label='Password'
                placeholder='Password'
                id='form-input-user-password'
            />
            <Button type='submit'>login</Button>
        </Form>
        
      )}
      {error && (
        <div className="my-3 p-3 bg-danger text-white">
          {error.message}
        </div>
      )}
    </div>
  );
};

export default Login;
