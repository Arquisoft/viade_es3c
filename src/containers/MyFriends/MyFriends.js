import React from 'react';
import {
    Header,
    RouteWrapper,
    MyRouteContainer,
    FormRenderContainer
} from './myfriends.style';
import { List } from '@solid/react';
import InfoFriends from "./InfoFriends";

class MyFriends extends React.Component{

    getUserName(name){
        let username = name.replace("https://", "");
        return username.replace(".solid.community/", "").replace("profile/card#me", "");
    }

    getUrl(name){
        return name.replace("profile/card#me", "");
    }

    getList() {
        return <List src={"user.friends"}>{
            (item, i) =>
                <InfoFriends
                    key={i}
                    name={this.getUserName(`${item}`)}
                    url={<a href={this.getUrl(`${item}`)}>{this.getUrl(`${item}`)}</a>}/>
        }
        </List>;
    }

 render(): React.ReactNode {
        return (
             <RouteWrapper data-testid="route-component">
                 <MyRouteContainer>
                     <FormRenderContainer>
                         <Header>
                             <h1>My friends</h1>
                         </Header>
                         {this.getList()}
                     </FormRenderContainer>
                 </MyRouteContainer>
             </RouteWrapper>
         );
     }


};



export default MyFriends;
