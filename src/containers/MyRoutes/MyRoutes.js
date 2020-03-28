import React from 'react';
import {
    Header,
    RouteWrapper,
    MyRouteContainer,
    FormRenderContainer
} from './myroutes.style';
import InfoRoute from './InfoRoute';
import { viadeManager } from "@utils";

const rutas = viadeManager.readRoutesFromPod();

class MyRoute extends React.Component{

 render(): React.ReactNode {
        return (
            <RouteWrapper data-testid="route-component">
            <MyRouteContainer>
            <FormRenderContainer>
                <Header>
                    <h1>Mis rutas</h1>
                </Header>
                {rutas.map((ruta, index) => {
          return ( 
          <InfoRoute
                title={ruta.title}
                author={ruta.author}
                description={ruta.description}
                />
            );
        })}
            </FormRenderContainer>
            </MyRouteContainer>
            </RouteWrapper>

        );
    }

};

export default MyRoute;
