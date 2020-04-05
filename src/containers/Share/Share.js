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



    permit(friend, route, autor){
        console.log("Entra por aqui");
        console.log("Webid prueba: " + this.webID);
        //https://sonialavandera.solid.community/public/viade/Prueba_sonialavandera.ttl
        let nameRoute = autor + ".solid.community/" + 'public/viade/' + route + '_' + autor + '.ttl';
        console.log("Ruta nombre" + nameRoute)
        sharing(autor + ".solid.community/", friend, nameRoute);
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
                                <a href="#" onClick={(e) => this.handleClick(`${item}`, e)}>{this.props.autor}</a>}
                                </li>}
                        </List>
                    </FriendsList>
        );
    }


};

export default Share;
