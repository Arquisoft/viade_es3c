import React from 'react';
import {sharing} from "../../utils/permissions";
import {List, useLDflexValue, useWebId} from "@solid/react";
import {Button, FormRenderContainer, FriendsList} from "../MyFriends/myfriends.style";

type Props = { webId: String };

class Share extends React.Component{

    constructor({ webId }: Props) {
        super();
        this.webID=this.props;
    }

    getUserName(name){
        let username = name.replace("https://", "");
        return username.replace(".solid.community/", "").replace("profile/card#me", "");
    }



    getUrl(name){
        return name.replace("profile/card#me", "");
    }

    permit(friend, route, autor){
        console.log("Entra por aqui");
        console.log("Webid prueba: " + this.webID);
        //https://sonialavandera.solid.community/profile/card#me
        //https://sonialavandera.solid.community/public/viade/Prueba_sonialavandera.ttl
        let nameRoute = "https://" +autor + ".solid.community/" + 'public/viade/' + route + '_' + autor + '.ttl';
        console.log("Ruta nombre" + nameRoute)
        sharing("https://"+autor + ".solid.community/profile/card#me", friend, nameRoute);
        alert("Ruta: " + route + " compartida con " + friend);
    }

    handleClick = (friend, e) =>{
        e.preventDefault();
        console.log("Amigo" + friend)
            this.permit(friend, this.props.ruta, this.props.autor)
    }


    render(): React.ReactNode {
        return (
                        <FriendsList>
                        <List src={"user.friends"}>{
                            (item, i) =>
                                <li key={i}>{
                                <a href="#" onClick={(e) => this.handleClick(`${item}`, e)}>{this.getUserName(`${item}`)}</a>}
                                </li>}
                        </List>
                    </FriendsList>
        );
    }


};

export default Share;
