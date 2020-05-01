import styled from "styled-components";

export const RouteWrapper = styled.section`
	display: flex;
	flex: 1 0 auto;
	flex-direction: row;
	#save_route{
		margin-left:110px;
	}
	@media only screen and (max-width: 900px) {
		padding: auto;
		
		display: flex;
		align:center;
		flex-direction: column;
		max-width: 100%;
		height: 20px;
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
			max-width: 100%;
		}	
`;

export const Header = styled.div`
	max-width: 100%;
	align-items: top;
	justify-content: center;
	background: rgb(0, 77, 134);
	background: linear-gradient(180deg, rgba(0, 77, 134, 1) 0%, rgba(227, 222, 222, 1) 92%);
	padding: 30px 20px;
	p {
		color: white;
	}
`;

export const Input = styled.input`margin: 5px;`;

export const Button = styled.button`
	max-width: 128px;
	display: inline-block;

	&:first-child {
		margin-right: 10px;
	}
`;

export const TextArea = styled.textarea`
	resize: none;
	@media only screen and (max-width: 900px) {
		width: 100%;
	}
`;

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

export const InputSubmit = styled.input`float: right;`;

export const LabelInput = styled.label`
	color: white;
	@media only screen and (max-width: 900px) {
		width: 100%;
	}
`;

export const TitleRoute = styled.h3`
	text-align: center;
	color: white;
`;

export const UploaderFiles = styled.h3`
	margin-top: 1em;
	text-align: center;
`;

export const DivMin = styled.div``;

export const InputFile = styled.input``;

export const DivDivisor = styled.div`padding: 30px 20px;@media only screen and (max-width: 900px) {
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
