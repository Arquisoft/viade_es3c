import React from 'react';
import {
    Header,
    RouteWrapper,
    MyRouteContainer,
    FormRenderContainer
} from './myfriends.style';
import {List} from '@solid/react';
import InfoFriends from "./InfoFriends";


type Props = { webId: String };

class MyFriends extends React.Component{
    constructor({ webId }: Props) {
        super();
        this.webID=webId;
    }


    getList() {
        return <List src={"user.friends"}>{
            (item, i) =>
                <InfoFriends
                    key={i}
                    name={getUserName(`${item}`)}
                    url={<a href={getUrl(`${item}`)}>{getUrl(`${item}`)}</a>}
                />
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

export const getUserName = (name) => {
    let username = name.replace("https://", "");
    return username.replace(".solid.community/", "").replace("profile/card#me", "");
}

export const getUrl = (name) => {
    return name.replace("profile/card#me", "");
};



export default MyFriends;
