import React, { useState, useEffect, useRef } from 'react';
import Cosmic from 'cosmicjs';
import Mapbox from 'mapbox-gl';
import PageTitle from '../../components/PageTitle';
import Container from '../../components/Container';
import SkeletonContainer from '../SkeletonContainer';
import HomeContent from '../../components/HomeContent';

let map = null; 

let weatherKey = process.env.WEATHERSTACK_API_KEY;
function HomeContainer() {
  const mapElement = useRef(null);
  Mapbox.accessToken = process.env.MAPBOX_API_KEY;

  //States
  const [pageData, setPageData] = useState(null);
  const [style, setStyle] = useState('mapbox://styles/gabcav/ckkvcl1ln3yz917ly1fduv8qg'); 
  const [mapMarkersState, setMapMarkersState] = useState([]);
  const [infoContent, setInfoContent] = useState(null);
  const [stop, setStop] = useState(null);
  const [weatherData, setWeatherData] = useState([]);

  
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

    bucket.getObjects({
        type:'stops',
        props: 'slug,title,content,metadata'
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
      }).on('Load', () => {
        map.addControl(new Mapbox.NavigationControl());
      })
      
    };
    
  }, [pageData]);


  //Add markers to map

  useEffect(() => {
      if(!mapMarkersState || !map || weatherData.length === 0){
          return;
      } else {
        
        mapMarkersState.map((item) => {
        
        let el = document.createElement('div');
        el.className = 'my-marker'
        el.setAttribute('data-name', `${item.title}`)
        el.style.display = 'block';
        el.style.height = '50px';
        el.style.width = '50px';
        el.style.pointer = 'clicker';
        el.style.backgroundImage = `url('${item.metadata.contentimage.imgix_url}')`;
        el.style.backgroundSize = '50px 50px'; 

        el.addEventListener('click', function() {
          let selectedStop = el.getAttribute('data-name');
          let stopToPass = mapMarkersState.find((el) => el.title === selectedStop);
          setStop(stopToPass);
          map.flyTo(
            {center: 
              [
                item.metadata.longitude,
                item.metadata.latitude
              ], 
                zoom:2
            });
        })

        setInfoContent(item.content)

        var weather = weatherData.filter(p => p.slug === item.slug)[0];

        let popUpCard = `
					<div class="popup-card">
            <h2>${item.title}</h2>
            <p>${item.content}</p>
            <img src=${item.metadata.infoimage.imgix_url} alt=${item.metadata.infoimagealt}>
            <h3>Current weather in ${weather?.location?.name}</h3>
            <div class="weather-container">
              <p class="weather-temp">${weather?.current?.temperature}°c</p>
              <img class="weather-img" src=${weather?.current?.weather_icons}>
              <p class="weather-desc">${weather?.current?.weather_descriptions}</p>
            </div>
            <p class="local-time">Local time: ${weather?.location?.localtime}
            <p class="weather-update">Last updated: ${weather?.current?.observation_time}</p>  
					</div>`

        new Mapbox.Marker(el, {
          anchor: 'bottom'
        })
          .setLngLat([item.metadata.longitude, item.metadata.latitude])
          .setPopup(new Mapbox.Popup().setHTML(popUpCard))
          .addTo(map)
          
        })
        
      }
  }, [mapMarkersState, weatherData])

  //Fetch weather for every stop
  useEffect(() => {
    

    if (!mapMarkersState) {
      return;
    }

    //Use slug from cosmic to get the correct weather for each location
    mapMarkersState.map(i => {
      fetch(`http://api.weatherstack.com/forecast?access_key=${weatherKey}&query=${i.metadata.weatherquery}`)
      .then(response => response.json())
      .then((data) => {
        data.slug = i.slug
        setWeatherData((state) => state.concat(data))

      });
    })
    
    
  }, [mapMarkersState])

console.log(weatherData)

  function renderSkeleton() {
    return (
      <SkeletonContainer />
    );
  }
  

  function renderPage() {
    return (
      <Container as="main">
        <PageTitle>Welcome</PageTitle>
        <HomeContent dangerouslySetInnerHTML={{__html: pageData.content}} />
        <div className="mapContainer" style={{height: '700px'}} ref={mapElement}></div>
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