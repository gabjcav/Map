import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    *{
        box-sizing: border-box;
    }

    html, body {
        height: 100%;
        width: 100%; 
        margin: 0 auto;
        padding: 0;
        background-color: #000000; 
        
    }

    html {
        font-size: 20px; 
        line-height: 1.5; 
    }

    body {
        font-family: "Montserrat", sans-serif; 
    }

    img{
        max-width: 100%; 
    }

    .mapContainer{
        width: 1500px;
        margin: 0 auto;
    }

    .mapboxgl-canary{
        visibility: visible; 
    }

    .my-marker{
        cursor:pointer;
    }

    .popup-card{
        font-family: 'Montserrat', sans-serif;
        h3{
            font-size: 16px;
        }
        h2{
            font-size: 18px;
        }
        p{
            font-size: 16px;
        }
    }
      
    .weather-container{
        font-size:10px;
        padding: 4px;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        font-weight: 500;

        img, p{
            padding: 5px;
            text-align: center;
        }

        .weather-img{
            border-radius: 50%;
        }

    }

    

`

export default GlobalStyle; 