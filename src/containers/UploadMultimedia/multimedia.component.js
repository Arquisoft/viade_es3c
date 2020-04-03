import React from 'react';
import { Uploader } from '@inrupt/solid-react-components';
import { useTranslation } from 'react-i18next';
import {

    ImageWrapper
} from './multimedia.style';
import { ImageProfile } from '@components';


export const MultimediaPageContent = props => {
    const { webId, image, updatePhoto, name } = props;
    const { t } = useTranslation();
    const limit = 2100000
    console.log(webId && webId.split('/profile')[0] + "/public/imagen")
    return (
        <ImageWrapper>
            <Uploader
                {...{
                    fileBase: webId && webId.split('/card')[0],
                    limitFiles: 1,
                    limitSize: limit,
                    accept: 'jpg,jpeg,png, mp3, mov, mp4',
                    errorsText: {
                        sizeLimit: t('welcome.errors.sizeLimit', {
                            limit: `${limit / 1000000}Mbs`
                        })
                    },

                    onComplete: uploadedFiles => {
                        updatePhoto(
                            uploadedFiles[uploadedFiles.length - 1].uri
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


