import styled from 'styled-components';
import {media} from '../../utils';

export const WelcomeWrapper = styled.section`
  width: 100%;
  background: linear-gradient(90deg, #67e3c0ff 0%, #046df0f0 100%);
  background-repeat: repeat;
  padding: 50px 0;

  h3 {
    color: #ffffff;
    span {
      font-weight: bold;
    }
    a {
      font-size: 1.9rem;
    }
  }
`;

export const WelcomeCard = styled.div`
  background-color: #000000;
  
    //background: linear-gradient(90deg, rgba(237,251,63,1) 0%, rgba(252,149,70,1) 100%);

  margin: 30px auto;

  //Overriding the style guide card flexbox settings
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

export const TitleCard = styled.div`
  background-color: #000000;


  margin: 30px auto;

  //Overriding the style guide card flexbox settings
  max-width: 80% !important;
  flex-direction: row !important;
  padding: 5px 0 !important; //temporary fix to a style guide bug

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

export const FormRouteCard = styled.div`
background-color: #000000;

margin: 30px auto;

max-width: 28% !important;
min-height: 45% !important;
flex-direction: row !important;
padding: 5px 0 !important; 

align-items: center;

h3{
  text-align:center;
}

input {
  margin-top: 5px;
  margin-bottom: 20px;
}

a {
text-decoration: none;
&:hover {
  text-decoration: underline;
}
}

#buttonSubmit {
  float:right;
  text-decoration: none;
  font-weight: 600;
  font-size: 20px;
  background: 
}


button {
margin-left: 8px;
}
`;

export const WelcomeLogo = styled.div`
 

  img {
    width: 10%;
    height: 10%;
    display: block;
    margin: 0 auto;
  }
`;

export const WelcomeProfile = styled.div`
  height: 100%;
  text-align: center;
  position: relative;

  img {
    width: 120px;
    height: 120px;
    
  }

  h1,
  img {
  
    margin: 0 10px;
    display: inline-block;
    vertical-align: middle;
  }

  ${media.tablet`
    width: 50%;
    &:after {
      display: block;
      content: "";
      position: absolute;
      height: 100%;
      width: 1px;
      background-color:#D0D0D0;
      top:0;
    }
  `}
`;

export const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  button {
    margin-left: 0px;
  }
`;

export const ImageContainer = styled.div`
  background-image: ${({image}) => (image ? `url(${image})` : '#ffffff')};
  background-size: cover;
 
  width: 128px;
  height: 128px;
`;

export const WelcomeDetail = styled.div`
  padding: 1rem 3.5rem;

  p,
  li {
    color: #666666;
  }
  ul {
    list-style: disc;
    margin: 0 18px;
  }
`;

export const WelcomeName = styled.span`
  overflow-wrap: break-word;
  word-break: break-word;
`;

export const ListButton = styled.a`
    margin-top: 10px;
    margin-bottom: 10px;
    text-decoration: none;
    padding: 10px;
    font-weight: 300;
    font-size: 20px;
    color: #ffffff;
    background-color: #ff5900;
    
    border: 2px solid #ffffff;
 
  &:hover{
    text-decoration: none !important;
    color: #ff5900;
    background-color: #ffffff;
  }

`;
