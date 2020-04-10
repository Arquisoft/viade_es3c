import React from "react";
import { Loader } from "@util-components";
import {
  Header,
  RouteWrapper,
  MyRouteContainer,
  FormRenderContainer
} from "./myroutes.style";
import InfoRoute from "./InfoRoute";
import { viadeManager } from "@utils";

type Props = { webId: String };

class MyRoute extends React.Component {
  constructor({ webId }: Props) {
    super();
    this.state = {
      data: null    
    };
  }
  componentDidMount() {
    const { webId } = this.props;       
    this._asyncRequest = viadeManager.readRoutesFromPod(webId).then(data => {         
      this._asyncRequest = null;      
      this.setState( {data} );       
    });
  }  
 
  render(): React.ReactNode {
    if (this.state.data !== null) {
      return (
        <RouteWrapper data-testid="route-component">
          <MyRouteContainer data-testid="myroute-container">
            <FormRenderContainer>
              <Header data-testid="myroute-header">
                <h1>Mis rutas</h1>
              </Header>
             {this.state.data.map((ruta, index) => {
                return (
                  <InfoRoute key={index}
                    name={ruta.name}
                    author={ruta.author}
                    description={ruta.description}
                    points={ruta.points}
                    center={ruta.calculateCenter()}
                    mult={ruta.multimedia}
                    r={ruta}
                  />
                );               
              })}
            </FormRenderContainer>
          </MyRouteContainer>
        </RouteWrapper>
      );
    } else {
      return <Loader absolute />;
    }
  }
}

export default MyRoute;
