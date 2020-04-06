//import React, {Component} from 'react';
import React, {useEffect} from 'react';
import {Header, Input, RouteContainer, RouteWrapper} from "./.style";
import Map from "../../components/Map";
import routes from "../../constants/globals";
import {NotificationTypes, useNotification} from '@inrupt/solid-react-components';
import {notification} from '@utils';
import auth from "solid-auth-client";




