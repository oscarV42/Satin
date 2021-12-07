import React, { useContext, useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';
import { gql } from '@apollo/client';

import { AuthContext } from '../context/auth';
import { useForm } from '../utils/hooks';

function Register(props) {
    const context = useContext(AuthContext);
    const [errors, setErrors] = useState({});
  
    const { onChange, onSubmit, values } = useForm(registerUser, {
      username: '',
      email: '',
      password: '',
    });
  
    const [addUser, { loading }] = useMutation(ADD_USER, {
      update(
        _,
        {
          data: { register: userData }
        }
      ) {
        context.login(userData);
        props.history.push('/');
      },
      onError(err) {
        setErrors(err.graphQLErrors[0].extensions.exception.errors);
      },
      variables: values
    });
  
    function registerUser() {
      addUser();
    }
  
    return (
      <div className="form-container">
        <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
          <h1>Register</h1>
          <Form.Input
            label="Username"
            placeholder="Username.."
            name="username"
            type="text"
            value={values.username}
            error={errors.username ? true : false}
            onChange={onChange}
          />
          <Form.Input
            label="Email"
            placeholder="Email.."
            name="email"
            type="email"
            value={values.email}
            error={errors.email ? true : false}
            onChange={onChange}
          />
          <Form.Input
            label="Password"
            placeholder="Password.."
            name="password"
            type="password"
            value={values.password}
            error={errors.password ? true : false}
            onChange={onChange}
          />
          <Button type="submit" primary>
            Register
          </Button>
        </Form>
        {Object.keys(errors).length > 0 && (
          <div className="ui error message">
            <h1>Something went wrong with your registration!</h1>
          </div>
        )}
      </div>
    );
}

const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export default Register;