import React, { Fragment, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { successToaster, errorToaster } from '@utils';
import { Loader } from '@util-components';
import {
    Header,
    RouteWrapper,
    RouteContainer
} from './route.style';


/**
 * We are using ldflex to fetch profile data from a solid pod.
 * ldflex libary is using json-LD for this reason you will see async calls
 * when we want to get a field value, why ? becuase they are expanded the data
 * this means the result will have a better format to read on Javascript.
 * for more information please go to: https://github.com/solid/query-ldflex
 */
type Props = { webId: String };

const Route = ({ webId }: Props) => {

    return (
        <RouteWrapper data-testid="route-component">
            <RouteContainer>

            </RouteContainer>
        </RouteWrapper>
    );
};

export default Route;
