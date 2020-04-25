import React, {useEffect, useState} from 'react';
import {NotificationTypes, useNotification} from '@inrupt/solid-react-components';
import {notification} from '@utils';
import auth from "solid-auth-client";
import {FriendsList} from "../MyFriends/myfriends.style";
import {List} from "@solid/react";
import {getUrl, getUserName} from "../MyFriends/MyFriends";
import {sharing} from "../../utils/permissions";
import i18n from "i18n";
import {Button } from "../MyRoutes/myroutes.style";
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Checkbox from '@material-ui/core/Checkbox';

const Notifications = ({ruta}) => {
        let cadena = null;

        const {createNotification} = useNotification(cadena);

        const [checkedItems, setCheckedItems] = useState(new Map());

        const handleChange = (event) => {
            setCheckedItems(checkedItems => checkedItems.set(event.target.value, event.target.checked));
            console.log("checkedItems: ", checkedItems);
        }

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

       
        function showNotifications(friendWebId, e) {
            e.preventDefault();
            //url de la ruta será: uuid.ttl 
            let nameRoute = getUrl(cadena) + 'public/viade/routes/' + ruta + '.ttl';
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

        function shareWithFriends(e){
            e.preventDefault();
            console.log("Friends selected " + checkedItems);
            for (var [key, value] of checkedItems) {
                showNotifications(key, e);
              }
            givePermissions(checkedItems);
        }

        function givePermissions(){
            let nameRoute = getUrl(cadena) + 'public/viade/routes/' + ruta + '.ttl';
            console.log("ruta!!!!!: " + nameRoute)
            sharing(cadena, checkedItems, nameRoute);
        }

    return (
        <FriendsList>
            <List src={"user.friends"}>{
                (item, i) =>
                <ul>
                    <li>
                    <Checkbox name={getUserName(`${item}`)}
                                  value={`${item}`}
                                  checked={checkedItems.get(item.name)}
                                  onChange={handleChange} color="primary"
                                  checkedIcon={<CheckBoxIcon fontSize="small" />}/>
                        <label key={item.key}>
                        {getUserName(`${item}`)}
                        </label>
                        </li>
                        </ul>
                        }
            </List>
            <Button onClick={(e) => shareWithFriends(e)}>
                                {i18n.t("myRoutes.btnShare")}
                            </Button>
        </FriendsList>
    );
    
    }
;
export default Notifications;




