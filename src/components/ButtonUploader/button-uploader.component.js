import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  ImageProfileWrapper,
  ButtonStyled,
  ImageProfileLoader
} from "./button-uploader.style";

type Props = {
  photo: String,
  overrideEventDefaults: () => void,
  onDragLeave: () => void,
  onDragEnter: () => void,
  onDrop: () => void,
  onClickFile: () => void,
  inProgress: boolean,
  uploadedFiles: Array<Object>,
  uploadingText?: String,
  text?: String
};

export const ButtonUploader = (props: Props) => {
  const {
    uploadedFiles,
    photo: img,
    overrideEventDefaults,
    onDragLeave,
    onDragEnter,
    onDrop,
    onClickFile,
    text,
    inProgress
  } = props;
  const photo =
    uploadedFiles && uploadedFiles.length > 0
      ? uploadedFiles[uploadedFiles.length - 1].uri
      : img;

  return (
    <ImageProfileWrapper
      {...{
        onDragStart: overrideEventDefaults,
        onDragOver: overrideEventDefaults,
        onDragEnd: overrideEventDefaults,
        onDrag: overrideEventDefaults,
        onDragLeave,
        onDragEnter,
        onDrop,
        style: photo && photo !== "" && { backgroundImage: `url(${photo})` }
      }}
    >
      <ButtonStyled multiple onClick={onClickFile} className="button-upload">
        {text}
      </ButtonStyled>
      {inProgress && (
        <ImageProfileLoader className="image-profile-loader">
          <FontAwesomeIcon icon="spinner" spin size="2x" />
        </ImageProfileLoader>
      )}
    </ImageProfileWrapper>
  );
};

ButtonUploader.defaultProps = {
  text: "Uploads route photos",
  uploadingText: "Uploading"
};
