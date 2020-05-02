import styled from "styled-components";
import { GradientBackground, Panel } from "@util-components";

export const RegisterWrapper = styled(GradientBackground)`
	width: 100%;
  background: url("img/welcome_image.jpeg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  h1 {
    font-size: 25px;
    font-family: "Work Sans", sans-serif;
  }
  margin-top: 60px;
`;

export const RegisterPanel = styled(Panel)`
  justify-content: space-between;
  margin-top:50%;
  margin-bottom:50%;
h1 {
    font-size: 25px;
    font-family: "Work Sans", sans-serif;
   	margin: 10px;

  }
`;

export const PanelHeader = styled.div`
	position: relative;

	h2 {
		position: relative;
		padding: 0;
		font-family: "Work Sans", sans-serif;
		font-size: 20px;
		font-weight: bold;
		letter-spacing: 0.75px;
		line-height: 24px;
		text-align: center;
		margin: 10px;
		animation: fadeIn 0.5s ease-in;
	}
`;

export const PanelBody = styled.div`
	height: 100% !important;
	animation: fadeIn 0.2s ease-in;

	a {
		display: block;
		color: #449df5;
		font-family: Raleway;
		font-size: 12px;
		font-weight: 500;
		letter-spacing: 0.75px;
		line-height: 14px;
		text-align: center;
		text-decoration: none;

		&:hover {
			font-weight: 700;
		}
	}

	.a-with-spacing {
		margin: 24px 0;
	}

	ul {
		padding: 0;
		margin: 0;
	}
`;

export const Actions = styled.div`
	height: 32px;
	box-sizing: border-box;
	display: flex;
	flex-direction: row-reverse;
	justify-content: space-between;

	button {
		height: 32px;
		width: 150px;
		border-radius: 4px;
		font-family: Raleway;
		font-size: 10px;
		font-weight: bold;
		letter-spacing: 0.89px;
		line-height: 11px;
		text-align: center;
		text-transform: uppercase;
		border: solid 2px #449df5;
		box-sizing: border-box;
	}

	.btn-solid {
		background-color: #449df5;
		color: #ffffff;
	}

	.btn-outlined {
		background-color: #ffffff;
		color: #449df5;
		filter: opacity(40%);
	}
`;
