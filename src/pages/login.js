import React, { useState } from 'react';
import { getFirebase } from '../firebase';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';

const Login = () => {
  let history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const login = () => {
    getFirebase()
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        setError('');
        history.push('/create');
      })
      .catch(err => {
        setError(err.code);
      });
  };

  return (
    <Container>
      <form noValidate autoComplete='off'>
        {error !== '' && <h1>Incorrect Email/Password</h1>}
        <TextField
          value={email}
          onChange={e => setEmail(e.target.value)}
          label='Email'
          variant='outlined'
        />
        <TextField
          value={password}
          onChange={e => setPassword(e.target.value)}
          label='Password'
          variant='outlined'
          required
          type='password'
        />
        <Button variant='outlined' color='primary' onClick={() => login()}>
          Primary
        </Button>
      </form>
    </Container>
  );
};

export default Login;
