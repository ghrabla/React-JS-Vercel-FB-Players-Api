import React from 'react';
import getjobs from './getjobs';
import { Container } from 'react-bootstrap';


function App() {
  const {jobs , loading, error}  = getjobs()


  return (
    <Container>
      {loading && <h1>is loading</h1>}
      {error && <h1>err try to refresh </h1>}
      <h1>{jobs.length}</h1>
      <h1>kamal</h1>
    </Container>
  
  );
}

export default App;
