import styled from "styled-components";

/**
 * A styled-component for the 404 Page layout
 */
export const PageNotFoundWrapper = styled.section`
  width: 100%;
  height: 50%;
  overflow-y: hidden !important;
  @media only screen and (max-width: 900px) {
    background-image: url("img/spaceman-mobile.svg");
    background-position: left -80px bottom -10px;
    background-size: 70%;
  }
`;

/**
 * A styled-component for the 404 Page content section
 */
export const PageNotFoundContent = styled.div`
  background: url("img/404.png") center center no-repeat;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: 100% auto;

  overflow-y: hidden !important;
  @media only screen and (max-width: 900px) {
    max-width: 100%;
    margin: 20px 40px;
    text-align: center;
  }
`;
