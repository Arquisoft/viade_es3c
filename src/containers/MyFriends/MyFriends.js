import React from 'react';
import {
    Header,
    RouteWrapper,
    MyRouteContainer,
    FriendsList,
    FormRenderContainer
} from './myfriends.style';
import { List } from '@solid/react';

class MyFriends extends React.Component{


 render(): React.ReactNode {
         return (
             <RouteWrapper data-testid="route-component">
                 <MyRouteContainer>
             <FormRenderContainer>
                 <Header>
                     <h1>My friends</h1>
                 </Header>
                 <FriendsList>
                     <List src={"user.friends"}>{(item, i) =>
                         <li key={i}>{<a href={`${item}`}>{`${item}`}</a>}</li>}
                     </List>
                 </FriendsList>
             </FormRenderContainer>
                 </MyRouteContainer>
             </RouteWrapper>
         );
     }







};



export default MyFriends;
