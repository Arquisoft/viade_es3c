import styled from "styled-components";
import { media } from "../../utils";

export const RouteWrapper = styled.section`
	display: flex;
	input {
		max-width: 40% !important;
	}
	flex: 1 0 auto;
	align-items: center;
	justify-content: center;
	background: url("img/misrutas.png");
	background-position: center;
	background-attachment: fixed;
	background-size: cover;
	padding: 60px 0;
`;


export const RouteContainer = styled.div`
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
  background-color: white;
  max-width: 900px;
  margin: 0 20px;
  width: 100%;
  flex: 1 0 auto;
`;

export const Header = styled.div`
  display: flex;
  position: relative;
	max-width: 100%;
	align-items: top;
	justify-content: center;
	background: rgb(4, 69, 143);

	padding: 30px 20px;
	h1 {
		color: white;
	}
`;

export const Label = styled.label`
color: black; 
@media only screen and (max-width: 900px) {
	width: 100%;
}
`;

export const TextArea = styled.textarea`
resize: none;
@media only screen and (max-width: 900px) {
	width: 100%;
}
`;

export const UpdateRouteForm = styled.form`
  padding: 20px 40px;
  align-items: center;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 20px 40px;
  ${media.tablet`
    grid-template-columns: 1fr 1fr;
  `}
`;

export const Grid = styled.div`
  grid-column: span 2;
  text-align: left;
  ${media.tablet`
    grid-column: span 1;
  `}
`;

export const Input = styled.input`margin: 5px;`;

export const Button = styled.button`
	max-width: 128px;
	display: inline-block;

	&:first-child {
		margin-right: 10px;
	}
`;



