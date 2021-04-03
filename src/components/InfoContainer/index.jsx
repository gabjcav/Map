import styled from "styled-components";

const InfoContainer = styled.section`
  font-size: 1rem;
  font-weight: 500;
  margin-left: auto;
  margin-right: auto;
  height: 500px;
  width: 100%;
  background-color: #ffffff;
  padding: 15px;

  @media (max-width: 600px) {
    width: 300px;
    height: 300px;
  }
`;

export default InfoContainer;
