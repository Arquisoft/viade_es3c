import React from 'react';
import {
    Header,
    RouteWrapper,
    MyRouteContainer,
    FriendsList,
    FormRenderContainer
} from './myfriends.style';
import { List } from '@solid/react';
import Image from "@solid/react/lib/components/Image";
import useLDflexList from "@solid/react/lib/hooks/useLDflexList";
import InfoFriends from "./InfoFriends";
import useLDflexValue from "@solid/react/lib/hooks/useLDflexValue";

class MyFriends extends React.Component{

    getUserName(name){
        let username = name.replace("https://", "");
        return username.replace(".solid.community/", "").replace("profile/card#me", "");
    }

    getUrl(name){
        return name.replace("profile/card#me", "");
    }

 render(): React.ReactNode {
        return (
             <RouteWrapper data-testid="route-component">
                 <MyRouteContainer>
             <FormRenderContainer>
                 <Header>
                     <h1>My friends</h1>
                 </Header>
                 <List src={"user.friends"}>{
                     (item, i) =>
                         <InfoFriends
                             key={i}
                             name= {this.getUserName(`${item}`)}
                             url = {<a href={this.getUrl(`${item}`)}>{this.getUrl(`${item}`)}</a>} />
                 }
                 </List>
             </FormRenderContainer>
                 </MyRouteContainer>
             </RouteWrapper>
         );
     }
};



export default MyFriends;
