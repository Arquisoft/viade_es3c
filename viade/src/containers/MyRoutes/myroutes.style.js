import styled from 'styled-components';
import { media } from '../../utils';

export const RouteCard = styled.div`
  background-color: #000000;
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
    margin-left: 8px;
  }
`;