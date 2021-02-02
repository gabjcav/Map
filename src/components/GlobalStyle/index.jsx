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
        background-color: whitesmoke; 
        
    }

    html {
        font-size: 20px; 
        line-height: 1.5; 
    }

    body {
        font-family: "Lato", sans-serif; 
    }

    img{
        max-width: 100%; 
    }

    .mapboxgl-canary{
        visibility: visible; 
    }
`

export default GlobalStyle; 