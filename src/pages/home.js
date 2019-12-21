import React, { useState } from 'react';
import { getFirebase } from '../firebase';
import { Link } from '@material-ui/core/';
import Sidebar from '../components/sidebar';
import {
  Typography,
  Container,
  Grid,
  Box,
  LinearProgress
} from '@material-ui/core';

import { Link as RouterLink } from 'react-router-dom';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [blogPosts, setBlogPosts] = useState([]);
  if (loading && !blogPosts.length) {
    getFirebase()
      .firestore()
      .collection('posts')
      .orderBy('created', 'desc')
      .get()
      .then(snapshot => {
        let posts = [];
        snapshot.forEach(doc => {
          posts.push(doc.data());
        });
        setBlogPosts(posts);
        setLoading(false);
      });
  }

  if (loading) {
    return <LinearProgress color='secondary' />;
  }

  return (
    <Container>
      <Grid
        container
        direction='row-reverse'
        justify='flex-start'
        alignItems='flex-start'
      >
        <Grid item xs={12} md={4}>
          <Box m={6}>
            <Sidebar />
          </Box>
        </Grid>
        <Grid item xs={12} md={8}>
          {blogPosts.map(blogPost => (
            <Box m={6} key={blogPost.slug}>
              <Typography variant='h1' color='inherit'>
                <Link
                  component={React.forwardRef((props, ref) => (
                    <RouterLink
                      innerRef={ref}
                      to={`/${blogPost.slug}`}
                      {...props}
                    />
                  ))}
                  color='inherit'
                  underline='none'
                >
                  {blogPost.title}
                </Link>
              </Typography>
              <Typography variant='h5' color='textSecondary'>
                <em>{blogPost.datePretty}</em>
              </Typography>
              <p
                dangerouslySetInnerHTML={{
                  __html: `${blogPost.content}`
                }}
              ></p>
            </Box>
          ))}
        </Grid>
      </Grid>
    </Container>
  );
};
export default Home;
