import React from 'react';
import {
  Box,
  Container,
  Grid,
  Toolbar,
  Typography,
  Link
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

const homeLink = React.forwardRef((props, ref) => (
  <RouterLink innerRef={ref} to='/' {...props} />
));
const aboutLink = React.forwardRef((props, ref) => (
  <RouterLink innerRef={ref} to='/about' {...props} />
));

const Navbar = () => {
  return (
    <Box py={2} className='nav'>
      <Container>
        <Grid container direction='row' justify='flex-end' alignItems='center'>
          <Toolbar variant='dense'>
            <Box mx={3}>
              <Typography variant='h5'>
                <Link underline='none' color='inherit' component={homeLink}>
                  Home
                </Link>
              </Typography>
            </Box>
            <Box mx={3}>
              <Typography variant='h5'>
                <Link underline='none' color='inherit' component={aboutLink}>
                  About
                </Link>
              </Typography>
            </Box>
            <Box mx={3}>
              <Typography variant='h5'>
                <Link underline='none' color='inherit' component={homeLink}>
                  Blog
                </Link>
              </Typography>
            </Box>
          </Toolbar>
        </Grid>
      </Container>
    </Box>
  );
};

export default Navbar;
