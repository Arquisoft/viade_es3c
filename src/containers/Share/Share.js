import React from 'react';
import {sharing} from "../../utils/permissions";
import {List, useLDflexValue, useWebId} from "@solid/react";
import {FormRenderContainer, FriendsList} from "../MyFriends/myfriends.style";


class Share extends React.Component{




    getUserName(name){
        let username = name.replace("https://", "");
        return username.replace(".solid.community/", "").replace("profile/card#me", "");
    }



    getUrl(name){
        return name.replace("profile/card#me", "");
    }


    permit(friend, route, autor){
        const webId = useWebId();
        console.log("Entra por aqui");
        console.log("Webid prueba: " + webId);
        //https://sonialavandera.solid.community/public/viade/Prueba_sonialavandera.ttl
        let nameRoute = autor + ".solid.community/" + 'public/viade/' + route + '_' + autor + '.ttl';
        console.log("Ruta nombre" + nameRoute)
        sharing(autor + ".solid.community/", friend, nameRoute);
    }


    render(): React.ReactNode {
        return (
                    <FormRenderContainer>
                        <FriendsList>
                        <List src={"user.friends"}>{
                            (item, i) =>
                                <li key={i}>{
                                    <a href="#" onClick={this.permit(`${item}`, this.props.ruta, this.props.autor)}>{this.getUserName(`${item}`)}</a>}
                                </li>}
                        </List>
                    </FriendsList>
                    </FormRenderContainer>
        );
    }


};

export default Share;
