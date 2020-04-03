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
        let nameRoute = autor + ".solid.community/" + 'public/viade/' + route + '_' + autor + '.ttl';
        console.log("Ruta nombre" + nameRoute)
        sharing(autor + ".solid.community/", friend, nameRoute);
    }
    share(route, autor){
        //Construir la url de la ruta (name)
        //el amigo ya lo tengo en la lista  -> cuando le doy a la url de la ruta para que la vea el amigo
        console.log(route, autor)
        return <FriendsList>
            <List src={"user.friends"}>{
                (item, i) =>
                    <li key={i}>{
                        <a href="" onClick={this.permit(`${item}`, route, autor)}>{this.getUserName(`${item}`)}</a>}
                    </li>}
            </List>
        </FriendsList>;
    }

    render(): React.ReactNode {
        return (
                    <FormRenderContainer>
                        {this.share(this.props.ruta, this.props.autor)}
                    </FormRenderContainer>
        );
    }


};

export default Share;
