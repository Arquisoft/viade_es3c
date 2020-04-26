import styled from "styled-components";
import { media } from "../../utils";

export const WelcomeWrapper = styled.section`
	width: 100%;
	background: url(../img/welcome_image.jpeg);
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
	h3 {
		color: #666;
		span {
			font-weight: bold;
		}
		a {
			font-size: 1.9rem;
		}
	}
	#imgCovid {
		max-width: 5em;
		max-height: 5em;
		margin: auto;
	}
`;

export const WelcomeCard = styled.div`
	background: rgb(230, 234, 235);
	background: linear-gradient(
		180deg,
		rgba(230, 234, 235, 1) 0%,
		rgba(230, 234, 235, 1) 35%,
		rgba(230, 234, 235, 1) 100%
	);
	opacity: 0.9;
	h5,
	h6,
	ul li {
		color: grey;
		text-align: center;
		margin: 10px;
	}
	margin-top: 50px;
	margin-left: 75%;
	#more {
		text-align: center;
	}

	#imgCovid {
		max-width: 5em;
		max-height: 5em;
		margin: auto;
	}
	#covid {
		margin-right: 75%;
	}
	#ubicaciones {
		max-width: 5em;
		max-height: 5em;
		margin: auto;
	}
	img {
		max-width: 80% !important;
	}
	//Overriding the style guide card flexbox settings
	max-width: 20% !important;
	padding: 10px !important; //temporary fix to a style guide bug

	align-items: center;

	input {
		max-width: 40% !important;
	}
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

	h3 {
		text-align: center;
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
		float: right;
		text-decoration: none;
		font-weight: 600;
		font-size: 20px;
		background: ;
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
		border-radius: 50%;
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
  `};
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
	background-image: ${({ image }) => (image ? `url(${image})` : "#ffffff")};
	background-size: cover;
	border-radius: 50%;
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
	border-radius: 6px;
	border: 2px solid #ffffff;

	&:hover {
		text-decoration: none !important;
		color: #ff5900;
		background-color: #ffffff;
	}
`;
