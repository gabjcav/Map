import styled from "styled-components";

const Container = styled.div`
  width: 96%;
  max-width: 1200px;
  height: 1200px;
  margin-left: auto;
  margin-right: auto;
  @media (max-width: 600px) {
    .mapboxgl-popup-content {
      width: 200px;
    }
  }
`;

export default Container;
