import React, { useContext, useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';
import gql from '@apollo/client';

import { AuthContext } from '../context/auth';
import { useForm } from '../util/hooks';

function Login(props) {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    email: '',
    password: ''
  });

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
      update(
          _,
          {
            data: { login: userData }
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

  function loginUserCallback() {
    loginUser();
  }

  return (
    <div className = 'form-container'>
      <Form onSubmit={onSubmit} noValidate className={loading ? 'lodaing': ''}>
        <h1>Login into your account.</h1>
        <Form.Input
          label="Email"
          placeholder="Email"
          name="email"
          type="text"
          value={values.email}
          error={errors.email ? true : false}
          onChange={onChange}
        />
        <Form.Input
          label="Password"
          placeholder="Password"
          name="password"
          type="password"
          value={values.password}
          error={errors.password ? true : false}
          onChange={onChange}
        />
        <Button type="submit" primary> Login </Button>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <h1>Email or Password entered incorrectly</h1>
        </div>
      )}
    </div>
  );
}

const LOGIN_USER = gql `
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;
export default Login;