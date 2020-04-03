import React from 'react';
import {sharing} from "../../utils/permissions";
import {List} from "@solid/react";
import InfoFriends from "../MyFriends/InfoFriends";
import {FormRenderContainer, FriendsList, Header, MyRouteContainer, RouteWrapper} from "../MyFriends/myfriends.style";

type Props = { webId: String };

class Share extends React.Component{

    constructor({ webId }: Props) {
        super();
        this.webID = webId;
        console.log(this.webID);
    }


    getUserName(name){
        let username = name.replace("https://", "");
        return username.replace(".solid.community/", "").replace("profile/card#me", "");
    }



    getUrl(name){
        return name.replace("profile/card#me", "");
    }


    permit(friend, route, autor){
        //https://sonialavandera.solid.community/public/viade/Prueba_sonialavandera.ttl
        let nameRoute = this.webID + 'public/viade/' + route + '_' + autor + '.ttl';
        console.log("Ruta nombre" + nameRoute)
        sharing(this.webID, friend, nameRoute);
    }
    share(route, autor){
        //Construir la url de la ruta (name)
        //el amigo ya lo tengo en la lista  -> cuando le doy a la url de la ruta para que la vea el amigo
        console.log(route, autor)
        return <List src={"user.friends"}>{
            (item, i) =>
                <InfoFriends
                    key={i}
                    name={this.getUserName(`${item}`)}
                    url={<a href="" onClick={this.permit(`${item}`, route, autor)}>{this.getUserName(`${item}`)}</a>}/>
        }
        </List>;
    }

    render(): React.ReactNode {
        return (
                    <FormRenderContainer>
                        <Header>
                            <h1>My friends</h1>
                        </Header>
                        {this.share(this.props.ruta, this.props.autor)}
                    </FormRenderContainer>
        );
    }


};

export default Share;
