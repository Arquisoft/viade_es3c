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

    addFriends(){
        return (
            <form>
                <label>
                    WebId:
                    <input type="text" name="webId" />
                </label>
                <input type="submit" value="Add" />
            </form>
        );
    }

 render(): React.ReactNode {
        return (
             <RouteWrapper data-testid="route-component">
                 <MyRouteContainer>

                     <FormRenderContainer>
                         <div>
                             <Header>
                                 <h1>Adding new Friends</h1>
                             </Header>
                             {this.addFriends()}
                         </div>
                         <div>
                             <Header>
                                 <h1>My friends</h1>
                             </Header>
                             {this.getList()}
                         </div>
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
