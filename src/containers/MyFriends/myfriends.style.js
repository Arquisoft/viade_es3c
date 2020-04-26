import styled from "styled-components";

export const RouteCard = styled.div`
	background: rgb(211, 224, 227);
	box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24), 0 17px 50px 0 rgba(0, 0, 0, 0.19);

	display: flex;
	margin-top: 15px;
	max-width: 100% !important;
	padding: 10px !important; //temporary fix to a style guide bug
	a {
		text-decoration: none;
		&:hover {
			text-decoration: underline;
			text-decoration-color: rgb(211, 224, 227);
		}
		display: inline;
	}
	p {
		font-size: 25px;
		justify-content: center;
		font-weight: bold;
	}
	h3 {
		font-weight: bold;
		font-size: 20px;
		display: inline;
		margin: 10px;
		text-align: center;
		justify: center;
	}
	#btnDelete {
		font-size: 14px;
		padding: 10px 20px;
		margin-left: 0px !important;
		box-shadow: none;
	}
`;

export const FormAddFriends = styled.div`
	display: flex;
	justify-content: center;

	input {
		margin-top: 20px;
		max-width: 55%;
	}
	color: grey;

	#botonaddfriends {
		max-width: 20%;
		margin-left: 20px;
	}
	form {
		text-align: center;
	}
`;

export const Friends = styled.div`
	display: flex;
	justify-content: center;
	height: 600px;
`;

export const FriendsList = styled.div`
	display: flex;
	position: relative;
	align-items: center;
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
	background: url(../img/share.png);
	background-position: center;
	background-attachment: fixed;
	background-size: cover;
	padding: 60px 0;
`;
export const MyRouteContainer = styled.div`
	background-color: rgb(211, 224, 227);
	max-width: 900px;
	box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24), 0 17px 50px 0 rgba(0, 0, 0, 0.19);

	margin: 0 20px;
	width: 100%;
	flex: 1 0 auto;
	color: white;
	margin-right: 50%;
`;
export const FormRenderContainer = styled.div`
	min-height: 40px;
	padding: 5px;
	margin: 15px 20px;
	padding: 30px 20px;
	.inrupt-form-group {
		border: 1px solid #c0c0c0;
		background-color: #f9f9f9;
		margin: 15px 0;
	}

	.input-wrap {
		margin: 0;
		box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
	}

	input {
		margin-left: 0;
		box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
	}
	color: white;
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
`;

export const Button = styled.button`
	box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24), 0 17px 50px 0 rgba(0, 0, 0, 0.19);
	padding: 8px 10px;
	font-size: 15px;
	margin-right: 30px;
`;
