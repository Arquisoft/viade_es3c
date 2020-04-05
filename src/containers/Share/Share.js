import React from 'react';
import {sharing} from "../../utils/permissions";
import {getUrl, getUserName, getWebId} from "../MyFriends/MyFriends";
import {List, useLDflexValue, useWebId} from "@solid/react";
import {Button, FormRenderContainer, FriendsList} from "../MyFriends/myfriends.style";

type Props = { webId: String };

class Share extends React.Component{

    constructor({ webId }: Props) {
        super();
        this.webID=webId;
    }


    permit(friend, route, autor){
        //https://sonialavandera.solid.community/profile/card#me
        //https://sonialavandera.solid.community/public/viade/Prueba_sonialavandera.ttl
        let nameRoute = getUrl(this.webID) + 'public/viade/' + route + '_' + autor + '.ttl';
        sharing(this.webID, friend, nameRoute);
        alert("Ruta: " + route + " compartida con " + friend);
    }

    handleClick = (friend, e) =>{
        e.preventDefault();
            this.permit(friend, this.props.ruta, this.props.autor)
    }


    render(): React.ReactNode {
        return (
                        <FriendsList>
                        <List src={"user.friends"}>{
                            (item, i) =>
                                <li key={i}>{
                                <a href="#" onClick={(e) => this.handleClick(`${item}`, e)}>{getUserName(`${item}`)}</a>}
                                </li>}
                        </List>
                    </FriendsList>
        );
    }


};

export default Share;
