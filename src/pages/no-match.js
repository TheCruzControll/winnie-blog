import React from 'react';
import { Link } from 'react-router-dom';

const NoMatch = () => {
  return (
    <div>
      <h1>Hmmm... can't seem to find that page.</h1>
      <Link to='/'>Take me home</Link>
    </div>
  );
};
export default NoMatch;
