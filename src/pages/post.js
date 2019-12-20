import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { getFirebase } from '../firebase';

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
    return <h1>Loading...</h1>;
  }

  const postDoesNotExist = !currentPost;

  if (postDoesNotExist) {
    return <Redirect to='/404' />;
  }

  return (
    <>
      <h1>{currentPost.title}</h1>
      <em>{currentPost.datePretty}</em>
      <p dangerouslySetInnerHTML={{ __html: currentPost.content }}></p>
      <button onClick={() => console.log(currentPost.title)}></button>
    </>
  );
};

export default Post;
