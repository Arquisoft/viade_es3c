import React from 'react';
import {successToaster, errorToaster} from '@utils';
import {Loader} from '@util-components';
import {
    Header,
    RouteWrapper,
    MyRouteContainer,
    FormRenderContainer
} from './myroutes.style';
import InfoRoute from './InfoRoute';

class MyRoute extends React.Component{

 render(): React.ReactNode {
        return (

            <RouteWrapper data-testid="route-component">
            <MyRouteContainer>
            <FormRenderContainer>
                <Header>
                    <h1>Mis rutas</h1>
                </Header>
            <InfoRoute
                title="Ruta de las xanas"
                author="Tania"
                />
            <InfoRoute
                title="Ruta del alba"
                author="Sara"
                />
           <InfoRoute
                title="Ruta del cares"
                author="Gema"
                />
                <InfoRoute
                title="Senda del oso"
                author="Sonia"
                />
                <InfoRoute
                title="Ruta arenal de morís"
                author="Javi"
                />
                <InfoRoute
                title="Ruta de los molinos"
                author="Guillermo"
                />
            </FormRenderContainer>
            </MyRouteContainer>
            </RouteWrapper>

        );
    }

};

export default MyRoute;