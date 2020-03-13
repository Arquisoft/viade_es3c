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
                <h3>Ruta de montaña</h3>
                   <p>Autor</p>
                <div>
                <Button id="viewRoute">Ver ruta</Button>  
                </div>
            </RouteCard>
            <RouteCard className="card">
            <h3>Ruta del Alba</h3>
                   <p>Autor</p>
                <div>
                <Button id="viewRoute">Ver ruta</Button>  
                </div>
                                            
            </RouteCard>
            <RouteCard className="card">
                <h3>Ruta del cares</h3>
                   <p>Autor</p>
                <div>
                <Button id="viewRoute">Ver ruta</Button>  
                </div>
            </RouteCard>
            </FormRenderContainer>
            </MyRouteContainer>
            </RouteWrapper>

        );
    }

};

export default MyRoute;