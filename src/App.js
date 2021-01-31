import React, { useState, useEffect, useRef } from 'react';
import Cosmic from 'cosmicjs';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Mapbox from 'mapbox-gl';
import PageTitle from './components/PageTitle';
import GlobalStyle from './components/GlobalStyle';
import Container from './components/Container';

let map = null; 

function App() {
  const mapElement = useRef(null);
  Mapbox.accessToken = process.env.MAPBOX_API_KEY;
  const [pageData, setPageData] = useState(null);
  const [style, setStyle] = useState('mapbox://styles/mapbox/streets-v11'); 


  //Connect to Cosmicjs
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
  
  // Add map
  useEffect(() => {
    if(pageData !== null){
      map = new Mapbox.Map({
        container: mapElement.current, 
        center: [10, 59],
        zoom: 10,
        style: style
      })
    };
  }, [pageData]);

  function renderSkeleton() {
    return (
      <p>Loading page....</p>
    );
  }

  function renderPage() {
    return (
      <Container>
        <GlobalStyle />
        <PageTitle>Welcome</PageTitle>
        <div dangerouslySetInnerHTML={{__html: pageData.content}} />
        <div className="mapContainer" style={{height: '500px'}} ref={mapElement}></div>
      </Container>
    )
  }

  return (
    <>
      {(pageData === null) ? renderSkeleton() : renderPage()}
    </>
  )
};

export default App;