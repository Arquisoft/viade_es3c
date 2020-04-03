import React from 'react';
import { Uploader } from '@inrupt/solid-react-components';
import { useTranslation } from 'react-i18next';
import {

    ImageWrapper
} from './multimedia.style';
import { ImageProfile } from '@components';
import { errorToaster } from '@utils';

export const MultimediaPageContent = props => {
    const { webId, image, updatePhoto, name } = props;
    const { t } = useTranslation();
    const limit = 2100000
    return (
        <ImageWrapper>
            <Uploader
                {...{
                    fileBase: webId && webId.split('/card')[0],
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
                        updatePhoto(
                            uploadedFiles[uploadedFiles.length - 1].uri,
                            t('welcome.uploadSuccess'),
                            t('welcome.successTitle')
                        );
                    },
                    render: props => (
                        <ImageProfile
                            {...{
                                ...props,
                                webId,
                                photo: image,
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


