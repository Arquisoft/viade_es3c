import React from 'react';
//import { Uploader, UploadedFiles, SolidError as SolidErrorEntity } from '@inrupt/solid-react-components';
import Uploader from "./uploader.component"

import { useTranslation } from 'react-i18next';
import {
    WelcomeWrapper,
    WelcomeCard,
    WelcomeName,
    ImageWrapper
} from './multimedia.style';
import { errorToaster } from '@utils';
import { ButtonUploader } from '../../components/ButtonUploader/button-uploader.component';
import { useWebId } from "@solid/react";


export const MultimediaPageContent = props => {
    const { webId, image, updatePhoto, name } = props;
    const { t } = useTranslation();
    const limit = 210000000;
    const w = useWebId()
    console.log(w && w.split('/profile')[0] + "/public/viade")
   

    return (
        <ImageWrapper>
            <Uploader
                {...{
                    fileBase: w && w.split('/profile')[0] + "/public/viade",
                    limitFiles: 10,
                    limitSize: limit,
                    accept: 'jpg,jpeg,png,mp3,mov,mp4,avi',
                    errorsText: {
                        sizeLimit: t('welcome.errors.sizeLimit', {
                            limit: `${limit / 1000000}Mbs`
                        }),
                        unsupported: t('welcome.errors.unsupported'),
                        maximumFiles: t('welcome.errors.maximumFiles')
                    },
                    onError: error => {
                        if (error && error.statusText) {
                            errorToaster(error.statusText, t('welcome.errorTitle'));
                        }
                    },
                    onComplete: uploadedFiles => {

                    },
                    render: props => (
                        <ButtonUploader
                            {...{
                                ...props,
                                webId,
                                text: t('welcome.upload'),
                                uploadingText: t('welcome.uploadingText')
                            }}
                        />
                    )
                }}
            />
        </ImageWrapper>

    );
};