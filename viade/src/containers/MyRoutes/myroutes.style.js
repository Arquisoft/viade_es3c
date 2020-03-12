import styled from 'styled-components';
import { media } from '../../utils';

export const RouteCard = styled.div`
  background-color: #FFFFFF;
  margin: 30px auto;

  max-width: 80% !important;
  flex-direction: row !important;
  padding: 50px 0 !important; //temporary fix to a style guide bug

  align-items: center;

  a {
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }

  button {
    position: absolute;
    bottom:480px;
  }
`;

export const RouteWrapper = styled.section`
  display: flex;
  flex: 1 0 auto;
  align-items: center;
  justify-content: center;
  //background-image: url('/img/concentric-hex-pattern_2x.png');
   background: rgb(237,251,63);
  background: linear-gradient(90deg, rgba(237,251,63,1) 0%, rgba(252,149,70,1) 100%);
  background-repeat: repeat;
  padding: 60px 0;
`;
export const MyRouteContainer = styled.div`
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
  background-color: white;
  max-width: 900px;
  margin: 0 20px;
  width: 100%;
  flex: 1 0 auto;
`;
export const FormRenderContainer = styled.div`
  border: 1px solid #dae0e6;
  min-height: 40px;
  padding: 5px;
 background-image: url('/img/pattern-geo.png'),
    linear-gradient(135deg, #1CD8D2 0%, #57E2CC 30%, #93EDC7 100%);
  background-repeat: repeat, no-repeat;
  padding: 30px 20px;
  .inrupt-form-group {
    border: 1px solid #c0c0c0;
    background-color: #f9f9f9;
    margin: 15px 0;
  }

  .input-wrap {
    margin: 0;
  }

  input {
    margin-left: 0;
  }
`;

export const Header = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  background-image: url('/img/pattern-geo.png'),
    linear(135deg, #1CD8D2 0%, #57E2CC 30%, #93EDC7 100%);
  background-repeat: repeat, no-repeat;
  padding: 30px 20px;
  p {
    color: white;
  }
  .edit-button {
    background: rgba(255, 255, 255, 0.1);
    border: 2px solid white;
    position: absolute;
    right: 20px;
    top: 20px;
    font-size: 1rem;
  }
`;

export const Button = styled.button`
  max-width: 128px;
  display: inline-block;
`;
