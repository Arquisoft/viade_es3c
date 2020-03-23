import styled from 'styled-components';


export const RouteWrapper = styled.section`
  display: flex;
  flex: 1 0 auto;
  flex-direction:row;
  background-image: url('img/concentric-hex-pattern_2x.png');
`;

export const Header = styled.div`
  max-width:17% ;
  align-items: top;
  justify-content: center;
  background-image: url('img/pattern-geo.png'),
    linear-gradient(135deg, #1CD8D2 0%, #57E2CC 30%, #93EDC7 100%);
  background-repeat: repeat, no-repeat;
  
  padding: 30px 20px;
  p {
    color: white;
  }
  
`;

export const Input = styled.input`
  margin: 5px;
`;

export const Button = styled.button`
  max-width: 128px;
  display: inline-block;

  &:first-child {
    margin-right: 10px;
  }
`;
