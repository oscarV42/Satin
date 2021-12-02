import  React, { useState } from "react";
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../../utils/mutations';
import { Button, Form } from 'semantic-ui-react';
import Auth from '../../utils/auth';

export default function Register() {
    const [formState, setFormState] = useState({
        username: '',
        email: '',
        password: '',
      });
      const [addUser, { error, data }] = useMutation(ADD_USER);
    
      const handleChange = (event) => {
        const { name, value } = event.target;
    
        setFormState({
          ...formState,
          [name]: value,
        });
      };
    
      const handleRegister = async (event) => {
        event.preventDefault();
        console.log(formState);
    
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
    <div>
      <h4 className="card-header bg-dark text-light p-2">Sign Up</h4>
      {data ? (
        <p>
          Success! You may now head{' '}
          <Link to="/">back to the homepage.</Link>
          </p>
        ) : (

        <Form onSubmit = {handleRegister}>
            <Form.Field
                error={{ content: 'Please enter a username', pointing: 'below' }}
                fluid
                label='Username'
                name = 'username'
                onChange = {handleChange}
                value = {formState.username}
                placeholder='Username'
                id='form-input-user-name'
            />
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
            <Button type='submit'>Sign Up</Button>
        </Form>
        
      )}
      {error && (
        <div className="my-3 p-3 bg-danger text-white">
          {error.message}
        </div>
      )}
    </div>
  );
}