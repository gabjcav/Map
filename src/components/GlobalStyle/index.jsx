import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    *{
        box-sizing: border-box;
    }

    html, body {
        height: 100%;
        width: 100%; 
        margin: 0;
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

    .mapboxgl-canary{
        visibility: visible; 
    }

    .my-marker{
        cursor:pointer;
    }

    .popup-card{
        font-size: .3rem
        font-family: 'Montserrat', sans-serif;
        position: relative;
        h2{
            font-size: 24px;
        }
        p{
            font-size: 16px;
        }
    }
      
    .weather-container{
        background-color: red;
        font-size: 1rem;
        .weather-temp{
        
        }
    }

    

`

export default GlobalStyle; 