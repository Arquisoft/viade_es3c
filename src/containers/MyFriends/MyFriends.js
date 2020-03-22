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
                    <h1>Mis amigos</h1>
                </Header>
            </FormRenderContainer>
            </MyRouteContainer>
            </RouteWrapper>
        );
    }

};

export default MyFriends;
