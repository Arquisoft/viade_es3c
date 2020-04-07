import React from 'react';
import {sharing} from "../../utils/permissions";
import {getUrl, getUserName} from "../MyFriends/MyFriends";
import {List} from "@solid/react";
import {FriendsList} from "../MyFriends/myfriends.style";
import {useEffect} from 'react';
import {NotificationTypes, useNotification} from '@inrupt/solid-react-components';
import {notification} from '@utils';
import auth from "solid-auth-client";

type Props = { webId: String };

const  exp = ({match,}) => {
    let cadena = null;
    let friendWebID = this.webID;
    const {createNotification} = useNotification(cadena);
  

    useEffect(() => {
        auth.trackSession(session => {
            if (session) {
                cadena = session.webId;
                console.log(cadena)
            }
        });
    });

    async function sendNotification(content, to, type, license) {
        try {
            await createNotification(content, to, type, license);
        } catch (error) {
            console.log(error);
            alert('Error: RouteConst > sendNotification');
        }
    }
     function handleSave(route) {
        try {
            const contentNotif = {
                title: "Route share",
                summary: "Prueba 1",
                actor: cadena,
                object: cadena + "viade/" + route.name,
                target: friendWebID
            };
            publish(sendNotification, contentNotif, friendWebID, NotificationTypes.OFFER);
        } catch (error) {
            console.log(error);
            alert("Could not share the route");
        }
    }
    const publish = async (createNotification, content, webId, type) => {
        try {
            type = type || NotificationTypes.ANNOUNCE;

            const license = 'https://creativecommons.org/licenses/by-sa/4.0/';

            const inboxes = await notification.findUserInboxes([
                {path: webId, name: 'Global'}
            ]);
            if (inboxes.length === 0)
                return false;
            const to = notification.getDefaultInbox(inboxes, 'Global');
            if (to) {

                await createNotification({
                    title: content.title,
                    summary: content.summary,
                    actor: content.actor,
                    object: content.object,
                    target: content.target
                }, to.path, type, license);
            }
            return true;
        } catch (e) {
            console.error(e);
            return false;
        }
    };
    /* function handleFriendChange(event) {
        event.preventDefault();
        friendWebID = event.target.value;
    } */
}


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
            exp.handleSave(this.props.ruta)
            this.permit(friend, this.props.ruta, this.props.autor)
    }


    render(): React.ReactNode {
        return (
                        <FriendsList>
                        <List src={"user.friends"}>{
                            (item, i) =>
                                <li key={i}>{
                                <a href="http://localhost:3000/#/myRoutes" onClick={(e) => this.handleClick(`${item}`, e)}>{getUserName(`${item}`)}</a>}
                                </li>}
                        </List>
                    </FriendsList>
        );
    }


};

export default Share;


