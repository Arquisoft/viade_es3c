import styled from "styled-components";

export const RouteCard = styled.div`
	margin: 15px auto;
	max-width: 78% !important;
	padding: 5px 15px !important;
	text-align: center;
	a {
		text-decoration: none;
		&:hover {
			text-decoration: underline;
			text-decoration-color: white;
		}
	}
	h5 {
		text-color: white;
	}
	p {
		font-weight: bold;
		font-size: 20px;
	}
	h2 {
		font-weight: bold;
	}
	h3 {
		font-size: 25px;
		margin: 0 0 0px 0;
	}
	#containerRuta {
		padding: 0px 25px !important;
		a {
			text-decoration: none;
			&:hover {
				text-decoration: underline;
			}
		}
		p {
			font-weight: bold;
			font-size: 20px;
		}
		h2 {
			font-weight: bold;
		}
		h3 {
			font-size: 25px;
			margin: 0 0 0px 0;
		}
	}

	#divBtns {
		margin-left: 560px;
		margin-top: 15px;
		margin-bottom: -140px;
	}

	#btnModify {
		font-size: 14px;
		padding: 10px 20px;
		margin-bottom: 12px;
	}

	#btnDownload {
		font-size: 14px;
		padding: 10px 20px;
		margin-bottom: 12px;
	}

	#btnDelete {
		font-size: 14px;
		padding: 10px 20px;
	}

	#divModificar {
		margin-left: 550px;
		margin-top: 18px;
	}

	#divDelete {
		margin-left: 550px;
		margin-top: 18px;
	}

	#divShare {
		margin-left: 50px;
	}
	#viewFriends {
		margin-left: 50px;
	}
`;

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
export const MyRouteContainer = styled.div`
	overflow: hidden;
	h1 {
		color: white;
	}
	#empty {
		background-color: white;
	}
	#h1-empty {
		color: grey;
	}
	h5 {
		color: grey;
	}
	a {
		color: grey;
	}
	box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
	background: rgb(0, 77, 134);
	background: linear-gradient(180deg, rgba(0, 77, 134, 1) 0%, rgba(227, 222, 222, 1) 92%);
	max-width: 900px;
	margin: 0 20px;
	width: 100%;
	flex: 1 0 auto;
`;
export const FormRenderContainer = styled.div`
  border: 1px solid #dae0e6;
  min-height: 40px;
  padding: 5px;
  background-image: url('img/pattern-geo.png'),
  background-color: white;
  background-repeat: repeat, no-repeat;
  padding: 30px 20px;
  .inrupt-form-group {
    border: 1px solid #c0c0c0;
    background-color: #f9f9f9;
    margin: 15px 0;
  }
  .input-wrap {
    margin: 0;
  }
  input {
    margin-left: 0;
  }
  #mapa{
    width: 570px;
    height: 350px;
    padding: 0px !IMPORTANT;
  }
  #shareRoute{
    display: contents;
	}
`;

export const AutoRotatingCarouselModal = styled.div`
	display: flex;
	position: relative;
	align-items: center;
	text-align: center;
	display: block;
	justify-content: center;
	background: rgb(0, 77, 134);
	background: linear-gradient(180deg, rgba(0, 77, 134, 1) 0%, rgba(227, 222, 222, 1) 92%);
	padding: 10px 5px;
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

export const AutoRotatingCarousel = styled.div`
	display: flex;
	position: relative;
	align-items: center;
	text-align: center;
	display: block;
	justify-content: center;
	background: rgb(0, 77, 134);
	background: linear-gradient(180deg, rgba(0, 77, 134, 1) 0%, rgba(227, 222, 222, 1) 92%);
	padding: 10px 5px;
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

export const Slide = styled.div`
	display: flex;
	position: relative;
	align-items: center;
	text-align: center;
	display: block;
	justify-content: center;
	background: rgb(0, 77, 134);
	background: linear-gradient(180deg, rgba(0, 77, 134, 1) 0%, rgba(227, 222, 222, 1) 92%);
	padding: 10px 5px;
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

export const Header = styled.div`
	display: flex;
	position: relative;
	align-items: center;
	text-align: center;
	display: block;
	justify-content: center;
	background-image: url("img/pattern-geo.png"), linear(135deg, #1cd8d2 0%, #57e2cc 30%, #93edc7 100%);
	background-repeat: repeat, no-repeat;
	padding: 10px 5px;
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

export const Button = styled.button`
	box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24), 0 17px 50px 0 rgba(0, 0, 0, 0.19);
	padding: 8px 10px;
	font-size: 15px;
	margin-right: 30px;
`;

export const Slider = styled.div`
	width: 100%;
	position: relative;
	background: rgb(0, 77, 134);
	background: linear-gradient(180deg, rgba(0, 77, 134, 1) 0%, rgba(227, 222, 222, 1) 92%);
`;

export const OrderList = styled.ul`
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	padding: 15px 50px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	text-align: center;
	color: #fff;
	z-index: 1;
`;

export const OrderLi = styled.li`overflow: hidden;`;

export const OrderLiImg = styled.img`
	width: 100%;
	max-height: 50%;
`;

export const Pagination = styled.ol`
	position: absolute;
	top: 102%;
	width: 100%;
	display: flex;
	justify-content: center;
`;

export const PaginationLi = styled.li`
	font-size: 20px;
	margin: 2px 5px;
	color: #858585;
	cursor: pointer;
`;

export const Left = styled.div`
	left: 10px;
	position: absolute;
	top: 0;
	height: 100%;
	display: flex;
	align-items: center;
	color: #fff;
	font-size: 35px;
	cursor: pointer;
	z-index: 2;
`;

export const Right = styled.div`
	right: 10px;
	position: absolute;
	top: 0;
	height: 100%;
	display: flex;
	align-items: center;
	color: #fff;
	font-size: 35px;
	cursor: pointer;
	z-index: 2;
`;

export const PlayerDiv = styled.div`
      max-height=30px
      max-width=30px
`;
