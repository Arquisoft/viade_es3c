import React from 'react';
import {
    Header,
    RouteWrapper,
    MyRouteContainer,
    FormRenderContainer
} from './myfriends.style';
import { List, useWebId} from '@solid/react';
import InfoFriends from "./InfoFriends";
import {sharing} from "../../utils/permissions";


type Props = { webId: String };

class MyFriends extends React.Component{

    constructor({ webId }: Props) {
        super();
        this.webID = webId;
        console.log(this.getUrl(this.webID) + 'public/viade/' + 'Prueba' + '_' + this.getUserName(this.webID) + '.ttl')
    }
    getUserName(name){
        let username = name.replace("https://", "");
        return username.replace(".solid.community/", "").replace("profile/card#me", "");
    }



    getUrl(name){
        return name.replace("profile/card#me", "");
    }

    permit(friend, route){
        //https://sonialavandera.solid.community/public/viade/Prueba_sonialavandera.ttl
        let nameRoute = this.getUrl(this.webID) + 'public/viade/' + route + '_' + this.getUserName(this.webID) + '.ttl';
        console.log("Entra aqui");
        sharing(this.webID, friend, nameRoute);
    }
    share(route){
        //Construir la url de la ruta (name)
        //el amigo ya lo tengo en la lista  -> cuando le doy a la url de la ruta para que la vea el amigo

        return <List src={"user.friends"}>{
            (item, i) =>
                <InfoFriends
                    key={i}
                    name={this.getUserName(`${item}`)}
                    url={<a href="#" onClick={this.permit(`${item}`, route)}>{this.getUrl(`${item}`)}</a>}/>
        }
        </List>;
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
                         {this.share("Prueba")}
                     </FormRenderContainer>
                 </MyRouteContainer>
             </RouteWrapper>
         );
     }


};



export default MyFriends;
