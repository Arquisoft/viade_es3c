import styled from 'styled-components';

import { media } from '@utils';

export const RouteWrapper = styled.section`
  display: flex;
  flex: 1 0 auto;
  flex-direction:column;
  background-image: url('/img/concentric-hex-pattern_2x.png');
  padding: 10px 0;
`;

export const Header = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  background-image: url('/img/pattern-geo.png'),
    linear-gradient(135deg, #1CD8D2 0%, #57E2CC 30%, #93EDC7 100%);
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
