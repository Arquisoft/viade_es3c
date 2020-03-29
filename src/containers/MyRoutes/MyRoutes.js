import React from 'react';
import {
    Header,
    RouteWrapper,
    MyRouteContainer,
    FormRenderContainer
} from './myroutes.style';
import InfoRoute from './InfoRoute';
import { viadeManager } from "@utils";
import { Route, Point } from "domain";

//var rutas = [];
//rutas = viadeManager.readRoutesFromPod();

const point = new Point( 43.354831, -5.851303);
const point2 = new Point(43.356440, -5.854693);
const points=[point, point2];
const ruta1 = new Route("Ruta1", "Ruta de montaña", "Tania", points);

const point3 = new Point(43.354831, -5.851303);
const point4 = new Point(43.361836, -5.850547);
const points2=[point3, point4];
const ruta2 = new Route("Ruta2", "Ruta de montaña", "Tania", points2);

const rutas = [ruta1, ruta2];

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
