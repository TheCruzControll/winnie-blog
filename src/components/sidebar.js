import React from 'react';
import { Instagram, LinkedIn } from '@material-ui/icons';
import { Grid, Typography, IconButton } from '@material-ui/core';

const Sidebar = () => {
  return (
    <Grid
      container
      direction='column'
      justify='center'
      alignItems='center'
      spacing={2}
    >
      <Grid item>
        <p className='name'>Hi, i'm Winnie!</p>
      </Grid>
      <Grid item>
        <img
          src={require('../assets/winnie.jpg')}
          alt='me'
          className='headimg'
        ></img>
      </Grid>
      <Grid item>
        <Typography variant='body1'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco
        </Typography>
      </Grid>
      <Grid item>
        <IconButton
          color='inherit'
          href='https://www.instagram.com/heyitswinniee/'
          target='_blank'
        >
          <Instagram />
        </IconButton>
        <IconButton
          color='inherit'
          href='https://www.linkedin.com/in/winnienlee/'
          target='_blank'
        >
          <LinkedIn />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default Sidebar;
