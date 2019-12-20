import React, { useState } from 'react';
import { getFirebase } from '../firebase';
import { Link } from '@material-ui/core/';
import { Typography, Container, Grid } from '@material-ui/core';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [blogPosts, setBlogPosts] = useState([]);
  if (loading && !blogPosts.length) {
    getFirebase()
      .firestore()
      .collection('posts')
      .orderBy('dateFormatted', 'desc')
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
    return <h1>Loading...</h1>;
  }

  return (
    <Container>
      <Grid
        container
        direction='column'
        justify='flex-start'
        alignItems='stretch'
        spacing={10}
      >
        {blogPosts.map(blogPost => (
          <Grid item mt={3}>
            <div className='card-content'>
              <Typography variant='h1' color=''>
                <Link
                  href={`/${blogPost.slug}`}
                  color='inherit'
                  underline='none'
                >
                  {blogPost.title}
                </Link>
              </Typography>
              <Typography variant='h5'>
                <em>{blogPost.datePretty}</em>
              </Typography>
              <p
                dangerouslySetInnerHTML={{
                  __html: `${blogPost.content}`
                }}
              ></p>
            </div>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
export default Home;
