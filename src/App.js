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
import SkeletonContainer from './containers/SkeletonContainer';
let map = null; 
let marker = null;
let svalbard = null;
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
        center: [10.381198, 59.748947],
        zoom: 1,
        style: style
      })
      .on('click', event => handleMapClick(event));
    };
  }, [pageData]);


  //Add marker
  const handleMapClick = (event) => {

    let el = document.createElement('div');
    el.style.display = 'block';
    el.style.height = '40px';
    el.style.width = '40px';
    el.style.backgroundImage = 'url(https://images.vexels.com/media/users/3/142675/isolated/preview/84e468a8fff79b66406ef13d3b8653e2-house-location-marker-icon-by-vexels.png)';
    el.style.backgroundSize = '40px 40px'; 

    const newMarker = new Mapbox.Marker(el, {
      draggable: false, 
      anchor: 'bottom'
    })
      .setLngLat(event.lngLat)

      newMarker.addTo(map);
      marker = newMarker;

    const markerSvalbard = new Mapbox.Marker(el, {
      
    })
    .setLngLat([16.645579, 78.221167])
    markerSvalbard.addTo(map);
    svalbard = markerSvalbard;
  }

  

  function renderSkeleton() {
    return (
      <SkeletonContainer />
    );
  }

  function renderPage() {
    return (
      <Container>
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