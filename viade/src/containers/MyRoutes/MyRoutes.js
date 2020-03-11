import React from 'react';
import {successToaster, errorToaster} from '@utils';
import {Loader} from '@util-components';
import {
    Header,
    RouteCard,
    Button
} from './myroutes.style';

class MyRoute extends React.Component{

 render(): React.ReactNode {
        return (
            <RouteCard data-testid="route-component">
                
            </RouteCard>
        );
    }

};

export default MyRoute;