import React from 'react';
import {successToaster, errorToaster} from '@utils';
import {Loader} from '@util-components';
import {
    Header,
    RouteCard,
    RouteWrapper,
    MyRouteContainer,
    FormRenderContainer,
    Button
} from './myroutes.style';

class MyRoute extends React.Component{

 render(): React.ReactNode {
        return (

            <RouteWrapper data-testid="route-component">
            <MyRouteContainer>
            <FormRenderContainer>
                <Header>
                    <h1>Mis rutas</h1>
                </Header>
            <RouteCard className="card">
                <h2>Ruta de montaña</h2>
                <Button id="viewRoute">Ver ruta</Button>  
 
            </RouteCard>
            <RouteCard className="card">
                                            
            </RouteCard>
            <RouteCard className="card">
                                
            </RouteCard>
            </FormRenderContainer>
            </MyRouteContainer>
            </RouteWrapper>

        );
    }

};

export default MyRoute;