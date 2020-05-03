import styled from "styled-components";

export const RouteCard = styled.div`
	background: rgb(211, 224, 227);
	box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24), 0 17px 50px 0 rgba(0, 0, 0, 0.19);
	margin-top: 15px;
	margin-bottom: 15px;
	max-width: 100% !important;
	padding: 10px !important; //temporary fix to a style guide bug
	@media only screen and (max-width: 900px) {
		max-width: 100% !important;
		background: none;
		h5,
		h6,
		a,
		ul li {
			color: grey;
			text-align: center;
			margin: auto;
			background: none;
			font-family: "Work Sans", sans-serif;
			font-size: 10px;
		}

		#btnDelete {
			font-size: 8px;
			border: none;
			background: transparent;

			box-shadow: none;
			position: absolute;
			margin-left: 45%;

			bottom: 25px;
			top: 2px;
		}
	}
	a {
		text-decoration: none;

		&:hover {
			text-decoration: underline;
			text-decoration-color: rgb(211, 224, 227);
		}
		display: inline;
	}

	h3 {
		font-weight: bold;
		font-size: 15px;
		display: inline;
		margin: 25px;
		align: left;
	}
	#btnDelete {
		font-size: 12px;
		border: none;
		background: transparent;

		box-shadow: none;
		position: absolute;
		margin-left: 45%;

		bottom: 25px;
		top: 2px;
	}
`;

export const FormAddFriends = styled.div`
	display: flex;
	justify-content: center;

	input {
		margin-top: 20px;
		max-width: 70%;
	}
	color: grey;

	#botonaddfriends {
		max-width: 20%;
		margin-left: 20px;
	}
	form {
		text-align: center;
		align: center;
	}
	@media only screen and (max-width: 900px) {
		padding: auto;
		h5,
		h6,
		ul li {
			color: grey;
			text-align: center;
			margin: auto;
			font-family: "Work Sans", sans-serif;
			font-size: 10px;
		}

		input {
			max-width: 100%;
		}
		color: grey;

		#botonaddfriends {
			margin: 10px auto;
			padding: auto;
		}
	}
`;

export const Friends = styled.div`
	display: flex;
	justify-content: center;
	height: 50%;
	overflow-y: scroll;
`;

export const FriendsList = styled.div`
	display: flex;
	position: relative;
	align-text: left;
	justify-content: center;
	padding: 10px 5px;
	margin-right: 50px;
	border-left: groove;
	box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);

	a {
		font-size: 20px;
		font-weight: bold;
	}
`;

export const RouteWrapper = styled.section`
	display: flex;

	flex: 1 0 auto;
	align-items: center;
	justify-content: center;
	background: url("img/share.png");
	background-position: center;
	background-attachment: fixed;
	background-size: cover;
	padding: 60px 0;
	@media only screen and (max-width: 900px) {
		padding: auto;

		h5,
		h6,
		ul li {
			color: grey;
			text-align: center;
			margin: auto;
			font-family: "Work Sans", sans-serif;
			font-size: 10px;
		}
	}
`;
export const MyRouteContainer = styled.div`
	background-color: rgb(211, 224, 227);
	max-width: 900px;
	box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24), 0 17px 50px 0 rgba(0, 0, 0, 0.19);

	margin: 20px 20px;
	width: 100%;

	color: white;
	margin-right: 30%;
	@media only screen and (max-width: 900px) {
		box-shadow: none;
		margin: 0 auto !important;
		width: 250px;
		h5,
		h6,
		ul li {
			color: grey;
			text-align: center;
			margin: 0px;
			font-family: "Work Sans", sans-serif;
			font-size: 10px;
		}
	}
`;
export const FormRenderContainer = styled.div`
	margin-left: 8%;
	text-align: center;
`;

export const FormRenderContainerMult = styled.div`

  //border: 1px solid #dae0e6;
  min-height: 40px;
  padding: 5px;

  background: LIGHTSKYBLUE;
  background-repeat: repeat, no-repeat;
  padding: 30px 20px;
  height : 100%
  width: 100%;

  .input-wrap {
    margin: 0;
  }

  input {
    margin-left: 0;
  }

  @media only screen and (max-width: 900px) {
		margin-top: 5px;
		margin: auto;
		padding: auto;
		h5,
		h6,
		ul li {
			color: grey;
			text-align: center;
			margin: auto;
			font-family: 'Work Sans', sans-serif;
			font-size: 10px;
		}
	}
`;

export const DivSlider = styled.div`
	height: 372px;
	width: 600px;
`;

export const ImgSlider = styled.img`
	height: 372px;
	width: 600px;
`;

export const Header = styled.div`
	display: flex;
	position: relative;

	align-items: center;
	justify-content: center;
	background-image: url("img/pattern-geo.png"), linear(135deg, #1cd8d2 0%, #57e2cc 30%, #93edc7 100%);
	background-repeat: repeat, no-repeat;
	padding: 10px 5px;

	color: white;

	.edit-button {
		background: rgba(255, 255, 255, 0.1);
		border: 2px solid white;
		position: absolute;
		right: 20px;
		top: 20px;
		font-size: 1rem;
	}
	@media only screen and (max-width: 900px) {
		margin-top: 5px;
		margin: auto;
		padding: auto;
		h5,
		h6,
		ul li {
			color: grey;
			text-align: center;
			margin: auto;
			font-family: "Work Sans", sans-serif;
			font-size: 10px;
		}
	}
`;

export const Button = styled.button`
	box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24), 0 17px 50px 0 rgba(0, 0, 0, 0.19);

	font-size: 15px;
	margin-right: 30px;
`;
