import React from 'react';
import { Uploader } from '@inrupt/solid-react-components';
import { useTranslation } from 'react-i18next';
import {
    WelcomeWrapper,
    WelcomeCard,
    WelcomeName,
    ImageWrapper
} from './multimedia.style';
import { errorToaster } from '@utils';
import { ButtonUploader } from '../../components/ButtonUploader/button-uploader.component';


export const MultimediaPageContent = props => {
    const { webId, image, updatePhoto, name } = props;
    const { t } = useTranslation();
    const limit = 2100000
    console.log(webId && webId.split('/profile')[0] + "/public/imagen")
    return (
            <ImageWrapper>
                <Uploader
                    {...{
                        fileBase: "https://sktjpg2.inrupt.net/private",
                        limitFiles: 1,
                        limitSize: limit,
                        accept: 'jpg,jpeg,png',
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


