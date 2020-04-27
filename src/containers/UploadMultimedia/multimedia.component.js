import React from "react";
import Uploader from "./uploader.component";
import { useTranslation } from "react-i18next";
import { ImageWrapper } from "./multimedia.style";
import { errorToaster, successToaster } from "@utils";
import { ButtonUploader } from "../../components/ButtonUploader/button-uploader.component";
import { useWebId } from "@solid/react";
import i18n from "i18n";

export const MultimediaPageContent = (props) => {
	const { webId } = props;
	const { t } = useTranslation();
	const limit = 210000000;
	const w = useWebId();

	return (
		<ImageWrapper>
			<Uploader
				{...{
					fileBase: w && w.split("/profile")[0] + "/private/viade/rawMedia",
					limitFiles: 10,
					limitSize: limit,
					accept: "jpg,jpeg,png,mp3,mov,mp4,avi",
					errorsText: {
						sizeLimit: t("welcome.errors.sizeLimit", {
							limit: `${limit / 1000000}Mbs`
						}),
						unsupported: t("welcome.errors.unsupported"),
						maximumFiles: t("welcome.errors.maximumFiles")
					},
					onError: (error) => {
						if (error && error.statusText) {
							errorToaster(error.statusText, t("welcome.errorTitle"));
						}
					},
					onComplete: (uploadedFiles) => {
						if (uploadedFiles) {
							successToaster(i18n.t("newRoute.savedFiles"), i18n.t("newRoute.success"));
						}
					},
					render: (props) => (
						<ButtonUploader
							{...{
								...props,
								webId,
								text: t("newRoute.btnMedia"),
								uploadingText: t("welcome.uploadingText")
							}}
						/>
					)
				}}
			/>
		</ImageWrapper>
	);
};
