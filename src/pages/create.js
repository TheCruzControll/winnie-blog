import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Row, Col } from 'flwww';
import { getFirebase } from '../firebase';
import { Remarkable } from 'remarkable';
import { Typography, Container, TextField, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const Create = () => {
  let history = useHistory();
  const md = new Remarkable();
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');

  const convertToSlug = Text => {
    return Text.toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-');
  };

  const genereateContent = () => {
    return md.render(content);
  };

  const generateDate = () => {
    const now = new Date();
    const options = { month: 'long', day: 'numeric', year: 'numeric' };

    const year = now.getFullYear();
    let month = now.getMonth() + 1;
    if (month < 10) {
      month = `0${month}`; // prepend with a 0
    }

    let day = now.getDate();
    if (day < 10) {
      day = `0${day}`; // prepend with a 0
    }

    return {
      formatted: `${year}-${month}-${day}`, // used for sorting
      pretty: now.toLocaleDateString('en-US', options) // used for displaying
    };
  };

  const createPost = () => {
    const slug = convertToSlug(title);
    const date = generateDate();
    const htmlContent = genereateContent();
    const newPost = {
      title,
      dateFormatted: date.formatted,
      datePretty: date.pretty,
      slug,
      content: htmlContent
    };
    getFirebase()
      .firestore()
      .collection('posts')
      .add(newPost)
      .then(function(docRef) {
        console.log('Document written with ID: ', docRef.id);
      })
      .catch(function(error) {
        console.error('Error adding document: ', error);
      });
    history.push('/');
  };

  return (
    <Container>
      <Row>
        <Col grid='6'>
          <h1>Create New Posts Here</h1>
          <form>
            <TextField
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder='Post Title'
              label='Title'
              variant='outlined'
              margin='normal'
              fullWidth
              InputLabelProps={{
                shrink: true
              }}
            />
            <TextField
              label='Post Content Goes Here'
              variant='outlined'
              InputLabelProps={{
                shrink: true
              }}
              multiline
              margin='normal'
              value={content}
              onChange={e => setContent(e.target.value)}
              rows='5'
              placeholder='Post Content Goes Here'
              fullWidth
            />
          </form>
          <Button
            variant='contained'
            color='primary'
            onClick={() => createPost()}
          >
            Create Post!
          </Button>
        </Col>
        <Col grid='6'>
          <h1>This is the Preview of your Post! </h1>
          <Typography variant='h5'>
            <em>{generateDate().pretty}</em>
          </Typography>
          <Typography variant='h1'>{title}</Typography>
          <div>
            <ReactMarkdown source={content} />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Create;
