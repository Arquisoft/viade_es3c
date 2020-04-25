import { AccessControlList, AppPermission } from "@inrupt/solid-react-components";
import { errorToaster, successToaster } from "@utils";

// Check that all permissions we need are set. If any are missing, this returns false
import auth from "solid-auth-client";

const checkAppPermissions = (userAppPermissions, appPermissions) =>
	appPermissions.every((permission) => userAppPermissions.includes(permission));

// Function to check for a specific permission included in the app
export const checkSpecificAppPermission = async (webId, permission) => {
	try {
		const userAppPermissions = await AppPermission.checkPermissions(webId);
		return userAppPermissions.permissions.includes(permission);
	} catch (e) {
		// TODO: Better error handling here
	}
};
/**
 * SDK app will need all the permissions by the user pod so we check these permissions to work without any issues.
 * Error Message object is to hold the title, message, etc strings, as we can't use i18n libraries in this non-React file
 */
export const checkPermissions = async (webId, errorMessage) => {
	/**
   * Get permissions from trustedApp.
   */
	const userApp = await AppPermission.checkPermissions(webId);

	/**
   * Get modes permissions from solid-react-components
   */
	const permissions = AccessControlList.MODES;
	const { APPEND, READ, WRITE, CONTROL } = permissions;

	// If we are missing permissions that the app requires, display an error message with a Learn More link
	if (
		userApp === null ||
		userApp.permissions === null ||
		!checkAppPermissions(userApp.permissions, [ APPEND, READ, WRITE, CONTROL ])
	) {
		errorToaster(errorMessage.message, errorMessage.title, {
			label: errorMessage.label,
			href: errorMessage.href
		});
	}
};

/**
 * Helper function to fetch permissions for the viade inbox, and if permissions are not set
 * correctly, then add them. This repairs a broken inbox.
 * @param inboxPath
 * @returns {Promise<void>}
 */
export const checkOrSetInboxAppendPermissions = async (inboxPath, webId) => {
	// Fetch app permissions for the inbox and see if Append is there
	const inboxAcls = new AccessControlList(webId, inboxPath);
	const permissions = await inboxAcls.getPermissions();
	const inboxPublicPermissions = permissions.filter((perm) => perm.agents === null);

	const appendPermission = inboxPublicPermissions.filter((perm) =>
		perm.modes.includes(AccessControlList.MODES.APPEND)
	);

	if (appendPermission.length <= 0) {
		// What do we do when the permission is missing? Add it!
		try {
			// Permission object to add. A null agent means Everyone
			const permissions = [
				{
					agents: null,
					modes: [ AccessControlList.MODES.APPEND ]
				}
			];
			const ACLFile = new AccessControlList(webId, inboxPath);
			await ACLFile.createACL(permissions);
		} catch (error) {
			// TODO: Better error handling here
			throw error;
		}
	}

	return true;
};

export const sharing = async (webId, friends, shareUrl) => {
	const SolidAclUtils = require("solid-acl-utils");
	for (var [key, value] of friends) {
		console.log("Compartiendo con :" + key);
	}
	// You could also use SolidAclUtils.Permissions.READ instead of following
	// This is just more convenient
	const { AclApi, Permissions } = SolidAclUtils;
	const { READ } = Permissions;
	// Passing it the fetch from solid-auth-client
	const fetch = auth.fetch.bind(auth);
	const aclApi = new AclApi(fetch, { autoSave: true });
	const acl = await aclApi.loadFromFileUrl(shareUrl);
	const agents = "[";
	for (var [key, value] of friends) {
		agents+=key + ",";
	}
	agents+="]";
	console.log("Agents: " + agents);
	await acl.addRule(READ, agents);
	successToaster("La ruta ha sido compartida", "Éxito");
};









export const notSharing = async (webId, friendId, shareUrl) => {
	const SolidAclUtils = require("solid-acl-utils");

	// You could also use SolidAclUtils.Permissions.READ instead of following
	// This is just more convenient
	const { AclApi, Permissions } = SolidAclUtils;
	const { READ } = Permissions;
	// Passing it the fetch from solid-auth-client
	const fetch = auth.fetch.bind(auth);
	const aclApi = new AclApi(fetch, { autoSave: true });
	const acl = await aclApi.loadFromFileUrl(shareUrl);
	await acl.deleteRule(READ, friendId);
};
