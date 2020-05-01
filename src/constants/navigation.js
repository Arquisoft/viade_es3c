/**
 * Object mapping of known possible inboxes for the user
 */
export const NavigationItems = [
	{
		id: "welcome",
		icon: "img/icon/home.svg",
		label: "navBar.welcome",
		to: "/welcome"
	},
	{
		id: "newRoute",
		icon: "img/icon/route.svg",
		label: "navBar.newRoute",
		to: "/route"
	},
	{
		id: "myRoutes",
		icon: "img/icon/love.svg",
		label: "navBar.myRoutes",
		to: "/myRoutes"
	},
	{
		id: "mySharedRoutes",
		icon: "img/icon/love.svg",
		label: "navBar.mySharedRoutes",
		to: "/mySharedRoutes"
	},
	{
		id: "myFriends",
		icon: "img/icon/friends.svg",
		label: "navBar.myFriends",
		to: "/myFriends"
	}
];

export const ProfileOptions = [
	{
		label: "navBar.profile",
		onClick: "profileRedirect",
		icon: "cog"
	},
	{
		label: "navBar.logOut",
		onClick: "logOut",
		icon: "lock"
	}
];
