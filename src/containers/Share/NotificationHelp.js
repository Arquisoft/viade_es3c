import React, {useEffect} from 'react';
import {NotificationTypes, useNotification} from '@inrupt/solid-react-components';
import {notification} from '@utils';
import auth from "solid-auth-client";
import {FriendsList} from "../MyFriends/myfriends.style";
import {List} from "@solid/react";
import {getUrl, getUserName} from "../MyFriends/MyFriends";
import {sharing} from "../../utils/permissions";


const Notifications = ({ruta}) => {
        let cadena = null;
        let friendWebID = null;

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

        function handleSave(friendWebId) {
            let nameRoute = getUrl(cadena) + 'public/viade/' + ruta + '_' + getUserName(cadena) + '.ttl';
            sharing(cadena, friendWebId, nameRoute);
            try {
                const contentNotif = {
                    title: "Route share",
                    summary: getUserName(cadena) + " ha compartido su ruta contigo",
                    actor: cadena,
                    object: nameRoute,
                    target: friendWebId
                };
                publish(sendNotification, contentNotif, friendWebId, NotificationTypes.OFFER);
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

    return (
        <FriendsList>
            <List src={"user.friends"}>{
                (item, i) =>
                    <li key={i}>{
                        <a href="http://localhost:3000/#/myRoutes" onClick={(e) => handleSave(`${item}`, e)}>{getUserName(`${item}`)}</a>}
                    </li>}
            </List>
        </FriendsList>
    );

    }

;

export default Notifications;




