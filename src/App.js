import React, { useState, useEffect, useRef } from 'react';
import Cosmic from 'cosmicjs';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Mapbox from 'mapbox-gl';

let map = null; 

function App() {
  const mapElement = useRef(null)
  const [pageData, setPageData] = useState(null);

  useEffect(() => {
    const client = new Cosmic()
    const bucket = client.bucket({
      slug: process.env.BUCKET_SLUG,
      read_key: process.env.READ_KEY
    });

    bucket.getObject({
      slug: 'my-top-5-places-to-travel',
      props: 'slug,title,content,metadata'
    })
    .then(data => {
      setPageData(data.object)
    })
    .catch(error => {
      console.log(error)
    })
  }, []);

  function renderSkeleton() {
    return (
      <p>Loading page....</p>
    );
  }

  function renderPage() {
    return (
      <div>
        <h1>Welcome</h1>
        <div dangerouslySetInnerHTML={{__html: pageData.content}} />
      </div>
    )
  }

  return (
    <>
      {(pageData === null) ? renderSkeleton() : renderPage()}
    </>
  )
};

export default App;