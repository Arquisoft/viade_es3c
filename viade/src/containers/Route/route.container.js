import React, { Fragment, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { successToaster, errorToaster } from '@utils';
import { Loader } from '@util-components';
import Map from './map';
import {
    Header,
    RouteWrapper,
    RouteContainer
} from './route.style';


type Props = { webId: String };

const Route = ({ webId }: Props) => {

    return (
        <RouteWrapper data-testid="route-component">
            <RouteContainer>
                <Header>
                    <h1 className="text--white">Ruta</h1>
                </Header>
                <Map zoom={13}/>
            </RouteContainer>
        </RouteWrapper>
    );
};

export default Route;
