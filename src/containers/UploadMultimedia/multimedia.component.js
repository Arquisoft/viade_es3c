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
    const { webId } = props;
    const { t } = useTranslation();
    const limit = 2100000

    console.log(webId)


    return (
        <ImageWrapper>
            <Uploader
                {...{
                    fileBase: "https://tania.solid.community/private",
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


