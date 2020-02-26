import React from 'react';
import { LogoutButton } from '@solid/react';
import { foaf } from 'rdf-namespaces';
import { useProfile } from '../hooks/useProfile';

export const Profile: React.FC = () => {
    const profile = useProfile();

    const name = (profile) ? profile.getString(foaf.name) : null;
    const title = (name)
        ? `Rutas de ${name}`
        : 'Rutas';

    return <>
        <section className="section">
            <h1 className="title">
                {title}
            </h1>
        </section>
        <footer className="footer has-text-right">
            <LogoutButton className="button"/>
        </footer>
    </>;
};