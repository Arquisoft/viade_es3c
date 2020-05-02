import React, { Fragment, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Loader } from "@util-components";
import { Header, ProfileContainer, ProfileWrapper, FormRenderContainer, WebId } from "./profile.style";
import { Image } from "./components";

const defaultProfilePhoto = "img/icon/empty.svg";

/**
 * We are using ldflex to fetch profile data from a solid pod.
 * ldflex libary is using json-LD for this reason you will see async calls
 * when we want to get a field value, why ? becuase they are expanded the data
 * this means the result will have a better format to read on Javascript.
 * for more information please go to: https://github.com/solid/query-ldflex
 */
type Props = { webId: String };

const Profile = ({ webId }: Props) => {
	// eslint-disable-next-line
	const [ isLoading, setIsLoading ] = useState(false);

	return (
		<ProfileWrapper data-testid="profile-component">
			<ProfileContainer>
				{webId && (
					<Fragment>
						<Header>
							<Image
								{...{
									webId,
									defaultProfilePhoto
								}}
							/>
						</Header>
						<FormRenderContainer>
							<WebId>
								<FontAwesomeIcon icon="id-card" />
								<a href={webId} target="_blank" rel="noopener noreferrer">
									Visit your pod!
								</a>
							</WebId>
						</FormRenderContainer>
					</Fragment>
				)}
				{isLoading && <Loader absolute />}
			</ProfileContainer>
		</ProfileWrapper>
	);
};

export default Profile;
