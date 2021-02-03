import React, { useState, useEffect, useRef } from 'react';
import Cosmic from 'cosmicjs';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Mapbox from 'mapbox-gl';
import PageTitle from '../../components/PageTitle';
import Container from '../../components/Container';
import SkeletonContainer from '../SkeletonContainer';
let map = null; 
let marker = null;


function HomeContainer() {
  const mapElement = useRef(null);
  Mapbox.accessToken = process.env.MAPBOX_API_KEY;
  const [pageData, setPageData] = useState(null);
  const [style, setStyle] = useState('mapbox://styles/mapbox/streets-v11'); 
  const [mapMarkersState, setMapMarkersState] = useState([]);
  const [backgroundImage, setBackgroundImage] = useState('url(https://images.vexels.com/media/users/3/142675/isolated/preview/84e468a8fff79b66406ef13d3b8653e2-house-location-marker-icon-by-vexels.png)')
  //Connect to Cosmicjs
  useEffect(() => {
    const client = new Cosmic()
    const bucket = client.bucket({
      slug: process.env.BUCKET_SLUG,
      read_key: process.env.READ_KEY
    });

    bucket.getObject({
      slug: 'my-top-5-places-to-travel',
      props: 'slug,title,content,metafields'
    })

    .then(data => {
      setPageData(data.object)
    })
    .catch(error => {
      console.log(error)
    })

    bucket.getObjects({
        type:'stops',
        props: 'slug,title,content,metafields'
    })

    .then((data) => {
        setMapMarkersState(data.objects);
    })
    .catch((error) => {
        console.log(error);
    });
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
    };
  }, [pageData]);


  //Add markers to map

  useEffect(() => {
      if(mapMarkersState === null){
          return;
      } else {
        mapMarkersState.map((item) => {

        setBackgroundImage('url(' + [item.metafields[3].value] + ')')    
        

        let el = document.createElement('div');
        el.style.display = 'block';
        el.style.height = '40px';
        el.style.width = '40px';
        el.style.backgroundImage = backgroundImage;
        el.style.backgroundSize = '40px 40px'; 
        console.log(backgroundImage)
        new Mapbox.Marker(el, {
            anchor: 'bottom'
        })
            .setLngLat([item.metafields[0].value, item.metafields[1].value])
            .addTo(map)
        })
      }
  }, [mapMarkersState])
  
  

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

export default HomeContainer;