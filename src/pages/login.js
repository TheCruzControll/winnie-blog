import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { getFirebase } from '../firebase';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

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
    console.log('it got here');
  };

  const classes = useStyles();

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            value={email}
            onChange={e => setEmail(e.target.value)}
            variant='outlined'
            margin='normal'
            required
            fullWidth
            label='Email Address'
            name='email'
            autoComplete='email'
            autoFocus
          />
          <TextField
            value={password}
            onChange={e => setPassword(e.target.value)}
            variant='outlined'
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
          />
          <Button
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
            onClick={() => login()}
          >
            Sign In
          </Button>
          {error !== '' && <h1>Incorrect Email/Password</h1>}
        </form>
      </div>
    </Container>
  );
};

export default Login;
