import React, { useState } from 'react';
import { getFirebase } from '../firebase';
import {
  Container,
  TextField,
  Button,
  Grid,
  Typography,
  LinearProgress
} from '@material-ui/core';
import { useHistory, Redirect } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';

const Create = () => {
  let history = useHistory();
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState();
  const [content, setContent] = useState('<p>Post Content Goes here!</p>');
  const [title, setTitle] = useState('Title Goes Here');

  const convertToSlug = Text => {
    return Text.toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-');
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
    const newPost = {
      title,
      dateFormatted: date.formatted,
      datePretty: date.pretty,
      slug,
      content,
      created: getFirebase().firestore.Timestamp.fromDate(new Date())
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

  if (loading && !isAuthenticated) {
    getFirebase()
      .auth()
      .onAuthStateChanged(function(user) {
        if (user) {
          setIsAuthenticated(true);
          setLoading(false);
        } else {
          setIsAuthenticated(false);
          setLoading(false);
        }
      });
  }

  if (loading) {
    return <LinearProgress color='secondary' />;
  }

  const user = isAuthenticated === false;

  if (user) {
    return <Redirect to='/login' />;
  }

  return (
    <Container>
      <Grid
        container
        direction='row'
        justify='flex-start'
        alignItems='flex-start'
        spacing={2}
      >
        <Grid item xs={12} sm={6}>
          <h1>Create New Posts Here</h1>
          <h4>
            I couldn't find a way to do image uploading so images have to have a
            URL
          </h4>
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

            <Editor
              apiKey='mcj5fng96eiazhx7zixt5wdu3vrriy9ko9eelvqu1pk2aw79'
              init={{
                height: 500,
                menubar: false,
                plugins: [
                  'advlist autolink lists link image charmap print preview anchor media searchreplace visualblocks code fullscreen insertdatetime media table paste code help wordcount emoticons hr image'
                ],
                toolbar:
                  'undo redo formatselect bold italic backcolor alignleft aligncenter alignright alignjustify bullist numlist outdent indent removeformat help emoticons hr link image'
              }}
              value={content}
              onEditorChange={e => setContent(e)}
            />
          </form>
          <Button
            variant='contained'
            color='primary'
            onClick={() => createPost()}
          >
            Create Post!
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <h1>This is the Preview of your Post! </h1>
          <Typography variant='h5'>
            <em>{generateDate().pretty}</em>
          </Typography>
          <Typography variant='h1'>{title}</Typography>
          <p
            dangerouslySetInnerHTML={{
              __html: `${content}`
            }}
          ></p>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Create;
