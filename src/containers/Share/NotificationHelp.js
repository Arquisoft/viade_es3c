import React, {useEffect} from 'react';
import {NotificationTypes, useNotification} from '@inrupt/solid-react-components';
import {notification} from '@utils';
import auth from "solid-auth-client";


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

        function handleSave() {
            try {
                const contentNotif = {
                    title: "Route share",
                    summary: "hola guapa",
                    actor: cadena,
                    object: cadena + "viade/" + ruta,
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

        return handleSave();

    }

;

export default Notifications;




