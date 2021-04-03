import styled from "styled-components";

const HomeContent = styled.div`
  color: white;

  @media (max-width: 600px) {
    .mapboxgl-popup-content {
      height: 50px;
      width: 30px;
    }
  }
`;

export default HomeContent;
