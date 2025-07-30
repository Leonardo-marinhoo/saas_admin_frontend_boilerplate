import styled from "styled-components";

export const Container = styled.div`
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto 0;

  @media (max-width: ${(props) => props.theme.breakpoints.lg}) {
    max-width: 1000px;
    padding: 20px;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    max-width: 100%;
    padding: 16px;
    margin: 60px auto 0;
  }
`;

export default Container;
