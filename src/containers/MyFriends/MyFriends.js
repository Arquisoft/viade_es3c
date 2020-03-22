import React from 'react';
import {
    Header,
    RouteWrapper,
    MyRouteContainer,
    FormRenderContainer
} from './myfriends.style';
import InfoFriends from './InfoFriends';

class MyFriends extends React.Component{

 render(): React.ReactNode {
        return (

            <RouteWrapper data-testid="route-component">
            <MyRouteContainer>
            <FormRenderContainer>
                <Header>
                    <h1>Mis rutas</h1>
                </Header>
            <InfoFriends
                title="Ruta de las xanas"
                author="Tania"
                />
            <InfoFriends
                title="Ruta del alba"
                author="Sara"
                />
           <InfoFriends
                title="Ruta del cares"
                author="Gema"
                />
                <InfoFriends
                title="Senda del oso"
                author="Sonia"
                />
                <InfoFriends
                title="Ruta arenal de morís"
                author="Javi"
                />
                <InfoFriends
                title="Ruta de los molinos"
                author="Guillermo"
                />
            </FormRenderContainer>
            </MyRouteContainer>
            </RouteWrapper>

        );
    }

};

export default MyFriends;
