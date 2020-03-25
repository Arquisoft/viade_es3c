import React , { useState } from 'react';
import {RouteCard, Button} from './myroutes.style';

import MyFriends from "../MyFriends";


const InfoRoute = props => {

    let {title, author} = props;


    const [show, setShow] = useState(true);




    return (
        <RouteCard className="card">
            <h3>{title}</h3>
            <p>{author}</p>
            <div>
                <Button id="viewRoute">Ver ruta</Button>
            </div>
            <br></br>
            <div id="button">
                <Button id="viewFriends" onClick={() => setShow(!show)}>Ver amigos</Button>
            </div>
            <br></br>

            {show ? (
                <div></div>
            ) : (
                <MyFriends></MyFriends>
            )}
        </RouteCard>
    );
};



export default InfoRoute;
