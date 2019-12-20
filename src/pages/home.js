import React, { useState } from 'react';
import { getFirebase } from '../firebase';
import { Link } from 'react-router-dom';

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
        console.log(posts);
        setBlogPosts(posts);
        setLoading(false);
      });
  }

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <h1>Blog posts</h1>
      {blogPosts.map(blogPost => (
        <section key={blogPost.slug} className='card'>
          <div className='card-content'>
            <Link to={`/${blogPost.slug}`}>
              <h2>{blogPost.title}</h2>
            </Link>
            <span style={{ color: '#5e5e5e' }}>{blogPost.datePretty}</span>
            <p
              dangerouslySetInnerHTML={{
                __html: `${blogPost.content}`
              }}
            ></p>
          </div>
        </section>
      ))}
    </>
  );
};
export default Home;
