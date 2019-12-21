import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { getFirebase } from '../firebase';
import Sidebar from '../components/sidebar';
import {
  Container,
  Typography,
  Link,
  Box,
  Grid,
  LinearProgress
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

const Post = ({ match }) => {
  const [loading, setLoading] = useState(true);
  const [currentPost, setCurrentPost] = useState();
  const slug = match.params.slug;

  if (loading && !currentPost) {
    getFirebase()
      .firestore()
      .collection('posts')
      .where('slug', '==', slug)
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          setCurrentPost(doc.data());
        });
        setLoading(false);
      });
  }

  if (loading) {
    return <LinearProgress color='secondary' />;
  }

  const postDoesNotExist = !currentPost;

  if (postDoesNotExist) {
    return <Redirect to='/404' />;
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
          <Box my={6}>
            <Typography variant='h1' color=''>
              <Link
                component={React.forwardRef((props, ref) => (
                  <RouterLink
                    innerRef={ref}
                    to={`/${currentPost.slug}`}
                    {...props}
                  />
                ))}
                color='inherit'
                underline='none'
              >
                {currentPost.title}
              </Link>
            </Typography>
            <Typography variant='h5' color='textSecondary'>
              <em>{currentPost.datePretty}</em>
            </Typography>
            <p
              dangerouslySetInnerHTML={{
                __html: `${currentPost.content}`
              }}
            ></p>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Post;
