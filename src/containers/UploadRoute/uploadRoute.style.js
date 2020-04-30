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
  max-width: 750px;
  margin: 10px 10px;
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

	padding: 30px 60px;
	h1 {
		color: white;
	}
`;

export const Label = styled.label`
color: black; 
@media only screen and (max-width: 100px) {
	width: 100%;
}
`;

export const TextArea = styled.textarea`
resize: none;
@media only screen and (max-width: 1000px) {
	width: 100%;
}
`;

export const Grid = styled.div`
  grid-column: span 2;
  text-align: left;
  ${media.tablet`
    grid-column: span 1;
  `}
`;

export const GridButton = styled.div`
  grid-column: span 2;
  text-align: right;
  ${media.tablet`
    grid-column: span 1;
  `}
`;

export const Input = styled.input`
  margin: 2px;`
  ;

export const Button = styled.button`
	max-width: 128px;
	display: inline-block;
	flex: right;
	&:first-child {
		margin-right: 10px;
	}
`;

export const RouteForm = styled.form`max-width: 100%;
@media only screen and (max-width: 900px) {
		align-text:center;		
		max-width: 100%;
		h5,
		h6,
		p,
		ul li {
			color: white;
			text-align: center;
			margin: auto;
			font-family: 'Work Sans', sans-serif;
			font-size: 12px;
		}
		input {
			margin:auto;
			max-width: 100%;
		}`;

export const DivForms = styled.div`margin: 1em;@media only screen and (max-width: 900px) {
		align-text:center;		
		max-width: 100%;
		h5,
		h6,
		p,
		ul li {
			color: white;
			text-align: center;
			margin: auto;
			font-family: 'Work Sans', sans-serif;
			font-size: 12px;
		}
		input {
			margin:auto;
			max-width: 100%;
		}`;

export const Form = styled.form`
  padding: 20px 40px;
  align-items: center;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 20px 40px;
     h4{
     color:#00B020 ;
     margin-bottom: 0px;
   }
  ${media.tablet`
    grid-template-columns: 1fr 1fr;
  `}
`;
