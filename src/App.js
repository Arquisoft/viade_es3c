import React from 'react';
import {LoggedOut, LoginButton, LoggedIn} from '@solid/react';
import './App.css';
import {Profile} from './components/Profile';


const App: React.FC = () => {
    return <>
        <React.StrictMode>
            <div className="App">
                <LoggedOut>
                    <p>Conectate a tu pod para usar Viade_es3c</p>
                    <LoginButton className="button"> Connect</LoginButton>
                </LoggedOut>
                <LoggedIn>
                    <Profile/>
                </LoggedIn>
            </div>
        </React.StrictMode>
    </>;
}


export default App;
