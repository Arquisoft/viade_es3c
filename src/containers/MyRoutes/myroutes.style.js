import styled from "styled-components";

export const RouteCard = styled.div`
  background: linear-gradient(135deg, #1cd8d2 0%, #57e2cc 30%, #93edc7 100%);
  margin: 15px auto;

  max-width: 80% !important;
  padding: 30px 0 !important; //temporary fix to a style guide bug
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
`;

export const RouteWrapper = styled.section`
  display: flex;
  flex: 1 0 auto;
  align-items: center;
  justify-content: center;
  background: linear-gradient(90deg, #67e3c0ff 0%, #046df0f0 100%);
  background-repeat: repeat;
  padding: 60px 0;
`;
export const MyRouteContainer = styled.div`
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
  background-color: white;
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
    width: 100%;
    height: 370px;
    padding: 0px !IMPORTANT;
  }

`;

export const Header = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  background-image: url("img/pattern-geo.png"),
    linear(135deg, #1cd8d2 0%, #57e2cc 30%, #93edc7 100%);
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
  box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24),
    0 17px 50px 0 rgba(0, 0, 0, 0.19);
  padding: 12px 28px;
  font-size: 16px;
`;

export const Slider = styled.div`
  width: 100%;
  position: relative;
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

export const OrderLi = styled.li`
  overflow: hidden;
`;

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
