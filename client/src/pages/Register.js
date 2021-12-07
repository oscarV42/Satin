import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

import Auth from '../utils/auth';

function Register() {
    const [errors, setErrors] = useState({});
  
    const [formState, setFormState] = useState({
      username: '',
      email: '',
      password: '',
    });
    const [addUser, { error, data, loading }] = useMutation(ADD_USER);
  
    const handleChange = (event) => {
      const { name, value } = event.target;
  
      setFormState({
        ...formState,
        [name]: value,
      });
    };
  
    const handleFormSubmit = async (event) => {
      event.preventDefault();
  
      try {
        const { data } = await addUser({
          variables: { ...formState },
        });
  
        Auth.login(data.addUser.token);
      } catch (e) {
        console.error(e);
      }
    };
  
    return (
      <div className="form-container">
        <Form onSubmit={handleFormSubmit} noValidate className={loading ? 'loading' : ''}>
          <h1>Register</h1>
          <Form.Input
            label="Username"
            placeholder="Username.."
            name="username"
            type="text"
            value={formState.username}
            required
            onChange={handleChange}
          />
          <Form.Input
            label="Email"
            placeholder="Email.."
            name="email"
            type="email"
            value={formState.email}
            required
            onChange={handleChange}
          />
          <Form.Input
            label="Password"
            placeholder="Password.."
            name="password"
            type="password"
            value={formState.password}
            required
            onChange={handleChange}
          />
          <Button type="submit" primary>
            Register
          </Button>
        </Form>
      </div>
    );
}

export default Register;